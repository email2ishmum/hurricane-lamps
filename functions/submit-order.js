
export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const data = await request.json();
    const { customer_name, phone, address, items, subtotal, shipping_cost, final_total } = data;

    // Basic server-side validation
    if (!customer_name || !phone || !address || !items || items.length === 0) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Insert order into Cloudflare D1 Database (named 'DB')
    // We store the items as a JSON string
    const result = await env.DB.prepare(
      "INSERT INTO orders (customer_name, phone, address, items, subtotal, shipping_cost, final_total, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    )
    .bind(
      customer_name, 
      phone, 
      address, 
      JSON.stringify(items), 
      subtotal, 
      shipping_cost, 
      final_total, 
      new Date().toISOString()
    )
    .run();

    return new Response(JSON.stringify({ success: true, orderId: result.meta.last_row_id }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
