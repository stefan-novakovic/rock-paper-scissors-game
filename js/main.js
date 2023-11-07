const initApp = () => {
  console.log("DOMContentLoaded: Completed!");
  playerChoice();
};

document.addEventListener("DOMContentLoaded", initApp);

const playerChoice = () => {
  const p1Images = document.querySelectorAll(
    ".gameboard__player .icon_wrapper img"
  );
  p1Images.forEach((img) => {
    img.addEventListener("click", (event) => {
      p1Images.forEach((img) => {
        if (event.target === img) {
          img.parentElement.classList.add("selected");
        } else {
          img.parentElement.classList.add("not-selected");
        }
      });
    });
  });
};
