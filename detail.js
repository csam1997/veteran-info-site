// detail.js

window.addEventListener("DOMContentLoaded", () => {
  // Parse URL parameters
  const params = new URLSearchParams(window.location.search);
  const sectionId = params.get("section");
  const itemIndex = parseInt(params.get("itemIndex"), 10);

  const container = document.getElementById("detail-container");

  if (!sectionId || isNaN(itemIndex)) {
    container.innerHTML = "<p>Invalid link or missing parameters.</p>";
    return;
  }

  // Fetch JSON
  fetch("veteran_data.json")
    .then(response => {
      if (!response.ok) throw new Error("Cannot load JSON");
      return response.json();
    })
    .then(data => {
      // Find the section with matching id
      const section = data.sections.find(sec => sec.id === sectionId);
      if (!section) throw new Error("Section not found");

      // Find the item at itemIndex
      if (itemIndex < 0 || itemIndex >= section.items.length) {
        throw new Error("Item index out of range");
      }
      const item = section.items[itemIndex];

      // Clear “Loading detail…”
      container.innerHTML = "";

      // Sub-heading (e.g. “Pre-Separation Phase…”)
      const h2 = document.createElement("h2");
      h2.textContent = item.subheading;
      container.appendChild(h2);

      // Render each paragraph
      item.content.forEach(paragraphText => {
        const p = document.createElement("p");
        p.textContent = paragraphText;
        container.appendChild(p);
      });
    })
    .catch(err => {
      console.error(err);
      container.innerHTML = `<p>Error loading detail: ${err.message}</p>`;
    });
});
