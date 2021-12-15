class Form {

  constructor() {
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.title = createElement('h2');
    this.reset=createButton('Reset');
    this.rules=createButton('Rules');

    this.keyCount = createElement('h3');
    this.moneyCount =  createElement('h3');
  }
  hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }
  showSuccess(){
    this.keyCount.html("Keys: "+ player.keyCount);
    this.keyCount.position(displayWidth-450,5);

    this.moneyCount.html("Score: "+player.moneyCount);
    this.moneyCount.position(displayWidth-450,30);


  }

  display(){
    background(backgroundImage);

    this.title.html("Deadline Game");
    this.title.position(displayWidth/2 - 50, 0);

   
    this.input.position(displayWidth/2 - 40 , displayHeight/2 - 80);
    this.button.position(displayWidth/2 + 30, displayHeight/2);
    this.reset.position(displayWidth-70,20);
    this.rules.position(50,20);

    this.rules.mousePressed(()=>{
      swal("Rules of the Game", " 1. Player needs to collect atleast 3 keys and 100 score \n"+
           "2. After collecting the required treasure, the player can open the"+
           "   door by touching it and will be the winner. \n"+
           "3. If the ghost's weapon toches the player, then player will loose the game.");
    });
    
    
    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();
      player.name = this.input.value();
      playerCount+=1;
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);
      this.greeting.html("Hello " + player.name)
      this.greeting.position(displayWidth/2 - 70, displayHeight/4);
      swal("Rules of the Game", " 1. Player needs to collect atleast 3 keys and 30 score \n"+
           "2. After collecting the required treasure, the player can open the"+
           "   door by touching it and will be the winner, to do so press the right key  \n"+
           "3. If the ghost touches the player, then player will loose the game. \n"+
           "4. After you have completed the game your rank will be displayed on the screen."
           );
   // swal('Thank you for contacting us!',lines.join('\n\n'),'success');  
  });
  
    this.reset.mousePressed(()=>{
      game.update(0);
      player.updateCount(0);
      Player.updateSurvivorsAtEnd(0);
      database.ref('players').remove();
      
    })

  }
}
