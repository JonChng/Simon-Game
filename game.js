

var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;

//2. Create a new variable called level and start at level 0.
var level = 0;

//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


function nextSequence(){
  level ++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.round(Math.random()*3);
  var randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);

};

function playSound(name){
  $("#"+name).fadeIn(100).fadeOut(100).fadeIn(100);
  var sound = new Audio(name + ".mp3");
  sound.play();
};


function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function ()
   {$("#" + currentColour).removeClass("pressed");
 },100);
};


$('.btn').click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

  function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function(){nextSequence();},1000);
        userClickedPattern = [];
      }
    }
    else{
      console.log("wrong");
      var newSound = new Audio("wrong.mp3");
      newSound.play();
      $('body').addClass("game-over");
      setTimeout(function(){
        $('body').removeClass("game-over")
      },200);
      $('#level-title').text("Game over! Press any key to restart.");
      startOver();
    }
  }

});

function startOver(){
  level = 0;
  started = false;
  gamePattern = [];
  userClickedPattern =[];
}
