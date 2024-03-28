type Props = {
  answer: number;
  checkAnswer: (value: number) => void;
};

const Answer = ({ answer, checkAnswer }: Props) => {
  const onAnswerClick = () => {
    checkAnswer(answer);
  };

  return (
    <button
      className="bg-[#896545] flex-1 rounded hover:bg-[#6d4f34]"
      onClick={onAnswerClick}
    >
      {answer}
    </button>
  );
};

export default Answer;
