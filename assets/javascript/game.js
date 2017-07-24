var dogs = ["Affenpinscher", "AfghanHound", "AiredaleTerrier", "Akita"];
var gameStarted = false;
var guessesRemaining = 10;

//Event Listener that handles the key presses
document.onkeyup = function(event){
  if(gameStarted){
    var buttonPressed = event.key;
    if(
      (buttonPressed.charCodeAt() >= 'A'.charCodeAt() && buttonPressed.charCodeAt() <= 'Z'.charCodeAt()) ||
      (buttonPressed.charCodeAt() >= 'a'.charCodeAt() && buttonPressed.charCodeAt() <= 'z'.charCodeAt())){
        console.log(buttonPressed);
    }
  }
  else{
    var dog = dogs[Math.floor(Math.random() * dogs.length)];
    var playArea = document.getElementById("playArea");
    for (var i = 0; i < dog.length; i++) {
      var space = document.createElement("p").appendChild(document.createTextNode("_  "));
      playArea.appendChild(space);
    }
    console.log(document.getElementById('guessesLeft').innerHTML);
    document.getElementById('guessesLeft').innerHTML.replace("/\\d/", guessesRemaining);
    gameStarted = true;
  }

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
