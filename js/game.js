/***************Checks whether user plays on mobile************/
var screenSizeMobile = false
var screenSizeQuery = matchMedia("(max-width: 1119px)")

function deviceUsedToView(x) {
  if (x.matches) {
    screenSizeMobile = true
    changeTextAndControls()
  } else {
    screenSizeMobile = false
    changeTextAndControls()
  }
}

deviceUsedToView(screenSizeQuery)
screenSizeQuery.addListener(deviceUsedToView)

/******Shows right text and controls depending mobile or pc*****/

function changeTextAndControls() {
  if (screenSizeMobile === true) {
    $("#level-title-mobile").css("display", "block")
    $("#level-title").css("display", "none")
    if (gameStarted === false) {
      $("#start-button").css("display", "inline-block")
    } else {
      $("#start-button").css("display", "none")
    }
  } else if (screenSizeMobile === false) {
    $("#level-title").css("display", "block")
    $("#level-title-mobile").css("display", "none")
    $("#start-button").css("display", "none")
  }
}

changeTextAndControls()
/***************Starts the game and keeps current level:***************/
//  Variable that stores whether the game is started or not.
var gameStarted = false
//  Variable that stores the current level.
var currentLevel = 0
//  Starts game if not already started:

//  On desktop:
$(document).keypress(function(event) {
  if (gameStarted === false) {
    gameStarted = true
    nextSequence()
  } else {
    activateButton(event.key)
  }
})

//  On mobile:
$("#start-button").click(function() {
  if (gameStarted === false) {
    gameStarted = true
    $("#start-button").css("display", "none")
    nextSequence()
  } else {}
})

/********Creates new levels, keeps game color pattern and user color pattern:********/
//  Variable that stores available button colors in an array.
var buttonColors = ["red", "blue", "green", "yellow"]
//  Array that stores the current color pattern.
var gamePattern = []
//  Array that stores the pattern clicked by the user
var userPattern = []

//  Function that creates new levels
function nextSequence() {
  userPattern = []
  currentLevel = currentLevel + 1
  $("#level-title").text("Level " + currentLevel)
  $("#level-title-mobile").text("Level " + currentLevel)
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber]
  gamePattern.push(randomChosenColor)
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100)
  playSound(randomChosenColor)
}

/***************Checks the user pattern against right pattern:***************/

//  Compares user pattern to the game pattern.
function checkPattern(level) {
  if (userPattern[level] === gamePattern[level]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence()
      }, 1000)
    } else {}
  } else {
    gameOver()
  }
}

//  Game Over.
function gameOver() {
  $("body").addClass("game-over")
  setTimeout(function() {
    $("body").removeClass("game-over")
  }, 200)
  playSound("wrong")
  $("#level-title").text("Game Over, Press Any Key to Restart")
  $("#level-title-mobile").text("Game Over, Press the Button to Restart")
  if (screenSizeMobile === true) {
    $("#start-button").css("display", "inline-block")
  }
  gameStarted = false
  currentLevel = 0
  gamePattern = []
}


/********Detects which button the user activates by click or keypress:********/
//  Detects keyresses for triggering the corresponding buttons.
function activateButton(key) {
  if (gameStarted === true) {
    switch (key) {
      case "1":
        handleUserChosenButton($("#green").attr("id"))
        break;
      case "2":
        handleUserChosenButton($("#red").attr("id"))
        break;
      case "3":
        handleUserChosenButton($("#yellow").attr("id"))
        break;
      case "4":
        handleUserChosenButton($("#blue").attr("id"))
        break;
      default:
    }
  } else {}
}

//  Detects user clicks on buttons.
$(".btn").click(function() {
  handleUserChosenButton(this.id)
})

//  Handles a button activation.
function handleUserChosenButton(userChosenColor) {
  userPattern.push(userChosenColor)
  playSound(userChosenColor)
  animatePress(userChosenColor)
  checkPattern(userPattern.length - 1)
}


/***************Animations and sounds for activated buttons:***************/

//  Animates buttons when a user clicks on them
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed")
  }, 100)
}

//  Function that plays the right sound based on the color.
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play()
}