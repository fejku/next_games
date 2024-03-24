import Image from "next/image";

type Props = {
  value: number;
  maxBalls: number;
  onSelectedAnswer: (correctAnswer: boolean) => void;
};

const Field = ({ value, maxBalls, onSelectedAnswer }: Props) => {
  const onBallClick = () => {
    onSelectedAnswer(value === maxBalls);
  };

  return (
    <div className="bg-[#896545] rounded p-2 ">
      <Image
        src={`/games/most-balls/candy-${value}.png`}
        width={0}
        height={0}
        className="w-full h-full object-contain cursor-pointer"
        sizes="100vw"
        alt="Ball"
        quality={100}
        priority={true}
        onClick={onBallClick}
      />
    </div>
  );
};

export default Field;
