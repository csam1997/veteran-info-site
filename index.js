// index.js

// Wait for DOM, then fetch JSON and build links
window.addEventListener("DOMContentLoaded", () => {
  fetch("veteran_data.json")
    .then(response => {
      if (!response.ok) throw new Error("Cannot load JSON");
      return response.json();
    })
    .then(data => {
      // Clear “Loading…”
      const container = document.getElementById("list-container");
      container.innerHTML = "";

      // Loop through each section
      data.sections.forEach(section => {
        // Section heading (e.g. “1. Transition Timeline…”)
        const secHeading = document.createElement("h3");
        secHeading.textContent = section.heading;
        container.appendChild(secHeading);

        // For each item in section.items, make a link
        const ul = document.createElement("ul");
        section.items.forEach((item, idx) => {
          const li = document.createElement("li");
          // Build a query string like ?section=timeline&itemIndex=0
          const url = `detail.html?section=${encodeURIComponent(section.id)}&itemIndex=${idx}`;
          const a = document.createElement("a");
          a.href = url;
          a.textContent = item.subheading;
          // Open in same tab; to force _blank, use: a.target = "_blank";
          li.appendChild(a);
          ul.appendChild(li);
        });

        container.appendChild(ul);
      });
    })
    .catch(err => {
      console.error(err);
      const container = document.getElementById("list-container");
      container.innerHTML = "<p>Failed to load content.</p>";
    });
});
