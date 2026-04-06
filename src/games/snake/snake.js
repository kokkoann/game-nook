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
let food = { x: 0, y: 0 };

const tileCount = canvas.width / box;

spawnFood();

function spawnFood() {
    food.x = Math.floor(Math.random() * tileCount) * box;
    food.y = Math.floor(Math.random() * tileCount) * box;
}


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
    createContext.fillStyle = "red";
    createContext.fillRect(food.x, food.y, box, box);

    let head = { ...snake[0] };
    if (direction === "UP") head.y -= box;
    else if (direction === "DOWN") head.y += box;
    else if (direction === "LEFT") head.x -= box;
    else if (direction === "RIGHT") head.x += box;

    snake.unshift(head);
    //snake.pop();

    if (head.x === food.x && head.y === food.y) {
    spawnFood(); // nueva comida
    } else {
    snake.pop(); // solo se mueve si NO comió
}
}

setInterval(draw, 180);

}