import React from "react";

type EncryptItemProps = {
  item: any;
  stateForm: any;
  handleChange: (arg0: any) => void;
};

const EncryptItem = ({ item, handleChange, stateForm }: EncryptItemProps) => {
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
        {item.options.map((answer: any) => (
          <option key={answer.key} value={answer.text}>
            {answer.key}. {answer.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EncryptItem;
