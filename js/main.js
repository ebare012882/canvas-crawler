// console.log('js is linked and working')

// make and ogre and a hero (that can move around)
// remove ogre from screen when her runs

// make a simple crawler game using HTML 5's canvas tag and the associated properties of that tag that we can manipulate in js.


// we need two entities; a hero and an ogre
// the hero should be moveable with the WASD or arroe buttons
// ?the ogre should be stationary
// the hero and ogre should be able to collide to make something happen
// when the hero and ogre collide, 


// make wire frame outline... (to display what I want to do with my game)



// first: grab our elements and store it in a variable so we cna do stuff

const game = document.getElementById('canvas')
const movement = document.getElementById('movement')
const message = document.getElementById('status')

// we need to set the game's context to be 2D
// we also SAVE that conetxt to the ctx variable.
// this tells our code to do whatever we want it to do in the context of the canvas area.
const ctx = game.getContext('2d')


// console.log('game', game)
// console.log('message', message)
// console.log('movement', movement)

message.innerText = 'full and dumb from lunch'

// one thing we need to do, is get the computed size of our canvas
// this is because the canvas could have different sizes on different sscreens
// and we need to be able to access the exact size of the canvas in order to make this function like a game should.
// we do that with the following lines of code:
// need to set the attribute width and height according to how the canvas displays
game. setAttribute('width', getComputedStyle(game)['width'])
game. setAttribute('height', getComputedStyle(game)['height'])

console.log('this is the game element', game)



// call: app.CanvasELement.getContext() to get 
// use coordinates in canvas (0,0) point is in the top corner x goes across the top, y goes down
// the coordinates go to the right, then down
// example of coordinates (10, 10, 100, 100) -->makes  horizontal rectangle that's 10px tall and 100px wide


// fillStyle is built in and sets a color to fill whatever shape you're filling
// ctx.fillStyle = "green";
// fill rect takes four arguments in this order
// (xCoord, yCoord, width, height) 
// the units are in pixels (px)
// ctx.fillRect(10, 10, 100, 100);


// here's an example of the hero object
// notie this, the method uses function expression sybtax
// using the keyword function, NOT an arrow function 
// because one of the primary differences between a named function with the keyword and an arrow function is the context that 'this' refers to.
// const hero = {
//     x: 0,
//     y: 0,
//     color: 'hotpink',
//     width: 20,
//     height: 20, 
//     alive: true,
//     render: function() {
//         ctx.fillStyle = this.color
//         ctx.fillRect(this.x, this.y, this.width, this.height)
//     }
// }
// // here's an example of how to make your hero show up on the canvas
// hero.render()


// // here's an example of an ogre object
// const ogre = {
//     x: 200,
//     y: 100,
//     color: "#bada55",
//     width: 60,
//     height: 120,
//     alive: true,
//     render: function () {
//         ctx.fillStyle = this.color
//         ctx.fillRect(this.x, this.y, this.width, this.height)
//     }
// }
// // example of how to render the ogre
// ogre.render()

// because our two crawlers(hose are the guys that move around) are built of the same key value pairs, we can use a javascript class to build them. (JS class starts with a CAPITAL LETTER)
class Crawler {
    // we need a constructor function in order to make differences between instances of this class.
    constructor(x, y, color, width, height) {
        this.x= x,
        this.y= y,
        this.color= color,
        this.width= width,
        this.height= height,
        // we can hard set values inside the constructor as well
        this.alive = true,
        // we can even set methods inside the constructor
        this.render = function () {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}

const player = new Crawler(10, 10, 'lightsteelblue', 16, 16)
let ogre = new Crawler(200, 50, '#bada55', 32, 48)

player.render()
ogre.render()

// now we're going to set up our movement handler function
// this will tell our code how our player moves around and what keys to use to move them
// this function has to be tied to an event handler
// 'e' represents our "event"

const movementHandler = (e) => {
    // this move handler will be associated with a keydown event
    // wer're going to use keycodes to tell it to do different movements for different keys
    // here are some keyCodes:
    // w = 87, a = 65, s = 83, d = 68
    // up = 38, left = 37, down = 40, right = 39
    // those numbers correspond to the keys on the keyboard that will be pressed.
    // we COULD use if statements for this, but there is another syntax that's a little bit shorter called a switch case
    switch (e.keyCode) {
        // we can use multiple cases here for multiple keys to trigger the same event
        // move up
        case (87):
        case (38):
            // this will move the character up 10px every press
            player.y -= 10
            // we also need to break our cases like this
            break
        // move left
        case (65):
        case (37):
            // this moves the player left
            player.x -= 10
            break
        // move down
        case (83):
        case (40):
            // this will move the player down
            player.y += 10
            break
        // move right
        case (68):
        case (39):
            // this will move the player right
            player.x += 10
            break
    }
}

// here's the function we'll use to detect collision betwen entitites
// to accurately detect a hit, we need to account for the entire space take up by eah object
// so we need to use the hero's x, y, width, and height as well as shrek's x, y, width, and height
const detectHit = () => {
    // we're basically using one big if statement to cover all our bases
    // that means judging the player and ogre's x, y, w, h values
    // I GOT LOST IN THE CODE BELOW. WOULD NOT BE ABLE TO RECREATE IT ON MY OWN YET
    if(player.x < ogre.x + ogre.width
        && player.x + player.width > ogre.x
        && player.y < ogre.y + ogre.height
        && player.y + player.height > ogre.y) {
            // console.log("we have a hit!")
            ogre.alive = false
            message.textContent = 'You win!'
        }
}



// we're going to set up a game loop function
// this will be attahed to an interval
// this is how we will create animation in our canvas

// below is an arrow function
const gameLoop =  () => {
    // make sure you don't have any console.logs in here
// here we'll use another built in canvas metho
// this in called clearRect, and it clears rectangles just like fillRect fill rectangles

    if (ogre.alive) {
        detectHit()
    }

// here, we want to clear out the ENTIRE canvas every single frame
    ctx.clearRect(0, 0, game.width, game.height)

    movement.textContent = player.x + ", " + player.y
    player.render()

    if(ogre.alive) {
        ogre.render()
    }
}

// now, we're going to attach our movement handler to the keydown event, and we're going to run the gameLoop and we want to make sure to only do this once all of the DOm content has loaded

document.addEventListener('DOMContentLoaded', function (){
    // once the DOM content loads, we can set up our movement event listener
    document.addEventListener('keydown', movementHandler)
    // we can also set up our gameLoop interval
    setInterval(gameLoop, 60)
})

