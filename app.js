/* GAME RULES:
    -Player Must Guess a Number between MIN & MAX
    -Player gets a Certain amount of guesses
    -Notify Player of Guesses remaining
    -Notify the Player the Correct answer if he Loose
    -Let Player Choose to play again
*/

// Game Values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI Variables
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play Again Event Listener
game.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// Listen for Guess
guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);

  //   Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please Enter a Number Between ${min} & ${max}`, "red");
  }

  //   Check if WON
  if (guess === winningNum) {
    // Disable Input
    guessInput.disabled = true;
    // Change Border Color
    guessInput.style.borderColor = "green";
    // Set Message
    setMessage(`${winningNum} is Correct, YOU WIN.`, "green");
    // Play Again
    guessBtn.value = "Play Again";
    guessBtn.className += "play-again";

    // body.style.backgroundColor = "yellow";
  } else {
    // Wrong Number
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // Game Over- LOST
      guessInput.disabled = true;
      guessInput.style.borderColor = "red";
      setMessage(
        `GAME OVER!! You Lost. The Correct Number was ${winningNum}`,
        "red"
      );

      // Play Again
      guessBtn.value = "Play Again";
      guessBtn.className += "play-again";
    } else {
      // Game Continues- Answer Wrong
      guessInput.style.borderColor = "red";
      //   Clear Input
      guessInput.value = "";
      setMessage(`Guess is NOT CORRECT, ${guessesLeft} Guesses Left`, "red");
    }
  }
});

// Get Winning Number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * max) + 1;
}

// Set MEssage
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
