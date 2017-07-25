var dogs = ["Affenpinscher", "Akita", "Azawakh", "Barbet", "Basenji", "Beagle", "Bloodhound", "Bolognese", "Borzoi", "Boxer", "Briard", "Brittany", "Bulldog", "Bullmastiff", "Chihuahua", "Chinook", "Cockapoo", "Collie", "Dachshund", "Dalmatian", "Goldador", "Goldendoodle", "Greyhound", "Harrier", "Havanese", "Keeshond", "Komondor", "Kooikerhondje", "Kuvasz", "Labradoodle", "Leonberger", "Lowchen", "Maltese", "Maltipoo", "Mastiff", "Mutt", "Newfoundland", "Otterhound", "Papillon", "Peekapoo", "Pekingese", "Plott", "Pointer", "Pomeranian", "Poodle", "Pug", "Puggle", "Puli", "Rottweiler", "Saluki", "Samoyed", "Schipperke", "Schnoodle", "Sloughi", "Stabyhoun", "Vizsla", "Weimaraner", "Whippet", "Xoloitzcuintli", "Yorkipoo"];
//var dogs = ["Xoloitzcuintli"];
var unwantedPresses = ["control", "alt", "backspace", "shift", "capslock", "tab", "arrowup", "arrowdown", "arrowright", "arrowleft", "enter", "delete", "escape", "numlock"];
var word;
var correctlyGuessedLetters;
var guessedLetters = [];
var gameStarted = false;
var guessesRemaining = 0;
var winsCounter = 0;

//Event Listener that handles the key presses
document.onkeyup = function(event){
  if(gameStarted){
    var buttonPressed = event.key.toLowerCase();
    if((buttonPressed.charCodeAt() >= 'a'.charCodeAt() && buttonPressed.charCodeAt() <= 'z'.charCodeAt())){
      if(unwantedPresses.indexOf(buttonPressed) === -1){
        if(word.indexOf(buttonPressed) > -1){
          var playArea = document.getElementById("playArea");
          for(var i = 0; i < word.length; i++){
            if(word[i].toLowerCase() === buttonPressed){
              var replacement = document.createTextNode(" " + buttonPressed + " ");
              playArea.replaceChild(replacement, playArea.childNodes[i]);
              correctlyGuessedLetters++;
            }
          }
          console.log(correctlyGuessedLetters);
          if(correctlyGuessedLetters >= word.length && correctlyGuessedLetters > 0){
            gameStarted = false;
            winsCounter++;
            replaceInfo("You Win. Press any key to play again");
          }
        }
        else if(guessedLetters.indexOf(buttonPressed) === -1){
          var guessesArea = document.getElementById("guessesArea");
          guessesArea.appendChild(document.createTextNode(" " + buttonPressed + " "));
          guessedLetters.push(buttonPressed);
          guessesRemaining--;
          updateGuesses();
          if(guessesRemaining === 0){
            gameStarted = false;
            replaceInfo("You Lose. Press any key to play again");
          }
        }
      }
    }
  }
  else{
    clearAllChildren("playArea");
    clearAllChildren("guessesArea");
    var dog = dogs[Math.floor(Math.random() * dogs.length)];
    var playArea = document.getElementById("playArea");
    for (var i = 0; i < dog.length; i++) {
      var space = document.createElement("P").appendChild(document.createTextNode(" _ "));
      playArea.appendChild(space);
    }
    word = dog.toLowerCase();
    guessedLetters.length = 0;
    guessesRemaining = 10;
    correctlyGuessedLetters = 0;
    updateGuesses();
    updateWins();
    replaceInfo("");
    gameStarted = true;
  }
}

function clearAllChildren(id){
  var parent = document.getElementById(id);
  while(parent.childNodes.length != 0){
    parent.removeChild(parent.childNodes[0]);
  }
}

function replaceInfo(message){
  var info = document.getElementById("information");
  info.replaceChild(document.createTextNode(message), info.childNodes[0]);
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
