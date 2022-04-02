//Eu não fiz a compatibilidade de tudo, tinha algumas coisas que precisariam segurar e outras que precisava de clicar em determinado local da tela pra realizar a ação.
//Espero que goste :D

var path,mainCyclist;
var player1,player2,player3, player4;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img, carroImg;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;
var gameoverSound, trilhaSound;
var batidaSound;

var pinkCG, yellowCG,redCG, carro; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var batidas=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("Road.png");
  mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  mainRacerImg2= loadAnimation("mainPlayer3.png");
  
  oppPink1Img = loadAnimation("opponent1.png","opponent2.png");
  oppPink2Img = loadAnimation("opponent3.png");
  
  oppYellow1Img = loadAnimation("opponent4.png","opponent5.png");
  oppYellow2Img = loadAnimation("opponent6.png");
  
  oppRed1Img = loadAnimation("opponent7.png","opponent8.png");
  oppRed2Img = loadAnimation("opponent9.png");

  carroImg = loadImage("carro.png");
  
  cycleBell = loadSound("bell.mp3");
  gameOverImg = loadImage("gameOver.png");

  gameoverSound = loadSound("gameove.mp3")
  trilhaSound = loadSound("trilha.mp3")
  batidaSound = loadSound("batida.mp3");
}

function setup(){
  
createCanvas(1200,300);
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(450,150);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
//set collider for mainCyclist

mainCyclist.setCollider("rectangle",0,0,40,40);
mainCyclist.debug = true;
  
gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
carro = new Group();

  
}

function draw() {
    background(0);
    drawSprites();
    textSize(20);
    fill(255);
    text("Distancia: " + distance+"m", width - 200, 50);
    
    
    if(gameState === PLAY){
    
    distance = distance + Math.round(getFrameRate()/50);
    path.velocityX = -(6 + 2*distance/150);
    
    mainCyclist.y = World.mouseY;
    
    edges= createEdgeSprites();
    mainCyclist .collide(edges);
    
    //code to reset the background
    if(path.x < 0 ){
      path.x = width/2;
    }
    
      //code to play cycle bell sound
    if(keyDown("space")) {
      trilhaSound.play();
      cycleBell.play();
    }
    
    //creating continous opponent players
    var select_oppPlayer = Math.round(random(1,3));
    
    if (World.frameCount % 150 == 0) {
      if (select_oppPlayer == 1) {
        pinkCyclists();
      } else if (select_oppPlayer == 2) {
        yellowCyclists();
      } else {
        redCyclists();
        carrLegal();
      }


    }
    
    if(pinkCG.isTouching(mainCyclist)){
      gameState = END;
      player1.velocityY = 0;
      player1.addAnimation("opponentPlayer1",oppPink2Img);
      batidas = batidas + 1;
      gameoverSound.play();
      }
      
      if(yellowCG.isTouching(mainCyclist)){
        gameState = END;
        player2.velocityY = 0;
        player2.addAnimation("opponentPlayer2",oppYellow2Img);
        batidas = batidas + 1;
        gameoverSound.play();
      }
      
      if(redCG.isTouching(mainCyclist)){
        gameState = END;
        player3.velocityY = 0;
        player3.addAnimation("opponentPlayer3",oppRed2Img);
        batidas = batidas + 1;
        gameoverSound.play();
      }

      if(carro.isTouching(mainCyclist)){
        gameState = END;
        player4.velocityY = 0;
        batidas = batidas + 1;
        gameoverSound.play();
      }
      
  }
  else if (gameState === END) {

      gameOver.visible = true;
    
      textSize(20);
      fill(255);
      text("Clique AQUI para recomeçar!", 500,200);
    
      path.velocityX = 0;
      mainCyclist.velocityY = 0;
      mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
    
      pinkCG.setVelocityXEach(0);
      pinkCG.setLifetimeEach(-1);
    
      yellowCG.setVelocityXEach(0);
      yellowCG.setLifetimeEach(-1);
    
      redCG.setVelocityXEach(0);
      redCG.setLifetimeEach(-1);

      carro.setVelocityXEach(0);
      carro.setLifetimeEach(-1);



      if(mousePressedOver(gameOver) && gameOver.visible == true) {
        reset();
        carro.destroyEach();
        
      }
  }
}

function pinkCyclists(){
        player1 =createSprite(width,Math.round(height/2, height/2 + 100) - 90);
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(width,Math.round(height/2, height/2 + 100));
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(width,Math.round(height/2, height/2 + 100));
        player3.scale =0.06;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);
}

function carrLegal(){
        player4 = createSprite(width,Math.round(height/2, height/2 + 100));
        player4.scale = 0.20;
        player4.velocityX = 13;
        player4.addImage(carroImg);
        player4.setLifetime=300;
        carro.add(player4);
        console.log(player4);
        batidaSound.play();

}


function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  
  distance = 0;
 }



