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
      const detailImages = images
        .filter(img => img.product_name === product.name && img.label && img.label.startsWith('d'))
        .sort((a, b) => a.label.localeCompare(b.label))
        .map(img => img.image_url);

      // Parse colors from description or set defaults
      let colors = [];
      if (product.description) {
        // Extract colors from description like "Available in Black, White, Golden..."
        if (product.description.includes('Available in')) {
          const colorMatch = product.description.match(/Available in ([^.]+)/);
          if (colorMatch) {
            colors = colorMatch[1].split(',').map(c => c.trim());
          }
        }
      }

      return {
        id: product.id,
        name: product.name,
        description: product.description,
        priceDiscount: product.price_discount,
        priceOriginal: product.price_original,
        stock: product.stock,
        mainImage: product.image_main,
        detailImages: detailImages,
        colors: colors.length > 0 ? colors : []
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
