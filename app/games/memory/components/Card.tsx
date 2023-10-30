import Image from "next/image";

import { useMemoryStore } from "../store/zustand";

import style from "./Card.module.css";

type Props = {
  index: number;
  card: string;
};

const Card = ({ index, card }: Props) => {
  const { openCards, clearedCards, setOpenCards } = useMemoryStore();

  const onCardClick = () => {
    if (openCards.length < 2) {
      setOpenCards(index);
    }
  };

  const isOpen = openCards.includes(index);
  const isCleared = clearedCards.includes(card);

  return (
    <button
      onMouseDown={onCardClick}
      className={`select-none relative w-20 aspect-square sm:w-32 md:w-40 ${
        isCleared && "invisible cursor-default"
      } ${style.card}`}
    >
      <Image
        src={`/games/memory/${card}.svg`}
        alt="Card image"
        width={600}
        height={600}
        draggable={false}
        priority
        className={`absolute top-0 w-full h-full p-1 bg-white shadow-gray-400 shadow-sm rounded transition-transform duration-500 ease-linear  ${
          isOpen ? "" : style.card_show
        }`}
      />
      <Image
        src={`/games/memory/cover.svg`}
        alt="Card cover"
        width={600}
        height={600}
        draggable={false}
        priority
        className={`absolute top-0 w-full h-full shadow-gray-400 shadow-sm rounded transition-transform duration-500 ease-linear ${
          isOpen ? style.card_show : ""
        }`}
      />
    </button>
  );
};

export default Card;

// Najlepszy wynik
