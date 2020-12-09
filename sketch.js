'use strict';

//
// // all for the giphy
// var api = "https://api.giphy.com/v1/gifs/search?";
//
// var apiKey = "&api_key=dc6zaTOxFJmzC";
//
// // my own apikey
// //var apikey ="&api_key=0NmKiskLvYUZG5nPGyPaPc8sXh2oCNmd";
//
// var query = "&q=covid";
// // all for the gify


//all for the posenet

let video;
let poseNet; //variable
let pose;
//all for the poseNet




let state = 'title'
let cnv;
let points = 1;
let lives = 3;

let w = 600;
let h = 600;
let player = 1;
let coins = [];
let playerImg;
let coinImg;
let enemies = [];
let enemyImg;
let click = 0;

function preload() {

  playerImg = loadImage('images/tryout2.png');
  coinImg = loadImage('images/virus1.png');
  enemyImg = loadImage('images/sy.png');
}


function setup() {
  cnv = createCanvas(w, h);
  //frameRate(40);


  // EDIT FOR COLLIIDER BUT DID work
  //imageMode(CENTER);
  //rectMode(CENTER);

  //create a reset button , undo this all if u dont need reset button
  resetSketch();
  var button = createButton('reset');
  button.mousePressed(resetSketch);





  // // this is for the giphy
  // var url = api + apiKey + query;
  // loadJSON(url, gotData); // to loade the data for giphy
  //

  //// undo this if you dont need reset button
  //
  // // for pose poseNet
  // video = createCapture(VIDEO);
  // video.hide();
  // poseNet = ml5.poseNet(video, modelLoaded);
  // poseNet.on('pose', gotPoses);
  // // for poseNet
  //
  // textFont('monospace');
  //
  // player = new Player();
  // //coins[0] = new Coin();
  // coins.push(new Coin());

}


function gotData(giphy) {
  for (var i = 0; i < giphy.data.length; i++) {
    createImg(giphy.data[i].images.original.url);
  }
}

// for pose net
function gotPoses(poses) {
  console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
  }
}

function modelLoaded() {
  console.log('poseNet ready');
}

//for poseNet
function resetSketch() {

  // // this is for the giphy
  // var url = api + apiKey + query;
  // loadJSON(url, gotData); // to loade the data for giphy
  //

  state = 'title'
  points = 1;
  coins = [];
  enemies = [];

  // for pose poseNet
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
  // for poseNet


  textFont('monospace');

  player = new Player();
  //coins[0] = new Coin();
  coins.push(new Coin());
  enemies.push(new Enemy());



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

      // maybe make you lose as well
    case 'game over':
      gameOver();
      cnv.mouseClicked(gameOverMouseClicked);
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

  //image(playerImg, this.x, this.y, this.r, this.r);
  //rect(rect1X, rect1Y, rect1Width, rect1Height);

}









// undo this to go to player.direction

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

    //  TRY ADDING RETURN KEY
    // }else if (keyCode === RETURN ) {
    //       state = 'you win';
    // }
  }
}


function keyReleased() {
  player.direction = 'still'
}


function title() {
  background(0);
  textSize(50);
  stroke(255);
  textAlign(CENTER);
  text('lil mAzE', w / 2, h / 5);
  textSize(20);
  text('click anywhere to start', w / 2, h / 2);
}

function titleMouseClicked() {

  console.log('canvas is clicked on title page ');
  state = 'level 1'

}

