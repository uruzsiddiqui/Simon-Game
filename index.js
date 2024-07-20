
var buttoncolours = ["red", "green", "blue", "yellow"];
var buttoncolours1 = [];
var userClickedPattern = [];
var level = 0;
var started = false;


$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function()
{
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
  
});

function nextSequence()
{
  userClickedPattern = [];
  level++;
  $("#level-title").text("level" + level);
    var n = Math.floor(Math.random() * 4);
    var choosen = buttoncolours[n];
    buttoncolours1.push(choosen);

    $("#" + choosen).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(choosen);
}

function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor)
{
    $("#" + currentColor).addClass("pressed");
    setTimeout(function()
  {
     $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel)
{ 
    if(buttoncolours1[currentLevel] === userClickedPattern[currentLevel])
      {
        if(userClickedPattern.length === buttoncolours1.length)
          {
            setTimeout(function()
          {
            nextSequence();
          },1000);
          }
          else{
            playSound("wrong");
            $("body").addClass("game-over");
            $("level-title").text("Game Over, text any key to restart");

            setTimeout(function()
          {
               $("body").removeClass("game-over");
          });

          startOver();
          }
      } 
}

function startOver()
{
  level = 0;
  started = false;
  buttoncolours1 = [];
}