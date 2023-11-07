import {
  updateP1Session,
  updateCpSession,
  updateP1Local,
  updateCpLocal,
} from "./game.js";

const initApp = () => {
  console.log("DOMContentLoaded: Completed!");
  startGame();
};

document.addEventListener("DOMContentLoaded", initApp);

const startGame = () => {
  updateScore();
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
            computerChoice(event.target.alt.split(" ")[1]);
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

const computerChoice = (p1Choice) => {
  const cpChoiceArray = ["Rock", "Paper", "Scissors"];
  const cpChoiceIndex = Math.floor(Math.random() * 3);
  const cpChoice = cpChoiceArray[cpChoiceIndex];

  const cpImages = document.querySelectorAll(
    ".gameboard__computer .icon_wrapper img"
  );

  cpImages.forEach((img) => {
    img.parentElement.classList.add("cp_images_fadeout_animation");
  });
  setTimeout(() => {
    computerChoiceShow(p1Choice, cpChoice);
  }, 4000);
};

const computerChoiceShow = (p1Choice, cpChoice) => {
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
      setTimeout(() => {
        updateWinnerMessage(p1Choice, cpChoice);
      }, 1000);
      setTimeout(() => {
        resetBoard();
      }, 4000);
    } else {
      img.parentElement.style.display = "none";
    }
  });
};

const updateComputerMessage = (cpChoice) => {
  const cpMessage = document.querySelector(".gameboard__computer h2");
  cpMessage.textContent += " " + cpChoice;
};

const updateWinnerMessage = (p1Choice, cpChoice) => {
  const casesArray = [
    "Player One = Computer",
    "Rock smashes scissors!",
    "Paper wraps rock!",
    "Scissors cut paper!",
  ];

  console.log("P1", p1Choice, "CP", cpChoice);
  const result =
    p1Choice === cpChoice
      ? "Tie game"
      : p1Choice === "Paper" && cpChoice === "Rock"
      ? "🔥 Player One Wins 🔥"
      : p1Choice === "Scissors" && cpChoice === "Paper"
      ? "🔥 Player One Wins 🔥"
      : p1Choice === "Rock" && cpChoice === "Scissors"
      ? "🔥 Player One Wins 🔥"
      : "🤖 Computer Wins 🤖";

  const winnerMessage =
    p1Choice === cpChoice
      ? casesArray[0]
      : p1Choice === "Paper" && cpChoice === "Rock"
      ? casesArray[2]
      : p1Choice === "Scissors" && cpChoice === "Paper"
      ? casesArray[3]
      : p1Choice === "Rock" && cpChoice === "Scissors"
      ? casesArray[1]
      : p1Choice === "Rock" && cpChoice === "Paper"
      ? casesArray[2]
      : p1Choice === "Paper" && cpChoice === "Scissors"
      ? casesArray[3]
      : casesArray[1];

  if (result === "🔥 Player One Wins 🔥") {
    let p1LocalScore = updateP1Local();
    let p1SessionScore = updateP1Session();

    localStorage.setItem("p1LocalScore", JSON.stringify(p1LocalScore));
    document.querySelector(
      ".scoreboard__alltime .scoreboard__values p:first-child"
    ).textContent = p1LocalScore;

    sessionStorage.setItem("p1SessionScore", JSON.stringify(p1SessionScore));
    document.querySelector(
      ".scoreboard__session .scoreboard__values p:first-child"
    ).textContent = p1SessionScore;
  }

  if (result === "🤖 Computer Wins 🤖") {
    let cpLocalScore = updateCpLocal();
    let cpSessionScore = updateCpSession();

    localStorage.setItem("cpLocalScore", JSON.stringify(cpLocalScore));
    document.querySelector(
      ".scoreboard__alltime .scoreboard__values p:last-child"
    ).textContent = cpLocalScore;

    sessionStorage.setItem("cpSessionScore", JSON.stringify(cpSessionScore));
    document.querySelector(
      ".scoreboard__session .scoreboard__values p:last-child"
    ).textContent = cpSessionScore;
  }

  const p1Message = document.querySelector(".gameboard__player h2");
  p1Message.textContent = result;

  const cpMessage = document.querySelector(".gameboard__computer h2");
  cpMessage.textContent = winnerMessage;
};

const resetBoard = () => {
  const p1Message = document.querySelector(".gameboard__player h2");
  p1Message.textContent = "Player One Chooses...";
  const cpMessage = document.querySelector(".gameboard__computer h2");
  cpMessage.textContent = "Computer Chooses...";
  const divsP1 = document.querySelectorAll(".gameboard__player div");
  const divsCp = document.querySelectorAll(".gameboard__computer div");

  divsP1.forEach((div) => {
    div.classList.remove("not-selected");
    div.classList.remove("selected");
    div.classList.remove("no-hover");
    div.children[0].setAttribute("tabindex", "0");
  });

  divsCp.forEach((div) => {
    div.classList.remove("cp_images_fadeout_animation");
    div.classList.remove("cp_images_fadein_animation");
    div.style.display = "block";
  });
  startGame();
};

const updateScore = () => {
  document.querySelector(
    ".scoreboard__alltime .scoreboard__values p:first-child"
  ).textContent = JSON.parse(localStorage.getItem("p1LocalScore") || 0);

  document.querySelector(
    ".scoreboard__alltime .scoreboard__values p:last-child"
  ).textContent = JSON.parse(localStorage.getItem("cpLocalScore") || 0);

  document.querySelector(
    ".scoreboard__session .scoreboard__values p:first-child"
  ).textContent = JSON.parse(sessionStorage.getItem("p1SessionScore") || 0);

  document.querySelector(
    ".scoreboard__session .scoreboard__values p:last-child"
  ).textContent = JSON.parse(sessionStorage.getItem("cpSessionScore") || 0);
};
