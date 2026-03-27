let files = [];

// Load file list from manifest.json
fetch("manifest.json")
  .then(res => res.json())
  .then(data => {
    files = data;
    render(files);
  })
  .catch(err => {
    console.error("Failed to load manifest.json", err);
  });

function render(list) {
  const container = document.getElementById("fileList");
  container.innerHTML = "";

  list.forEach(file => {
    const div = document.createElement("div");
    div.className = "file";

    div.innerHTML = `
      <div style="font-size:14px; font-weight:bold;">
        ${file.name}
      </div>
      <a href="${file.file}" download>Download</a>
    `;

    container.appendChild(div);
  });
}

// Search filter
document.getElementById("search").addEventListener("input", e => {
  const value = e.target.value.toLowerCase();

  const filtered = files.filter(f =>
    f.name.toLowerCase().includes(value)
  );

  render(filtered);
});
