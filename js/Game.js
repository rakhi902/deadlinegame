class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){     
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    
    bg = createSprite(displayWidth/2,displayHeight/2-120,displayWidth, displayHeight);
    bg.addImage(gameMap);

    door = createSprite(displayWidth-100,displayHeight/2+60);
    door.addImage(doorCloseImg);

   

    survivor1 = createSprite(200,450,20,20);
    survivor1.shapeColor = "blue";
    survivor1.addImage(survivor1_img);
    survivor1.scale = 0.2;

    survivor2 = createSprite(400,450,20,20);
    survivor2.shapeColor = "blue";
    survivor2.addImage(survivor2_img);
    survivor2.scale = 0.2;

    survivor3 = createSprite(600,450,20,20);
    survivor3.shapeColor = "blue";
    survivor3.addImage(survivor3_img);
    survivor3.scale = 0.2;

    survivor4 = createSprite(800,450,20,20);
    survivor4.shapeColor = "blue";
    survivor4.addImage(survivor4_img);
    survivor4.scale = 0.2;

    
    survivors = [survivor1,survivor2,survivor3,survivor4];
    //survivors = [survivor1];
  }
 

  play(){
   
    background(0);
    bg.scale = 1.8;
   
    form.hide();
    form.showSuccess();
   // image(doorCloseImg,displayWidth-100,400);
    Player.getPlayerInfo();
    player.getSurvivorsAtEnd();
    //spawnKeys();
    
    if(allPlayers !== undefined){
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 100;
      var y = 450;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;
      //  x = x+300;
        //position the cars a little away from each other in x direction

        x = allPlayers[plr].distance;
               
        y = y;
        survivors[index-1].x = x;
        survivors[index-1].y = y;
        
       
       if(player.keyCount >=3 && survivors[index-1].isTouching(door) && player.moneyCount >=30){
         survivors[index-1].destroy();
         door.addImage(doorOpenImg);
         player.rank = player.rank + 1;
         Player.updateSurvivorsAtEnd(player.rank);
         swal("Congratulations! You have got rank "+player.rank);



       }
        if (index === player.index){
          stroke(10);
          fill("red");

          ellipse(x,y,60,60);
          if(survivors[index-1].isTouching(keysGroup)){
            keysGroup.destroyEach();
            player.keyCount = player.keyCount+1;
            player.update();
   
          }
  
          if(survivors[index-1].isTouching(moneyGroup)){
            moneyGroup.destroyEach();
            player.moneyCount = player.moneyCount+10;
            player.update();
   
          }
          //checking condition for end game
        if(ghostGroup.isTouching(survivors[index-1])){
          player.live = 0;
          player.update();
          gameState = 2;
          survivors[index-1].destroy();
         }
         
        }

        

      }
   
    }
    if(keyIsDown(LEFT_ARROW) && player.index !== null){
       player.distance = player.distance-10;     
       player.update();
    }

  
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance = player.distance+10;//      
      player.update();
  
    }
   
   
    drawSprites();
  }
  
  end(){
  
    swal("Oops! You loose the game. Better Luck next time.");
    gameState = 3;
    
  }
 

  spawnKeys(){
    if(frameCount%50===0){
    key = createSprite(Math.round(random(100,displayWidth-200)),-10);
    key.addImage(keyImage);
    key.velocityY = 8;
    key.scale = 0.3;
    keysGroup.add(key);
    }
  }
  spawnMoney(){
    if(frameCount%70===0){
    money = createSprite(Math.round(random(100,displayWidth-200)),-10);
    money.addImage(moneyImage);
    money.velocityY = 8;
    money.scale = 0.3;
    moneyGroup.add(money);
    }
  }
  spawnGhost(){
    position = Math.round(random(1,4));
  // console.log(position);
    ghost = createSprite(-50,50);
    ghost.addImage(ghostImage);
    ghost.lifetime=500;
    ghost.scale = 0.2;
    
   
      if(position==1){    
        if(frameCount%50===0){
          ghost.x=-0;
          ghost.velocityX = 7;
          ghost.velocityY = 8;

          ghostGroup.add(ghost);
     }
       }
  
    if(position==2){
      if(frameCount%40===0){
        ghost.x=displayWidth;
        ghost.velocityX = -8;
        ghost.velocityY = 6;
        
        ghostGroup.add(ghost); 
      }
    }
    if(position==3){    
      if(frameCount%50===0){
        ghost.x=-0;
        ghost.velocityX = 8;

        ghostGroup.add(ghost);
   }
     }

  if(position==4){
    if(frameCount%30===0){
      ghost.x=displayWidth;
      ghost.velocityX = -5;
      
      ghostGroup.add(ghost); 
    }
  }
 
   
  }

  
  
  
}