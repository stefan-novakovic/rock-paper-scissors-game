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
    img.addEventListener(
      "click",
      (event) => {
        p1Images.forEach((img) => {
          if (event.target === img) {
            img.parentElement.classList.add("selected");
            img.parentElement.classList.add("no-hover");
            updatePlayerMessage(event.target.alt.split(" ")[1]);
            computerChoice();
          } else {
            img.setAttribute("tabindex", "-1");
            img.parentElement.classList.add("not-selected");
          }
        });
      },
      { once: true }
    );
  });
};

const updatePlayerMessage = (playerChoice) => {
  const p1Message = document.querySelector(".gameboard__player h2");
  p1Message.textContent += " " + playerChoice;
};

const computerChoice = () => {
  const cpChoiceArray = ["Rock", "Paper", "Scissors"];
  const cpChoiceIndex = Math.floor(Math.random() * 3);
  const cpChoice = cpChoiceArray[cpChoiceIndex];
  console.log(cpChoice);

  const cpImages = document.querySelectorAll(
    ".gameboard__computer .icon_wrapper img"
  );

  cpImages.forEach((img) => {
    img.parentElement.classList.add("cp_images_fadeout_animation");
  });
  setTimeout(() => {
    computerChoiceShow(cpChoice);
  }, 4000);
};

const computerChoiceShow = (cpChoice) => {
  const cpImages = document.querySelectorAll(
    ".gameboard__computer .icon_wrapper img"
  );

  cpImages.forEach((img) => {
    if (img.alt === cpChoice) {
      img.parentElement.classList.remove("cp_images_fadeout_animation");
      img.parentElement.classList.add("cp_images_fadein_animation");
      setTimeout(() => {
        updateComputerMessage(cpChoice);
      }, 50);
    } else {
      img.parentElement.style.display = "none";
    }
  });
};

const updateComputerMessage = (cpChoice) => {
  const cpMessage = document.querySelector(".gameboard__computer h2");
  cpMessage.textContent += " " + cpChoice;
};
