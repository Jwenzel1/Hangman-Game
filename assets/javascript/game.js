var dogs = ["Akita"];
var word;
var guessedLetters = [];
var gameStarted = false;
var guessesRemaining = 10;
var winsCounter = 0;

//Event Listener that handles the key presses
document.onkeyup = function(event){
  if(gameStarted){
    var buttonPressed = event.key.toLowerCase();
    if((buttonPressed.charCodeAt() >= 'A'.charCodeAt() && buttonPressed.charCodeAt() <= 'Z'.charCodeAt()) ||
        (buttonPressed.charCodeAt() >= 'a'.charCodeAt() && buttonPressed.charCodeAt() <= 'z'.charCodeAt())){
        //console.log(buttonPressed);
        if(buttonPressed !== "Control" && buttonPressed !== "Alt"){
          if(word.indexOf(buttonPressed) > -1){
            var playArea = document.getElementById("playArea");
            for(var i = 0; i < word.length; i++){
              if(word[i].toLowerCase() === buttonPressed){
                //var replacement = document.createElement("p").appendChild(document.createTextNode(buttonPressed));
                var replacement = document.createTextNode(buttonPressed + "  ");
                playArea.replaceChild(replacement, playArea.childNodes[i+1]);
              }
            }

          }
          /*if (guessedLetters.indexOf(buttonPressed) === -1) {
            guessedLetters.push(buttonPressed);
            guessesRemaining--;
            updateGuesses();
          }*/

        }
    }
  }
  else{
    var dog = dogs[Math.floor(Math.random() * dogs.length)];
    var playArea = document.getElementById("playArea");
    for (var i = 0; i < dog.length; i++) {
      var space = document.createElement("P").appendChild(document.createTextNode("_  "));
      playArea.appendChild(space);
    }
    word = dog.toLowerCase();
    updateGuesses();
    updateWins();
    gameStarted = true;
  }

}

function updateGuesses(){
  var guesses = document.getElementById('guessesLeft')
  var newGuesses = document.createElement("p").appendChild(document.createTextNode(guessesRemaining));
  guesses.removeChild(guesses.childNodes[0]);
  guesses.appendChild(newGuesses);
}

function updateWins(){
  var wins = document.getElementById('winsNum');
  var newWins = document.createElement("span").appendChild(document.createTextNode(winsCounter));
  wins.removeChild(wins.childNodes[1]);
  wins.appendChild(newWins);
}

//Game Object
function game(word, numGuesses){
  this.word = word;
  this.numGuesses = numGuesses;
  this.getNumGuesses = function(){
    return numGuesses;
  }
  this.getWord = function(){
    return word;
  }
}
