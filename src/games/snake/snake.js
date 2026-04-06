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
    let validPosition = false;
    while (!validPosition) {
        let newX = Math.floor(Math.random() * tileCount) * box;
        let newY = Math.floor(Math.random() * tileCount) * box;

        // Check if the new food position collides with the snake
        validPosition = true;
        for (let segment of snake) {
            if (segment.x === newX && segment.y === newY) {
                validPosition = false;
                break;
            }
        }

        if (validPosition) {
            food.x = newX;
            food.y = newY;
        }
    }
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

     if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= canvas.width + 1 ||
    head.y >= canvas.height + 1
    ) {
        clearInterval(game); // stops game loop
        alert("Game Over 💀");
        return;
      }  

      // Move the snake by adding the new head position
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
    spawnFood();
    } else {
    snake.pop(); // snake moves forward by removing the tail segment
}
    
    // Check for self-collision
    for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
    clearInterval(game);
    alert("Game Over 💀");
    }
}

}

const game = setInterval(draw, 100);

}