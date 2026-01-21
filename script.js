const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

const popupDiv = document.getElementById("popup");
const popupTitle = document.getElementById("popup-title");
const popupRules = document.getElementById("popup-rules");
const popupDescription = document.getElementById("popup-description");

const image = new Image();
image.src = "questions.png";

const BOX_SIZE = 35;

let boxes = [];

// Load JSON
fetch("questions.json")
  .then(res => res.json())
  .then(data => {
    boxes = data;
  });

// Draw image
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
}

// Popup
function showPopup(item) {
  popupTitle.textContent = item.title;
  popupRules.textContent = item.rules;
  popupDescription.textContent = item.description;
  popupDiv.style.display = "block";
}

// Click handler
function handleClick(x, y) {
  for (const item of boxes) {
    const x1 = item.x;
    const y1 = item.y;
    const x2 = x1 + BOX_SIZE;
    const y2 = y1 + BOX_SIZE;

    if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
      showPopup(item);
      return;
    }
  }
}

// Mouse
canvas.addEventListener("click", e => {
  const rect = canvas.getBoundingClientRect();
  handleClick(e.clientX - rect.left, e.clientY - rect.top);
});

// Touch
canvas.addEventListener("touchstart", e => {
  const rect = canvas.getBoundingClientRect();
  const t = e.touches[0];
  handleClick(t.clientX - rect.left, t.clientY - rect.top);
});

image.onload = draw;
