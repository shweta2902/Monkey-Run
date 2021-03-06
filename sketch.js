
var monkey , monkey_running,monkey_stop
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground,groundImage,invisibleGround
var SurvivalTime;

var PLAY=1;
var END=0;
var gameState=PLAY;
var gameOver,gmeOverImage,obstaclesGroup,bananaGroup
var restart,restartImage;

function preload(){
   monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  groundImage=loadImage("ground.png")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  
  gameOverImage=loadImage("gameover.png")
  restartImage=loadImage("restart.jpg")
  monkey_stop=loadImage("sprite_0.png")
 
}



function setup() {
  
    
  createCanvas(windowWidth,windowHeight)
  monkey=createSprite(50,height-50,10,50)
    monkey.addAnimation("running",monkey_running)
  monkey.addAnimation("stop",monkey_stop)
    monkey.scale=0.2
 
  
    ground=createSprite(0,height-180,width,10);
    ground.addImage(groundImage)
    ground.velocityX=-2;
    ground.scale=2
    
    ground.x = ground.width/2;
  
    invisibleGround=createSprite(50,height-20,windowWidth,10)
  invisibleGround.visible=false;
    monkey.depth=ground.depth+1
  //monkey.setCollider("circle",0,0,100)
  
  obstaclesGroup= new Group();
  bananaGroup= new Group();
  bananaGroup.setColliderEach("circle",0,0,50);
  //monkey.debug=true;
  
  //game over sprite
    gameOver=createSprite(width/2-10,height/2-50);
    gameOver.addImage(gameOverImage)
    gameOver.scale=0.5;
    gameOver.visible=false
  
    //restart sprite
     restart=createSprite(width/2,height/2)
     restart.addImage(restartImage)
     restart.scale=0.1;
     restart.visible=false;
      score=0;
      SurvivalTime=0;
  }

function draw() {
  background("white");
  textSize(20);
  fill("black")
  text("Score:  "+score,width-100,20)
  text("Survival Time: "+SurvivalTime,20,20)
  
  console.log(ground.x)
      gameOver.visible=false
      restart.visible=false
  
      if(gameState===PLAY)
      {
           monkey.changeAnimation("running",monkey_running)
          SurvivalTime=Math.ceil(frameCount/frameRate())
          if (ground.x<0){
                  ground.x = ground.width/2;
              }
        
        //move the ground
        ground.velocityX = -(4 + 3*score/100)
       
        //jumping the trex on space key press
        
        if(touches.length > 0 || keyDown("space") && monkey.y>=100) {
              monkey.velocityY = -10;
           touches=[];
          }
        
          monkey.velocityY = monkey.velocityY + 0.8
        
        //stop trex from falling down 
        monkey.collide(invisibleGround);
        
        spawnObstacles();
        banana();
        
        if(monkey.isTouching(bananaGroup)){
            bananaGroup.destroyEach();
           score=score+2;
          
              }
        
        if(monkey.isTouching(obstaclesGroup)){
            gameState=END;
          console.log(gameState)
              }
          }
     
   if (gameState===END)
        {
          //game over and restart visibilty
          gameOver.visible=true
          restart.visible=true
          
              if(mousePressedOver(restart))
              {
                  reset();
              }
           
          //stop the ground
          ground.velocityX = 0;
          monkey.velocityY=0;
          
          //reassigning the lifetime
          obstaclesGroup.setLifetimeEach(-1);
          bananaGroup.setLifetimeEach(-1);
          //stopping the .obstacle
          obstaclesGroup.setVelocityXEach(0);
          bananaGroup.setVelocityXEach(0);
          monkey.changeAnimation("stop",monkey_stop)
     }

  drawSprites();
  
}


function spawnObstacles()
{
  if(frameCount%300===0)
    {
      var obstacle = createSprite(600,height-50,40,10);
      obstacle.velocityX=-4
      obstacle.addImage(obstaceImage);
      obstacle.x=Math.round(random(600,900))
     
      obstacle.scale=0.2;
      obstacle.lifetime=250;
      obstaclesGroup.add(obstacle);
    }
  
}

function banana()
{
  if(frameCount%80===0)
    {
      var banana = createSprite(600,20,40,10);
      banana.addImage(bananaImage)
      banana.y=Math.round(random(10,height-100))
      banana.scale=random(0.08,0.1)
      banana.velocityX=-2;
      banana.lifetime=300;
      
      
      //adjusting the depth
      banana.depth=monkey.depth;
       monkey.depth=monkey.depth+1;
      bananaGroup.add(banana);
     
      
      
    }
}
function reset()
{
  gameState=PLAY;
  
  gameOver.visible=false
  restart.visible=false
  obstaclesGroup.destroyEach();
  bananaGroup.destroyEach();
  score=0;
  SurvivalTime=0;
  
}
