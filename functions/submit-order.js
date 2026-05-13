
export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const data = await request.json();
    const { customer_name, phone, address, cartItems, shippingLocation } = data;

    // Basic server-side validation
    if (!customer_name || !phone || !address || !cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return new Response(JSON.stringify({ error: "Missing required fields or invalid cart" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Calculate totals
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Shipping logic: 2+ items = 0, else based on location
    const shippingCost = totalItems >= 2 ? 0 : (shippingLocation === 'dhaka' ? 80 : 120);
    const totalAmount = subtotal + shippingCost;

    const statements = [];
    const orderDate = new Date().toISOString();

    for (const item of cartItems) {
      const { quantity, product_name, id: productId } = item;

      // 1. Prepare Order Insert (including total_amount)
      // Note: We'll store the total_amount on each record for this batch, or could have a separate orders_summary table
      // But the user asked to save total_amount to the Orders table.
      statements.push(
        env.DB.prepare(
          "INSERT INTO orders (customer_name, phone, address, quantity, product_name, order_date, total_amount) VALUES (?, ?, ?, ?, ?, ?, ?)"
        ).bind(customer_name, phone, address, quantity, product_name, orderDate, totalAmount)
      );

      // 2. Prepare Stock Update (in 'products' table)
      statements.push(
        env.DB.prepare(
          "UPDATE products SET stock = stock - ? WHERE id = ?"
        ).bind(quantity, productId)
      );
    }

    // Execute all statements in a batch
    await env.DB.batch(statements);

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Order placed successfully for ${phone}` 
    }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
