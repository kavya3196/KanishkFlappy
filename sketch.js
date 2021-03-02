
/*const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;*/

var bird, upbarrier, downbarrier,bk,bkimage,birdimage,bird2image, pipe1, pipe2,ground;
var group1, group2, gameover, gamesprite, score;
var coinimage,coin,coinGroup;
var play = 1;
var end = 0;
var gameState = play;
var deadSound,flySound;
var countcoins = 0;
var angle;
var timer=240;
var grounded,ground;
var restart,resetimage;
var highscore =0;
//var bg = "bk.png";
var backgroundimage;


function preload()
{
	
backgroundimage = loadImage("bk.png");
bkimage = loadImage ("bk1.jpg");
birdimage = loadAnimation("realbird3.png");
bird2image = loadAnimation("real2bird.png");
gameover = loadImage("GameOver.png");
pipe1 = loadImage("pipe4.png");
pipe2 = loadImage("pipe3.png");
grounded = loadImage("ground.png");
deadSound = loadSound("die.mp3");
flySound = loadSound("swoosh.mp3")
coinimage=loadImage("coin1.jpg");
resetimage = loadImage("restart.png");


}

function setup() {
	createCanvas(1200, 700);



	

	bird = createSprite(100,350,10,10);
	bird.addAnimation("bird",birdimage);
	bird.scale = 0.5;

	gamesprite = createSprite(300,350);
	gamesprite.addImage(gameover);
	gamesprite.visible = false;


	group1 = new Group ();
	group2 = new Group ();
	coinGroup = new Group();



	ground = createSprite(300,700,700,20)
	ground.addImage("ground", grounded)
	
	bird.setCollider("circle",0,0,40);

	restart = createSprite(300,480,20,20);
	restart.addImage("resetgame", resetimage);
	restart.visible = false;
	restart.scale = 0.5;
    
	
	score  = 0;
	
}  


function draw() {
 
  background(backgroundimage);

 
	
 
  if(gameState===play){
	
	if(keyDown("space")){
		bird.velocityY = -15;
	  
	   flySound.play();
	}

	bird.velocityY += 2;
	
	timer=timer-0.033;
    score = score+Math.round(getFrameRate()/60);
  
  
  if(coinGroup.isTouching(bird)){
	coinGroup.destroyEach();
	countcoins+=1;
	
	
}

  createBarrier();
  createdownBarrier();
  Coins();
 
  if(group1.isTouching(bird) || group2.isTouching(bird) ||
  bird.isTouching(ground) || keyWentDown("space")&&timer===0 ){
   gameState = end;
   deadSound.play();
 }

  }
  else if (gameState === end){
	  gamesprite.visible = true;
	  restart.visible = true;
	  bird.x = 50;
	  bird.y = 350;
	  bird.velocityX = 0;
	  bird.velocityY = 0;
	  group1.setVelocityXEach(0);
	  group2.setVelocityXEach(0);
	  group1.setLifetimeEach(-1);
	  group2.setLifetimeEach(-1);
	 
	 if(score>highscore){
		highscore= score;
	}
	 if(mousePressedOver(restart)){
	   reset();
	 }
  }
 textFont ("Montserrat") 
fill ("red");
textSize (25);
text ("Score: "+score +"|"+"Timer: "+Math.round(timer),40,600);
text("coin " + " : " + countcoins,40,50);
text("HighScore : "+highscore,40,100);

bird.collide(group1);
bird.collide(group2);
  drawSprites();
  
  
  
  


 
}

function createBarrier(){
	if (frameCount%60===0){
		upbarrier = createSprite(1200,0,70,random(100,500));
		upbarrier.addImage(pipe1);
		upbarrier.scale = 0.3;
		upbarrier.velocityX = -5;
		group1.add(upbarrier);
	}


}
function createdownBarrier(){
	if (frameCount%80===0){
		downbarrier = createSprite(1200,680,70,random(500,700));
		downbarrier.addImage(pipe2);
		downbarrier.scale = 0.6;
		downbarrier.velocityX = -5;
		group2.add(downbarrier);
	}
}

function Coins(){
	if(frameCount%150===0){
coin= createSprite(400,300,10,20);
coin.addAnimation("Coin", coinimage);
coin.x = Math.round(random(100,280));
coin.y = Math.round(random(100,400))
coin.velocityX = -3;
coin.lifetime = 134;
coin.scale = 0.3;
coinGroup.add(coin);
console.log(coin.depth)
console.log(bird.depth)
	  
	   
   }
}
function reset(){
	gameState = play;
	bird.x =100;
	bird.y  = 250;
	bird.changeAnimation("bird",birdimage)
	//bird.velocityX = 0;
	//bird.velocityY = 0;
	timer=240;
	score = 0;
	countcoins= 0;
	
	group1.destroyEach();
	group2.destroyEach();
	coinGroup.destroyEach();
	gamesprite.visible = false;
	restart.visible=false;

}

