'use strict';


let state = 'title'
let cnv;
let points = 0;
let w = 600;
let h = 600;
let player;
let coins = [];
let playerImg;
let coinImg;
let click = 0;

function preload() {

  playerImg = loadImage('images/ab.png');
  coinImg = loadImage('images/virus_0.jpg');
}


function setup() {
  cnv = createCanvas(w, h);

  textFont('monospace');

  player = new Player();
  //coins[0] = new Coin();
  coins.push(new Coin());

}

function draw() {

  switch (state) {
    case 'title':
      title();
      cnv.mouseClicked(titleMouseClicked);
      break;
    case 'level 1':
      //execute code
      level1();
      cnv.mouseClicked(level1MouseClicked);
      break;
      case 'level 2':
      level2();
      cnv.mouseClicked(level2MouseClicked);
      break;
    case 'you win':
      youWin();
      cnv.mouseClicked(youWinMouseClicked);
      break;
    default:
      break;

  }


  //
  //   if(state === 'title'){
  //     title();
  //     cnv.mouseClicked(titleMouseClicked);
  //   }else if (state === 'level 1'){
  //     level1();
  //     cnv.mouseClicked(level1MouseClicked);
  // }
}

function keyPressed() {
  // direction for the player
  if (keyCode == LEFT_ARROW) {
    player.direction = 'left'
  } else if (keyCode == RIGHT_ARROW) {
    player.direction = 'right'
  } else if (keyCode == UP_ARROW) {
    player.direction = 'up'
  } else if (keyCode == DOWN_ARROW) {
    player.direction = 'down'
  } else if (key = ' ') {
    player.direction = 'still';
  }
}
function keyReleased (){
  player.direction = 'still'
}


function title() {
  background(0);
  textSize(50);
  stroke(255);
  textAlign(CENTER);
  text('MY GAME', w / 2, h / 5);

  textSize(20);
  text('click anywhere to start', w / 2, h / 2);
}

function titleMouseClicked() {

  console.log('canvas is clicked on title page ');
  state = 'level 1'

}

function level1() {

  background(50, 150, 200);




  if (random(1) <= 0.01) {
    /// this give new coins
    coins.push(new Coin());
  }

  player.display();
  player.move();

  // // this is only if you want one coin
  //     coins[0].display();
  //     coins[0].move();


  // this is moving all the random  multipile coins
  // iterating through coins array to display and move them
  // using for loop
  for (let i = 0; i < coins.length; i++) {

    coins[i].display();
    coins[i].move();
  }

  // // using foreach loop
  //
  //  coins.forEach(function (coin) {
  //    coin.display();
  //    coin.move();
  //  })

  // check for collision, if there is colliion increase points by 1 and splice that coi out of array
  // need to iterate backward through array

  for (let i = coins.length - 1; i >= 0; i--) {

    if (dist(player.x, player.y, coins[i].x, coins[i].y) <= (player.r + coins[i].r) / 2) {

      points++;
      coins.splice(i, 1);

    } else if (coins[i].y > h) {
      coins.splice(i, 1);
    }
  }

  // try this for maze effect !!
  push();
  fill(89, 65, 35);
  rect(0, 0, w / 6, h / 6);
  rect(100, 0, w / 6, h / 6);
  rect(200, 0, w / 6, h / 6);
  rect(300, 0, w / 6, h / 6);
  rect(400, 0, w / 6, h / 6);
  // right side
  rect(400, 100, w / 6, h / 6);
  rect(400, 150, w / 6, h / 6);
  rect(400, 200, w / 6, h / 6);
  //left side
  rect(0, 100, w / 6, h / 6);
  rect(0, 200, w / 6, h / 6);
  rect(0, 250, w / 6, h / 6);
  rect(0, 350, w / 6, h / 6);
  rect(0, 450, w / 6, h / 6);
  rect(0, 500, w / 6, h / 6);
  //bottom
  rect(100, 500, w / 6, h / 6);
  rect(150, 500, w / 6, h / 6);
  rect(380, 500, w / 6, h / 6);
  rect(450, 500, w / 6, h / 6);
  rect(500, 500, w / 6, h / 6);
  rect(0, 500, w / 6, h / 6);

  // obstacle

  rect(380, 400, 10, 80);
  rect(340, 490, 80, 10);
  rect(310, 340, 10, 80);
  rect(220, 340, 80, 10);
  rect(200, 250, 10, 80);
  rect(150, 100, 10, 50);
  rect(240, 200, 80, 10);
  rect(480, 300, 10, 80);
  rect(510, 250, 20, 10);
  rect(570, 160, 90, 10);

  // target
  fill(255, 0, 0);
  ellipse(550, 60, 40, 40);
  pop();

  //text('points' + points , w/4, h - 30);
  fill(149, 217, 89);
  textSize(17);
  text(`Infected level: ${points}`, w / 5, h - 30);


}


function level1MouseClicked() {
  //points ++ ;
  click++;
  console.log('points = ' + points);

  if (click == 1) {
    state = 'you win';
  }else if (click == 2 ){
    state = 'level 2';
  }
  // if( player.x >= 550 $ player.y >= 60){
  //   //text('you won', w/2, h/2);
  // }
}


function level2(){
  background(0);
}


function level2MouseClicked(){

  background(1,2,4);
  text('level 2', w/2,h/3);
}
function youWin() {

  background(255, 50, 80);
  textSize(50);
  stroke(255);
  text('You Win', w / 2, h / 3);

  // textSize(20);
  // text('click anywhere to restart', w / 2, h / 2);


}

function youWinMouseClicked() {

  state = 'level 1';
  click = 0;

}
