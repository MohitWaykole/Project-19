//creating all the required variable
var bananaImg, obstaclesImg, obstaclesGroup, foodGroup, score = 0, player;
var bg, bgImg;
var gameState;
var count;

function preload(){
  //loading banana image
  bananaImg = loadImage("banana0.png");
  //loading obstacles image
  obstaclesImg = loadImage("stone0.png");
  //loading player image
  player = loadAnimation("monkey10.png","monkey11.png","monkey12.png","monkey13.png",
  "monkey14.png","monkey15.png","monkey16.png","monkey17.png","monkey18.png");
  //loading background image
  bgImg = loadImage("jungle.jpg");
}

function setup() {
  //creating canvas
  createCanvas(700,400);

  //cerating background
  bg = createSprite(380, 200, 400, 400);
  bg.addImage(bgImg);
  bg.scale = 2.6;
  bg.velocityX = -3;

  //creating monkey
  monkey = createSprite(100, 300, 40, 40);
  monkey.addAnimation("monkey",player);
  monkey.scale = 0.2;

  //creating background
  ground = createSprite(350, 350, 700, 10);
  ground.shapeColor = "black";
  ground.visible = false;

  /* declaring that variable obstaclesGroup and 
  foodGroup are not variable but they are Group*/
  obstaclesGroup = new Group();
  foodGroup = new Group();

  //declaring start to the gameState
  gameState = "start";

  /*declaring 0 to the variable count*/
  count = 0;

}

function draw() {
  /*setting background to black*/
  background(0);  

  //monkey will collide ground
  monkey.collide(ground);

  //things insside the codition will only work when game state is play
  if (gameState == "start"){
  //calling all the function
  food();
  obstacles();

  //reseting the background
  if (bg.x <= 280){
    bg.x = 400;
  }

  //giving jump to the monkey 
  if (keyDown("space") && monkey.y >= 282){
    monkey.velocityY = -20;
  }

  //adding gravity
  monkey.velocityY = monkey.velocityY + 0.8;

  //printing monkey's y position
  console.log(monkey.y);

  /*if obstacles is touching monkey for the first time
  change the scale of monkey and add 1 to count variable*/
  if (obstaclesGroup.isTouching(monkey)){
    monkey.scale = 0.2;
    count = count + 1;
  }

  //if count equal to 2 change game state to end
  if (count == 2){
    gameState = "end";
  }

  /*if food group is touching monkey destroy 
  food group and add 2 in the score*/
  if (foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    score = score + 2;
  }
  //writing switch case to change the scale of monkey at different score
  switch (score){
    case 10 : monkey.scale = 0.12;
    break;

    case 20 : monkey.scale = 0.14;
    break;

    case 30 : monkey.scale = 0.16;
    break;

    case 40 : monkey.scale = 0.18;
    break;
    default : break;
  }
  //end of condition of if gameState equal to play
  }else if (gameState == "end"){
  monkey.velocityY = 0;
  bg.velocityX = 0;
  foodGroup.setLifetimeEach(-1);
  obstaclesGroup.setLifetimeEach(-1);
  foodGroup.velocityXEach = 0;
  obstaclesGroup.velocityXEach = 0;
  score = 0;
  foodGroup.destroyEach();
  obstaclesGroup.destroyEach();
  //end of condition of if gameState equal to end
    }
  //drawing sprites
  drawSprites();

  //displaying score
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score, 600, 30);
}

function food(){
  //creating food at every 170th frame
  if (World.frameCount % 170 == 0){
    banana = createSprite(700, random(120, 200));
    banana.addImage(bananaImg);
    banana.scale = 0.05;
    banana.velocityX = -5;
    banana.lifetime = 400;
    foodGroup.add(banana);
  }
}

function obstacles(){
  //creating obstacles at every 100th frame
  if (World.frameCount % 100 == 0){
    ob = createSprite(700, 300, 20, 20);
    ob.addImage(obstaclesImg);
    ob.scale = 0.12;
    ob.lifetime = 400;
    ob.velocityX = -5;
    obstaclesGroup.add(ob);
  }
}
