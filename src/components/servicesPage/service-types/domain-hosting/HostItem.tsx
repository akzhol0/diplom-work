import React from "react";

type HostItemProps = {
  item: any;
  handleChange: (arg0: any, arg1: string) => void;
  formState: any;
};

const HostItem = ({ item, handleChange, formState }: HostItemProps) => {
  return (
    <div className="mt-2 flex justify-between items-center py-1 border-b rounded-lg">
      <p className="ps-2">
        {item.id}. {item.question}
      </p>
      <select
        className="w-full sm:w-32 lg:w-72 border rounded-lg p-1 ms-2"
        value={formState[item.state] || ""}
        onChange={(e) => handleChange(item.state, e.target.value)}
      >
        <option disabled value=""></option>
        {item.selectOptions.map((option: string) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default HostItem;
