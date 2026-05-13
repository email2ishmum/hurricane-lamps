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
      // Parse colors if it's a JSON string in DB
      let colors = [];
      try {
        colors = JSON.parse(product.colors);
      } catch (e) {
        colors = product.colors ? product.colors.split(',').map(c => c.trim()) : [];
      }

      // Filter detail images: labels starting with 'd' (d1, d2, d3...)
      const detailImages = images
        .filter(img => img.product_id === product.id && img.label && img.label.startsWith('d'))
        .sort((a, b) => a.label.localeCompare(b.label))
        .map(img => img.url);

      return {
        ...product,
        colors,
        // Map common variations of the main image column name to 'mainImage'
        mainImage: product.mainImage || product.image_main || product.main_image,
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
