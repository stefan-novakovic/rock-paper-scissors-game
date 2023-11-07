export const updateP1Session = () => {
  const getP1SessionScore = JSON.parse(
    sessionStorage.getItem("p1SessionScore") || 0
  );
  const newP1SessionScore = getP1SessionScore + 1;
  return newP1SessionScore;
};

export const updateCpSession = () => {
  const getCpSessionScore = JSON.parse(
    sessionStorage.getItem("cpSessionScore") || 0
  );
  const newCpSessionScore = getCpSessionScore + 1;
  return newCpSessionScore;
};

export const updateP1Local = () => {
  const getP1LocalScore = JSON.parse(localStorage.getItem("p1LocalScore") || 0);
  const newP1LocalScore = getP1LocalScore + 1;
  return newP1LocalScore;
};

export const updateCpLocal = () => {
  const getCpLocalScore = JSON.parse(localStorage.getItem("cpLocalScore") || 0);
  const newCpLocalScore = getCpLocalScore + 1;
  return newCpLocalScore;
};
