/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Cards (cards2)
  const headerRow = ['Cards (cards2)'];

  // Find all product cards
  const productCards = element.querySelectorAll('.product-card');
  const rows = [];

  productCards.forEach((card) => {
    // --- IMAGE CELL ---
    const img = card.querySelector('.product-image-container img');
    let imageEl = null;
    if (img) imageEl = img;

    // --- TEXT CELL ---
    const infoContainer = card.querySelector('.product-info-container');
    const textCellContent = [];

    // Title (h2)
    const title = infoContainer?.querySelector('.product-info h2');
    if (title) textCellContent.push(title.cloneNode(true));

    // Description (MRP)
    const desc = infoContainer?.querySelector('.product-info p');
    if (desc) textCellContent.push(desc.cloneNode(true));

    // --- CTA BUTTONS ---
    const pricesContainer = infoContainer?.querySelector('.product-prices');
    if (pricesContainer) {
      const ctas = Array.from(pricesContainer.querySelectorAll('.show-popup.shop-cta-button'));
      if (ctas.length > 0) {
        // Create a container for CTAs
        const ctaWrapper = document.createElement('div');
        ctaWrapper.style.display = 'flex';
        ctaWrapper.style.gap = '12px';
        ctas.forEach((cta) => {
          // Each CTA is a div with an href attribute (not a real <a>), so convert to <a>
          const href = cta.getAttribute('href');
          const target = cta.getAttribute('target') || '_blank';
          // Clone the price-option and ecommerce-name
          const priceOption = cta.querySelector('.price-option');
          const ecommerceName = cta.querySelector('.ecommerce-name');
          const a = document.createElement('a');
          if (href) a.href = href;
          a.target = target;
          if (priceOption) a.appendChild(priceOption.cloneNode(true));
          if (ecommerceName) a.appendChild(ecommerceName.cloneNode(true));
          a.style.display = 'inline-block';
          a.style.textDecoration = 'none';
          ctaWrapper.appendChild(a);
        });
        textCellContent.push(ctaWrapper);
      }
    }

    rows.push([
      imageEl,
      textCellContent
    ]);
  });

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace original element
  element.replaceWith(table);
}
