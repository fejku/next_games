const cardsArray = [
  "bell",
  "bull",
  "cake",
  "candle",
  "candy",
  "cat",
  "cow",
  "dragon",
  "fish",
  "ghost",
  "grapes",
  "hat",
  "heart",
  "honey",
  "ice-cream",
  "key",
  "microwave",
  "milk",
  "orange",
  "pear",
  "photographer",
  "pot",
  "shark",
  "spanner",
  "star",
  "strawberry",
  "unicorn",
];

export const CARDS_AMOUNT = 8;

const pickCards = () => {
  const result: string[] = [];
  const tempCards = [...cardsArray];
  for (let i = 0; i < CARDS_AMOUNT; i++) {
    const randIndex = Math.floor(Math.random() * tempCards.length);
    const [removedCard] = tempCards.splice(randIndex, 1);
    result.push(removedCard);
  }
  return result;
};

export const shuffleCards = () => {
  const pickedCards = pickCards();
  const doubledCards = [...pickedCards, ...pickedCards];

  const result: string[] = [];
  while (doubledCards.length > 0) {
    const randIndex = Math.floor(Math.random() * doubledCards.length);
    const [removedCard] = doubledCards.splice(randIndex, 1);
    result.push(removedCard);
  }

  return result;
};
