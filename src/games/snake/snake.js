export function startSnake() {
const container = document.getElementById("game-container");

const canvas = document.createElement("canvas");
const createContext = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;

container.innerHTML = ""; // Clear previous content
container.appendChild(canvas);

const box = 20; // Size of each box

let snake = [{ x: 200, y: 200 } ];

let direction = "RIGHT";

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    else if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    else if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    else if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

function draw() {
    createContext.fillStyle = "#7b5d39ff";
    createContext.fillRect(0, 0, canvas.width, canvas.height); 

    createContext.fillStyle = "rgba(0, 255, 0, 1)";
    snake.forEach((segment) => {
        createContext.fillRect(segment.x, segment.y, box, box);
    });

    let head = { ...snake[0] };
    if (direction === "UP") head.y -= box;
    else if (direction === "DOWN") head.y += box;
    else if (direction === "LEFT") head.x -= box;
    else if (direction === "RIGHT") head.x += box;

    snake.unshift(head);
    snake.pop();
}

setInterval(draw, 180);

}