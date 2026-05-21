/**
 * Dynamic OG Tag Manager
 * Sets meta tags for social sharing based on page/product
 */

interface SEOMetadata {
  title: string;
  description: string;
  image: string;
  url: string;
  type?: string;
}

export function setOGTags(metadata: SEOMetadata) {
  // og:title
  updateMetaTag('property', 'og:title', metadata.title);
  document.title = metadata.title;

  // og:description
  updateMetaTag('property', 'og:description', metadata.description);
  updateMetaTag('name', 'description', metadata.description);

  // og:image
  updateMetaTag('property', 'og:image', metadata.image);
  updateMetaTag('name', 'twitter:image', metadata.image);

  // og:url
  updateMetaTag('property', 'og:url', metadata.url);

  // og:type
  updateMetaTag('property', 'og:type', metadata.type || 'website');

  // Twitter card
  updateMetaTag('name', 'twitter:card', 'summary_large_image');
  updateMetaTag('name', 'twitter:title', metadata.title);
  updateMetaTag('name', 'twitter:description', metadata.description);
}

function updateMetaTag(
  attrName: 'property' | 'name',
  attrValue: string,
  content: string
) {
  let tag = document.querySelector(
    `meta[${attrName}="${attrValue}"]`
  ) as HTMLMetaElement;

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attrName, attrValue);
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', content);
}
