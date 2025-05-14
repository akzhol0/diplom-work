import React from "react";

type SingleItemRiskPageProps = {
  item: any;
  setUserAnswerCounter: (arg0: number) => void;
  userAnswerCounter: number;
};

const SingleItemRiskPage = ({
  item,
  setUserAnswerCounter,
  userAnswerCounter,
}: SingleItemRiskPageProps) => {
  return (
    <div className="lg:w-4/5 flex justify-between mt-2 border-b py-2 px-2 rounded-xl">
      <p>
        {item.id}. {item.question}
      </p>
      <select
        className="w-[100px] md:w-[200px] lg:w-[300px] border rounded h-7"
        name="quiver"
        id="quiver"
        onChange={(e) => {
          setUserAnswerCounter(
            Number(userAnswerCounter) + Number(e.target.value),
          );
        }}
      >
        <option value=""></option>
        {item.answers.map((answer: any) => (
          <option id={answer.score} key={answer.text} value={answer.score}>
            {answer.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SingleItemRiskPage;
