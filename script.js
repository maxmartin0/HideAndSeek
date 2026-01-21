const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

const image = new Image();
image.src = "questions.png";

let boxes = [];

fetch("questions.json")
  .then(r => r.json())
  .then(data => {
    boxes = data;
    console.log("Loaded", boxes.length, "boxes");
  });

image.onload = () => {
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
};

canvas.addEventListener("click", e => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  for (const item of boxes) {
    const [x1, y1, x2, y2] = item.box;
    if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
      alert(item.title + "\n\n" + item.description);
      break;
    }
  }
});
