export async function onRequestGet(context) {
  const { env } = context;

  try {
    const { results: products } = await env.DB.prepare(
      "SELECT * FROM products"
    ).all();

    const { results: images } = await env.DB.prepare(
      "SELECT * FROM product_images"
    ).all();

    const formattedProducts = products.map(product => {
      let colors = [];
      try {
        colors = JSON.parse(product.colors);
      } catch (e) {
        colors = product.colors ? product.colors.split(',').map(c => c.trim()) : [];
      }

      const detailImages = images
        .filter(img => img.product_id === product.id && img.label && img.label.startsWith('d'))
        .sort((a, b) => a.label.localeCompare(b.label))
        .map(img => img.url);

      return {
        ...product,
        colors,
        mainImage: product.image_url,  // ← CHANGED: use image_url
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
