export async function onRequestGet(context) {
  const { env } = context;

  try {
    // 1. Fetch all products
    const { results: products } = await env.DB.prepare(
      "SELECT * FROM products"
    ).all();

    // 2. Fetch all product images (details)
    const { results: images } = await env.DB.prepare(
      "SELECT * FROM product_images"
    ).all();

    // 3. Map images to products
    const formattedProducts = products.map(product => {
      // Filter detail images: labels starting with 'd' (d1, d2, d3...)
      // IMPORTANT: Match by product_name, not product_id
      const detailImages = images
        .filter(img => img.product_name === product.name && img.label && img.label.startsWith('d'))
        .sort((a, b) => a.label.localeCompare(b.label))
        .map(img => img.image_url);

      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price_original: product.price_original,
        price_discount: product.price_discount,
        stock: product.stock,
        mainImage: product.image_main,
        detailImages: detailImages
      };
    });

    return new Response(JSON.stringify(formattedProducts), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
