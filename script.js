// script.js

// When the DOM is fully loaded, run this function
window.addEventListener("DOMContentLoaded", () => {
  fetch("veteran_data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load veteran_data.json");
      }
      return response.json();
    })
    .then((data) => {
      // 1) Set the page title and subtitle
      document.getElementById("page-title").textContent = data.title;
      document.getElementById("page-subtitle").textContent = data.subtitle;

      // 2) For each section in data.sections, render content
      data.sections.forEach((section) => {
        // The <section> element ID is "<section.id>-section"
        const container = document.getElementById(section.id + "-section");
        if (!container) return; // safety check

        // Create and append <h2> for the section heading
        const h2 = document.createElement("h2");
        h2.textContent = section.heading;
        container.appendChild(h2);

        // For each item in this section
        section.items.forEach((item) => {
          // Create <h3> for subheading
          const h3 = document.createElement("h3");
          h3.textContent = item.subheading;
          container.appendChild(h3);

          // Each string in item.content becomes a <p>
          item.content.forEach((paraText) => {
            const p = document.createElement("p");
            p.textContent = paraText;
            container.appendChild(p);
          });
        });
      });
    })
    .catch((err) => {
      console.error("Error processing veteran_data.json:", err);
      document.getElementById("page-title").textContent =
        "Error loading content";
      document.getElementById("page-subtitle").textContent =
        "Please try again later.";
    });
});
