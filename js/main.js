const initApp = () => {
  console.log("DOMContentLoaded: Completed!");
  startGame();
};

document.addEventListener("DOMContentLoaded", initApp);

const startGame = () => {
  playerChoice();
};

const playerChoice = () => {
  const p1Images = document.querySelectorAll(
    ".gameboard__player .icon_wrapper img"
  );

  p1Images.forEach((img) => {
    img.addEventListener("click", (event) => {
      p1Images.forEach((img) => {
        if (event.target === img) {
          img.parentElement.classList.add("selected");
          updatePlayerMessage(event.target.alt);
        } else {
          img.parentElement.classList.add("not-selected");
        }
      });
    });
  });
};

const updatePlayerMessage = (playerChoice) => {
  const p1Message = document.querySelector(".gameboard__player h3");
  p1Message.textContent += " " + playerChoice;
};