function level1() {

  //background(50, 150, 200);
  background(65, 37, 77);




  if (random(1) <= 0.01) {
    /// this give new coins
    coins.push(new Coin());
  }
  if (random(1) <= 0.002) {
    /// this give new coins
    enemies.push(new Enemy());
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


  // // this is only if you want one coin
  //     coins[0].display();
  //     coins[0].move();


  // this is moving all the random  multipile coins
  // iterating through enemies array to display and move them
  // using for loop
  for (let i = 0; i < enemies.length; i++) {

    enemies[i].display();
    enemies[i].move();
  }

  // // using foreach loop
  //
  //  coins.forEach(function (coin) {
  //    coin.display();
  //    coin.move();
  //  })

  // check for collision, if there is colliion increase points by 1 and splice that coi out of array
  // need to iterate backward through array


  // test for collision for red button

  if (dist(player.x, player.y, 550, 100) <= (player.r + 40) / 2) {
    state = 'you win';
    // fill(255, 0, 0);
    // ellipse(550, 60, 40, 40);
  }


  // checking for collision


  for (let i = coins.length - 1; i >= 0; i--) {

    // check for collison with the player
    if (dist(player.x, player.y, coins[i].x, coins[i].y) <= (player.r + coins[i].r) / 2) {

      points--;
      coins.splice(i, 1);

    } else if (coins[i].y > h) {
      coins.splice(i, 1);
    }
  }
  // checking for collision for enemies

  for (let i = enemies.length - 1; i >= 0; i--) {

    // check for collison with the player
    if (dist(player.x, player.y, enemies[i].x, enemies[i].y) <= (player.r + enemies[i].r) / 2) {

      points++;
      enemies.splice(i, 1);

    } else if (enemies[i].y > h) {
      enemies.splice(i, 1);
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

  // 1st rec. this is the first horitzontal rect in the game just above the player.

  rect(340, 490, 80, 10);

  //2nd rec. this is the second one just above the first rect.
  rect(330, 450, 80, 10);

  // 3 vert this is the vertical one just above second rect.
  rect(310, 340, 10, 80);


  // 4 rec. This is horitzontal rect right nect to the 3rd veritcal rect.
  rect(220, 340, 80, 10);
  rect(200, 250, 10, 80);

  // top right rec
  rect(240, 200, 80, 10);

  //atach with the wall up top. Vertical rect at the top
  rect(150, 100, 10, 50);

  // attache with the wall vert

  // this is the vertical rect at the right side that is attach with the walls which is coming down.

  rect(480, 300, 10, 80);

  // this is the small rect on the right side going up the red circle
  rect(510, 250, 20, 10);
  rect(570, 160, 90, 10);

  // target
  fill(255, 0, 0);
  ellipse(550, 100, 40, 40);
  pop();

  //text('points' + points , w/4, h - 30);
  fill(149, 217, 89);
  textSize(17);
  text(`Immunity level: ${points}`, w / 5, h - 30);

  if (points >= 7) {
    state = 'you win';
  } else if (points <= 0) {
    state = 'game over';
  }

}


function level1MouseClicked() {
  points++;
  //click++;
  console.log('points = ' + points);


}

function youWin() {

  background(255, 50, 80);


  // textSize(20);
  // text('click anywhere to restart', w / 2, h / 2);


  // for pose poseNet
  image(video, 0, 0);


  if (pose) {

    let eyeR = pose.rightEye;
    let eyeL = pose.leftEye;
    let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y); // to check the distance and make it go larger ot smaller .
    fill(255, 0, 0);
    ellipse(pose.nose.x, pose.nose.y, d);
    ellipse(pose.leftEye.x, pose.leftEye.y, d);
    ellipse(pose.rightEye.x, pose.rightEye.y, d);
    push();
    textSize(20);
    textAlign(CENTER);
    fill(0);
    text('You Tested', pose.leftEye.x, pose.leftEye.y);
    text('Cogratulations !!!!!', pose.rightEye.x, pose.rightEye.y);
    text('Negative ', pose.nose.x, pose.nose.y);
    fill(255);
    textSize(50);
    stroke(255);
    text('You Are Safe', 300, 100);
    pop();
  }

  //for poseNet


}

function youWinMouseClicked() {

  state = 'title';
  click = 0;

}

function gameOver() {

  background(255, 0, 0);
  textSize(50);


  if (lives >= 0) {

    // display number lives to the screen
    text(lives + ' lives left ', w / 2, h / 2);
    textSize(30);
    text('click anywhere to play again', w / 2, h * 3 / 4);


  } else {

    text('Game Over ', w / 2, h / 2);
    textSize(30);
    text('click anywhere to restart', w / 2, h * 3 / 4);



  }


}

function gameOverMouseClicked() {

  if (lives >= 0) { //this  means they have 0 lives going into it beacuse lifr was already taken away
    lives--;
    state = 'level 1';
  } else {
    state = 'title';
  }
  points = 1;

}
