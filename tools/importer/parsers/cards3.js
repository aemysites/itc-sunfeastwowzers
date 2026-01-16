/* global WebImporter */

export default function parse(element, { document }) {
  // Cards (cards3) block header
  const headerRow = ['Cards (cards3)'];
  const rows = [headerRow];

  // Find all product cards in the section
  const cardEls = element.querySelectorAll('.product-card');
  cardEls.forEach(cardEl => {
    // --- IMAGE CELL ---
    const img = cardEl.querySelector('.product-image-container img');
    // Clone image to preserve it
    const imgClone = img ? img.cloneNode(true) : '';

    // --- CONTENT CELL ---
    const contentDiv = document.createElement('div');
    // Title
    const title = cardEl.querySelector('.product-info h2');
    if (title) {
      contentDiv.appendChild(title.cloneNode(true));
    }
    // Description (MRP)
    const desc = cardEl.querySelector('.product-info p');
    if (desc) {
      contentDiv.appendChild(desc.cloneNode(true));
    }
    // Shop options (CTAs)
    const shopCtas = cardEl.querySelectorAll('.shop-cta-button');
    if (shopCtas.length) {
      const shopRow = document.createElement('div');
      shopRow.style.display = 'flex';
      shopRow.style.gap = '8px';
      shopCtas.forEach(shopEl => {
        // Each shop CTA is a link with logo, price, and shop name
        const href = shopEl.getAttribute('href');
        const logo = shopEl.querySelector('.price-option img');
        const price = shopEl.querySelector('.price-option p');
        const shopName = shopEl.querySelector('.ecommerce-name');
        const shopBox = document.createElement('a');
        if (href) shopBox.href = href;
        shopBox.target = '_blank';
        shopBox.style.display = 'inline-block';
        shopBox.style.textAlign = 'center';
        shopBox.style.border = '1px solid #ccc';
        shopBox.style.padding = '4px';
        shopBox.style.minWidth = '60px';
        if (logo) shopBox.appendChild(logo.cloneNode(true));
        if (price) shopBox.appendChild(price.cloneNode(true));
        if (shopName) {
          shopBox.appendChild(document.createElement('br'));
          shopBox.appendChild(shopName.cloneNode(true));
        }
        shopRow.appendChild(shopBox);
      });
      contentDiv.appendChild(shopRow);
    }
    rows.push([
      imgClone,
      contentDiv
    ]);
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
