export const random = () => Math.floor(Math.random() * 10) + 1;
export const playSuccessSound = () =>
  new Audio("/games/adding-to-20/success.mp3").play();
export const playFailureSound = () =>
  new Audio("/games/adding-to-20/failure.mp3").play();
