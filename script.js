const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

const popupDiv = document.getElementById("popup");
const popupTitle = document.getElementById("popup-title");
const popupRules = document.getElementById("popup-rules");
const popupDescription = document.getElementById("popup-description");

const BOX_SIZE = 35;

let boxes = [];
let imageLoaded = false;
let dataLoaded = false;

// ---------- IMAGE ----------

const image = new Image();
image.src = "questions.png";

image.onload = function () {
  imageLoaded = true;
  tryDraw();
};

image.onerror = function () {
  console.error("❌ Failed to load questions.png");
};

// ---------- DATA ----------

fetch("questions.json")
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    boxes = data;
    dataLoaded = true;
    tryDraw();
  })
  .catch(function (err) {
    console.error("❌ Failed to load questions.json", err);
  });

// ---------- DRAW CONTROL ----------

function tryDraw() {
  if (imageLoaded && dataLoaded) {
    draw();
  }
}

// ---------- DRAW ----------

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "red";
  ctx.lineWidth = 2;

  for (let i = 0; i < boxes.length; i++) {
    const item = boxes[i];
    ctx.strokeRect(item.x, item.y, BOX_SIZE, BOX_SIZE);
  }
}

// ---------- POPUP ----------

function showPopup(item) {
  popupTitle.textContent = item.title;
  popupRules.textContent = item.rules;
  popupDescription.textContent = item.description;
  popupDiv.style.display = "block";
}

function closePopup() {
  popupDiv.style.display = "none";
}

// ---------- INPUT ----------

function handleClick(x, y) {
  for (let i = 0; i < boxes.length; i++) {
    const item = boxes[i];

    if (
      x >= item.x &&
      x <= item.x + BOX_SIZE &&
      y >= item.y &&
      y <= item.y + BOX_SIZE
    ) {
      showPopup(item);
      return;
    }
  }
}

// Mouse
canvas.addEventListener("click", function (e) {
  const rect = canvas.getBoundingClientRect();
  handleClick(e.clientX - rect.left, e.clientY - rect.top);
});

// Touch
canvas.addEventListener("touchstart", function (e) {
  e.preventDefault();
  const rect = canvas.getBoundingClientRect();
  const t = e.touches[0];
  handleClick(t.clientX - rect.left, t.clientY - rect.top);
});
