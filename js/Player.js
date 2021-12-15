class Player {
  constructor(){
    this.index = null;
    this.name = null;
    this.rank=null;
    this.distance=0;
    this.keyCount = 0;
    this.moneyCount = 0;
    this.live = 1;
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance: this.distance,  
      key: this.keyCount,
      score: this.moneyCount,
      live: this.live
    });
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }
    getSurvivorsAtEnd(){
     var SurvivorsAtEndRef = database.ref('SurvivorsAtEnd');
     SurvivorsAtEndRef.on("value", (data)=>{
      this.rank = data.val();

     })
   }
   static updateSurvivorsAtEnd(rank){
    database.ref('/').update({
      SurvivorsAtEnd: rank
    })

   }
}
