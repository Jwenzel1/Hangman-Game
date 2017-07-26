var dogs = ["Affenpinscher", "Akita", "Azawakh", "Barbet", "Basenji", "Beagle", "Bloodhound", "Bolognese", "Borzoi", "Boxer", "Briard", "Brittany", "Bulldog", "Bullmastiff", "Chihuahua", "Chinook", "Cockapoo", "Collie", "Dachshund", "Dalmatian", "Goldador", "Goldendoodle", "Greyhound", "Harrier", "Havanese", "Keeshond", "Komondor", "Kooikerhondje", "Kuvasz", "Labradoodle", "Leonberger", "Lowchen", "Maltese", "Maltipoo", "Mastiff", "Mutt", "Newfoundland", "Otterhound", "Papillon", "Peekapoo", "Pekingese", "Plott", "Pointer", "Pomeranian", "Poodle", "Pug", "Puggle", "Puli", "Rottweiler", "Saluki", "Samoyed", "Schipperke", "Schnoodle", "Sloughi", "Stabyhoun", "Vizsla", "Weimaraner", "Whippet", "Xoloitzcuintli", "Yorkipoo"];

var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

var gameStarted = false;
var winsCounter = 0;
var currentGame;

//Event Listener that handles the key presses
document.onkeyup = function(event){
  var keystroke = event.key.toLowerCase();
  if(gameStarted){
    if(alphabet.indexOf(keystroke) > -1){
      if(!(currentGame.alreadyGuessed(keystroke))){
        var correct = currentGame.addGuessedLetter(keystroke);
        if(correct){
          updatePlayArea(currentGame.word, keystroke);
        }
        else{
          currentGame.updateGuesses();
          addToGuessArea(keystroke);
        }
      }
    }
    if(currentGame.numGuesses === 0){
      update("information", "You Lose. Press any key to play again.");
      gameStarted = false;
    }
    else if (checkForWin()){
      update("information", "You Win. Press any key to play again.");
      winsCounter++;
      gameStarted = false;
    }
  }
  else{
    update("information", "");
    update("wins", winsCounter);
    purgeChildren("playArea");
    purgeChildren("guessesArea");
    currentGame = new Game(dogs[Math.floor(Math.random() * dogs.length)].toLowerCase());
    currentGame.updateGuesses();
    setUpPlayarea(currentGame);
    gameStarted = true;
  }
};

function checkForWin(){
  var playAreaNodes = getPlayArea().childNodes;
  for(var i = 0; i < playAreaNodes.length; i++){
    if(playAreaNodes[i].textContent === "_"){
      return false;
    }
  }
  return true;
};

function addToGuessArea(letter){
  var area = document.getElementById("guessesArea");
  var child = document.createElement("span");
  child.textContent = letter;
  area.appendChild(child);
};

function updatePlayArea(word, key){
  var playAreaKids = getPlayArea().childNodes;
  for(var i = 0; i < word.length; i++){
    if(word[i] === key){
      playAreaKids[i].textContent = key;
    }
  }
};

function setUpPlayarea(gameObj){
  var playArea = getPlayArea();
  for(var i = 0; i < gameObj.word.length; i++){
    var space = document.createElement("span");
    space.textContent = "_";
    playArea.appendChild(space);
  }
};

function purgeChildren(id){
  var parent = document.getElementById(id);
  while(parent.childNodes.length != 0){
    parent.removeChild(parent.childNodes[0]);
  }
};

function update(id, value){
  document.getElementById(id).textContent = value;
};

function getPlayArea(){
  return document.getElementById("playArea");
};

//Game Object
function Game(word){
  this.word = word;
  this.numGuesses = 11; //needs to be one more than what you want it to be
  this.wrongLetters = [];
  this.correctLetters = [];

  this.updateGuesses = function(){
    this.numGuesses--;
    document.getElementById("guessesLeft").textContent = this.numGuesses;
  };

  this.addGuessedLetter = function(letter){
    if(this.word.indexOf(letter) > -1){
      this.correctLetters.push(letter);
      return true;
    }
    else{
      this.wrongLetters.push(letter);
      return false;
    }
  };

  this.alreadyGuessed = function(letter){
    return(this.correctLetters.indexOf(letter) > -1 || this.wrongLetters.indexOf(letter) > -1);
  };
};
