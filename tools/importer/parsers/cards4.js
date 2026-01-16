/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards4) block header
  const headerRow = ['Cards (cards4)'];

  // Find all product cards
  const cards = element.querySelectorAll('.product-card');
  const rows = [headerRow];

  cards.forEach((card) => {
    // --- IMAGE COLUMN ---
    const img = card.querySelector('.product-image');

    // --- TEXT COLUMN ---
    // Instead of assembling individual elements, grab the whole info container
    const infoContainer = card.querySelector('.product-info-container');
    let textCellContent;
    if (infoContainer) {
      // Use the full info container so all text content is included
      textCellContent = infoContainer.cloneNode(true);
    } else {
      // Fallback: create a div and add whatever text we can find
      textCellContent = document.createElement('div');
      const title = card.querySelector('.product-info h2');
      if (title) {
        const h2 = document.createElement('h2');
        h2.textContent = title.textContent;
        textCellContent.appendChild(h2);
      }
      const mrp = card.querySelector('.product-info p');
      if (mrp) {
        const p = document.createElement('p');
        p.textContent = mrp.textContent;
        textCellContent.appendChild(p);
      }
    }
    rows.push([
      img,
      textCellContent
    ]);
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
