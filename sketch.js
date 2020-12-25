
var gameOver,monkey,background1,ground,bananasGroup,rocksGroup,PLAY,END,
    bananaImage, groundImage, monkeyImage, gameOverImage;
gameOver.visible=false;


function preload(){
var bananaImage=loadImage("banana.jpg");
var groundImage=loadImage("ground.jpg");
var monkeyImage=loadImage("monkey.jpg");
var rocksImage=loadImage("rocks.jpg");
var gameOverImage=loadImage("gameOver.jpg");
}
function setup() {
  createCanvas(400, 400);
  var gameOver = createSprite(200,200,100,20);
  gameOver.addAnimation();
  
  var monkey= createSprite(50,330,40,70);
  monkey.addAnimation("LY",monkey);
  monkey.scale=0.1;
  
  
var background1=createSprite(200,200,400,400);
background1.addAnimation("TI",ground);
background1.scale=2;
  
  var ground=createSprite(200,350,400,20);
ground.visible=false;
 var bananasGroup=createGroup();
var score=0;
var rocksGroup=createGroup();
  
  var PLAY=1;
var END=0;
var gameState=PLAY;
}


function draw() {
  
  background(220);
  background1.x=background.width/2;

  if (gameState===PLAY){
    if (keyDown("space")){
    monkey.velocityY=-5;
  }
  if (monkey.isTouching(bananasGroup)){
    score=score+10;
    bananasGroup.destroyEach();
    monkey.scale=monkey.scale+0.2;
  }
  if (monkey.isTouching(rocksGroup)){
    gameState=END;
    rocksGroup.destroyEach();
    monkey.scale=monkey.scale-0.5;
  }
  score=Math.round(frameRate+10/20);
    spawnRocks();
  spawnBananas();
  }
 text ("SCORE:"+score,320,50);
 
 score.depth=background1.depth+1;
  console.log(score);
  background1.velocityX=-6;
  monkey.depth=background1.depth+1;
  
  if(background1.x < 0){
    background1.x=background.width/2;
  }
  
  if(gameState===END){
    gameOver.visible=true;
    gameOver.depth=background.depth+1;
  }

  if (mousePressedOver(gameOver)){
    reset();
  }
  monkey.velocityY=monkey.velocityY+1;
  monkey.collide(ground);

 drawSprites(); 
}

function spawnBananas(){
  if (World.frameCount%60===0){
    var bananas = createSprite(400,250,50,50);
    bananas.setAnimation("Banana");
    bananas.scale=0.09;
    bananas.velocityX=-3;
    var rand=randomNumber(110,270);
    bananas.y=rand;
    bananasGroup.add(bananas);
  }
}

function spawnRocks(){
  if (World.frameCount%70===0){
    var rocks = createSprite(400,360,50,50);
    rocks.setAnimation("Stone");
    rocks.scale=0.2;
    rocks.velocityX=-4;
    rocksGroup.add(rocks);
  }
}
  function reset(){
    rocksGroup.destroyEach();
    bananasGroup.destroyEach();
    score=0;
  }


