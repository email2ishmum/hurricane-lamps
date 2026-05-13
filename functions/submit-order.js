
export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const data = await request.json();
    const { customer_name, phone, address, cartItems } = data;

    // Basic server-side validation
    if (!customer_name || !phone || !address || !cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return new Response(JSON.stringify({ error: "Missing required fields or invalid cart" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const statements = [];
    const orderDate = new Date().toISOString();

    for (const item of cartItems) {
      const { quantity, product_name, id: productId } = item;

      // 1. Prepare Order Insert
      statements.push(
        env.DB.prepare(
          "INSERT INTO orders (customer_name, phone, address, quantity, product_name, order_date) VALUES (?, ?, ?, ?, ?, ?)"
        ).bind(customer_name, phone, address, quantity, product_name, orderDate)
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
