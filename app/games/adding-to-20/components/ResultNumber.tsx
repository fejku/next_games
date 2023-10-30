import Image from "next/image";

type Props = {
  value: number;
  onClick: (value: number) => void;
  checkWrongAnswer: boolean;
};

const ResultNumber = ({ value, onClick, checkWrongAnswer }: Props) => {
  const onNumberClick = () => {
    onClick(value);
  };

  return (
    <div className="relative w-[20%] h-14 flex justify-center items-center sm:w-[10%]">
      <button
        className="absolute w-12 h-12 flex justify-center items-center border-zinc-700 border-2 rounded-tr-2xl rounded-bl-2xl shadow-md text-xl bg-white/70 sm:hover:border-zinc-800 sm:hover:shadow-zinc-800"
        onClick={onNumberClick}
      >
        {value}
      </button>
      {checkWrongAnswer && (
        <Image
          src="/games/adding-to-20/cancel.svg"
          width={0}
          height={0}
          alt="Wrong answer"
          className="absolute w-10 h-10"
        />
      )}
    </div>
  );
};

export default ResultNumber;
