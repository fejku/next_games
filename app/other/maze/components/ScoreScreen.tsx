import Confetti from "react-confetti";

type Props = { setStateGame: () => void };

const ScoreScreen = ({ setStateGame }: Props) => {
  const onPlayAgainClick = () => {
    setStateGame();
  };

  return (
    <div className="flex justify-center items-center flex-col h-full gap-12">
      <Confetti />
      <div className="text-4xl sm:text-6xl">Congratulations</div>
      <button
        className="p-2 border shadow text-xl sm:text-2xl hover:shadow-zinc-400"
        onClick={onPlayAgainClick}
      >
        Play again
      </button>
    </div>
  );
};

export default ScoreScreen;
