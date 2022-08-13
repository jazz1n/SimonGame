var buttonColors = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).on("keydown", function() {
  if (!started) {
    nextSequence();
    started = true;
  };
});

$(".btn").on("click", function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  console.log("user= " + userClickedPattern);
  checkAnswer(userClickedPattern.length - 1);
})

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 3);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log("game= " + gamePattern);
  animatePress(randomChosenColor);
  playSound(randomChosenColor);
  level++;
  $("h1").text("level " + level);
}

function animatePress(button) {
  $("#" + button).addClass("pressed");
  setTimeout(function() {
    $("#" + button).removeClass("pressed");
  }, 100)
}

function playSound(button) {
  var audio = new Audio("sounds\\" + button + ".mp3");
  audio.play();
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    animatePress(userClickedPattern[currentLevel]);
    playSound(userClickedPattern[currentLevel]);
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log(false);
    animatePress(userClickedPattern[currentLevel]);
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    level=0;
    started = false;
  }
}
