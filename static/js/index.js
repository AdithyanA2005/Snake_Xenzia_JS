let a = 2;
let b = 16;
let speed = 20;
let score = 0;
let last_paint_time = 0;
let food = { x: 6, y: 7 };
let snake_arr = [{ x: 13, y: 15 }];
let snake_velocity = { x: 0, y: 0 };

const table_grid = 20;
const score_box = document.getElementById('score');
const food_sound = new Audio('static/music/food.mp3');
const gameover_sound = new Audio('static/music/gameover.mp3');
const move_sound = new Audio('static/music/move.mp3');
const music_sound = new Audio('static/music/music.mp3');

function main(current_time) {
    // This function will control the fps, create a loop and start the game_engine function 
    window.requestAnimationFrame(main);
    if ((current_time - last_paint_time) / 1000 < 1 / speed) { return; }
    last_paint_time = current_time;
    game_engine();
};

function game_engine() {
    // If Snake Collide
    if (isCollide(snake_arr)) {
        collided();
    };

    // If food is eaten 
    if (snake_arr[0].y === food.y && snake_arr[0].x === food.x) {
        food_eaten()
    };

    // Moving the snake 
    move_snake()

    // This will display the snake in the board
    display_snake()

    // This will add the snake food 
    display_food()

   
};

function isCollide(snake) {
    // Cut Yourself 
    for (let i = 1; i < snake_arr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        };
    };

    // Hit the wall 
    if(snake[0].x >= table_grid || snake[0].x <= 0 || snake[0].y >= table_grid || snake[0].y <= 0) {
        return true;
    };

    return false;
};

function collided() {
    gameover_sound.play();
    snake_velocity = {x:0, y:0};
    a = alert("Game Over. Press any key to play again!");
    snake_arr = [{x: 13, y: 15}];
    score = 0;
};

function food_eaten() {
    food_sound.play();
    score += 1;
    score_box.innerHTML = score;
    snake_arr.unshift({ x: snake_arr[0].x + snake_velocity.x, y: snake_arr[0].y + snake_velocity.y });
    food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
};

function move_snake() {
    for (let i = snake_arr.length - 2; i >= 0; i--) {
        snake_arr[i+1] = {...snake_arr[i]};
    };
    snake_arr[0].x += snake_velocity.x;
    snake_arr[0].y += snake_velocity.y;
};

function display_snake() {
    board.innerHTML = "";
    snake_arr.forEach((snake_part, index) => {
        snake_element = document.createElement('div');
        snake_element.style.gridRowStart = snake_part.y;
        snake_element.style.gridColumnStart = snake_part.x;

        if (index === 0) {
            // This will add snake head 
            snake_element.classList.add('snake_head');
        }
        else {
            // This will add snake body 
            snake_element.classList.add('snake_body');
        }

        board.appendChild(snake_element);
    });
};

function display_food() {
    food_element = document.createElement('div');
    food_element.style.gridRowStart = food.y;
    food_element.style.gridColumnStart = food.x;
    food_element.classList.add('snake_food');
    board.appendChild(food_element);
};

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    snake_velocity = {x: 0, y: 1}
    switch (e.key) {
        case "ArrowUp":
            move_sound.play();
            snake_velocity.x = 0;
            snake_velocity.y = -1;
            break;

        case "ArrowDown":
            move_sound.play();
            snake_velocity.x = 0;
            snake_velocity.y = 1;
            break;

        case "ArrowLeft":
            move_sound.play();
            snake_velocity.x = -1;
            snake_velocity.y = 0;
            break;

        case "ArrowRight":
            move_sound.play();
            snake_velocity.x = 1;
            snake_velocity.y = 0;
            break;
        
        default:
            break;
    }
});
