const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

const image = new Image();
image.src = "questions.png";

const BOX_SIZE = 35;
let boxes = [];

// Load JSON
fetch("questions.json")
  .then(res => res.json())
  .then(data => {
    boxes = data;
    draw(); // 👈 IMPORTANT
  });

// Draw image + hit boxes
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "red";
  ctx.lineWidth = 2;

  for (const item of boxes) {
    ctx.strokeRect(item.x, item.y, BOX_SIZE, BOX_SIZE);
  }
}

// Click logic
function handleClick(x, y) {
  for (const item of boxes) {
    if (
      x >= item.x &&
      x <= item.x + BOX_SIZE &&
      y >= item.y &&
      y <= item.y + BOX_SIZE
    ) {
      alert("HIT: " + item.ti
