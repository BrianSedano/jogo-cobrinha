var canvas = document.getElementById("snake")
var h2 = document.getElementById("H2")
console.log(canvas)
var context = canvas.getContext("2d")
var box = 32
var snake = []
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

var food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

var direction = "none"

function PlaceBG() {
    context.fillStyle = "lightgreen"
    context.fillRect(0, 0, 16 * box, 16 * box)
}

function drawFood() {
    context.fillStyle = "red"
    context.fillRect(food.x, food.y, box, box)
}

function criarCobrinha() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green"
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

document.addEventListener("keydown", update)

function update(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left"
    if (event.keyCode == 38 && direction != "down") direction = "up"
    if (event.keyCode == 39 && direction != "left") direction = "right"
    if (event.keyCode == 40 && direction != "up") direction = "down"
}

function iniciarJogo() {

    var snakeX = snake[0].x
    var snakeY = snake[0].y

    for (i = 1; i < snake.length; i ++) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            snake = []
            snake[0] = {
                x: 8 * box,
                y: 8 * box
            }
            direction = "none"
            h2.innerHTML = "Score = 0"
        }
    }

    if (snakeX == food.x && snakeY == food.y) {
        context.fillStyle = "lightgreen"
        context.fillRect(food.x, food.y, box, box)
        h2.innerHTML = "Score = " + snake.length
        food.x = Math.floor(Math.random() * 15 + 1) * box
        food.y = Math.floor(Math.random() * 15 + 1) * box
        newSnake = {
            x: snake[snake.length - 1].x,
            y: snake[snake.length - 1].y
        }
        snake.push(newSnake)
        if(direction == "right") snake[snake.length - 1].x = snake[snake.length - 2].x - box
        if(direction == "left") snake[snake.length - 1].x = snake[snake.length - 2].x + box
        if(direction == "up") snake[snake.length - 1].y = snake[snake.length - 2].y + box
        if(direction == "down") snake[snake.length - 1].y = snake[snake.length - 2].y - box
    }

    PlaceBG()
    criarCobrinha()
    drawFood()

    if (snake[0].x == 15 * box && direction == "right") {
        snake[0].x = 0
    }
    if (snake[0].x <= 0 && direction == "left") {
        snake[0].x = 15 * box
    }
    if (snake[0].y == 15 * box && direction == "down") {
        snake[0].y = 0
    }
    if (snake[0].y <= 0 * box && direction == "up") {
        snake[0].y = 15 * box
    }

    for (i = snake.length - 1; i > -1; i--) {
        if (i == 0) {
            if(direction == "right") snake[i].x += box
            if(direction == "left") snake[i].x -= box
            if(direction == "up") snake[i].y -= box
            if(direction == "down") snake[i].y += box
        } else {
            snake[i].x = snake[i - 1].x
            snake[i].y = snake[i - 1].y
        }
    }
}

var jogo = setInterval(iniciarJogo, 100)