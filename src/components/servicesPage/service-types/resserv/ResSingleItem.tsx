import React from "react";

type ResSingleItemProps = {
  item: any;
  handleChange: (arg0: any) => void;
  stateForm: any;
};

const ResSingleItem = ({
  item,
  handleChange,
  stateForm,
}: ResSingleItemProps) => {
  const controlChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const obj = {
      question: item.question,
      name: item.state,
      answer: e.target.value,
    };
    handleChange(obj);
  };

  return (
    <div className="flex justify-between items-center border-b rounded-lg p-2">
      <p>
        {item.id}. {item.question}
      </p>
      <select
        onChange={(e) => controlChange(e)}
        value={stateForm.state}
        className="w-[30%] h-[30px] flex gap-2 border p-1 rounded-lg"
        name={item.state}
      >
        <option value=""></option>
        {item.answers.map((answer: any) => (
          <option id={item.question} key={answer} value={answer}>
            {answer}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ResSingleItem;
