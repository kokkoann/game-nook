//document.body.innerHTML = "<h1>Game Nook 🎮</h1>";
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

document.body.appendChild(canvas);

//a ver si se ve algo xd
ctx.fillStyle = "purple";
ctx.fillRect(100, 100, 200, 250);