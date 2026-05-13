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

    // 3. Helper function to extract colors
    const getColors = (name, description) => {
      // Try to parse from description first
      if (description && description.includes('Available in')) {
        const match = description.match(/Available in (.+?)(?:\.|$)/);
        if (match) {
          return match[1]
            .split(',')
            .map(c => c.trim())
            .map(c => c.replace(/^and\s+/, ''))
            .filter(c => c.length > 0);
        }
      }

      // Extract color from description if it's just one color
      // e.g., "Minimalist White" -> "White"
      const colorKeywords = ['White', 'Black', 'Golden', 'Silver', 'Orange', 'Green', 'Red', 'Blue', 'Gold'];
      for (const color of colorKeywords) {
        if (description && description.includes(color)) {
          return [color];
        }
      }

      // Fallback: guess from product name/description
      if (name === 'Irium') return ['Black', 'White', 'Golden', 'Silver', 'Rose Gold'];
      if (description.includes('White')) return ['White'];
      if (description.includes('Green')) return ['Sea Green'];
      if (description.includes('Orange')) return ['Orange'];
      
      return ['Default'];
    };

    // 4. Map images to products
    const formattedProducts = products.map(product => {
      // Filter detail images: labels starting with 'd' (d1, d2, d3...)
      const detailImages = images
        .filter(img => img.product_name === product.name && img.label && img.label.startsWith('d'))
        .sort((a, b) => a.label.localeCompare(b.label))
        .map(img => img.image_url);

      const colors = getColors(product.name, product.description);

      return {
        id: product.id,
        name: product.name,
        description: product.description,
        priceDiscount: product.price_discount || 0,
        priceOriginal: product.price_original || 0,
        stock: product.stock || 0,
        mainImage: product.image_main,
        detailImages: detailImages,
        colors: colors
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
