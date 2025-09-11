import "./style.css";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const increaseBtn = document.getElementById("increase") as HTMLButtonElement;
const decreaseBtn = document.getElementById("decrease") as HTMLButtonElement;
const sizeEl = document.getElementById("size") as HTMLSpanElement;
const colorEl = document.getElementById("color") as HTMLInputElement;
const clearEl = document.getElementById("clear") as HTMLButtonElement;

let size = 5;
let color = "black";
let isPressed = false;
let x: number | null = null;
let y: number | null = null;

canvas.addEventListener("mousedown", (e: MouseEvent) => {
  isPressed = true;
  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener("mouseup", () => {
  isPressed = false;
  x = null;
  y = null;
});

canvas.addEventListener("mousemove", (e: MouseEvent) => {
  if (isPressed && x !== null && y !== null) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;

    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);

    x = x2;
    y = y2;
  }
});

function drawCircle(x: number, y: number) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawLine(x1: number, y1: number, x2: number, y2: number) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
}

function updateSizeOnScreen() {
  sizeEl.innerText = size.toString();
}

increaseBtn.addEventListener("click", () => {
  size += 5;
  if (size > 50) size = 50;
  updateSizeOnScreen();
});

decreaseBtn.addEventListener("click", () => {
  size -= 5;
  if (size < 5) size = 5;
  updateSizeOnScreen();
});

colorEl.addEventListener("change", (e: Event) => {
  const target = e.target as HTMLInputElement;
  color = target.value;
});

clearEl.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
