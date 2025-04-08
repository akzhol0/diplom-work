import React from "react";
import { AntivirusTypes } from "@/components/types/types";

type SingleItemProps = {
  state: any;
  handleChange: (arg: any) => void;
  item: AntivirusTypes;
};

const SingleItem = ({ state, handleChange, item }: SingleItemProps) => {
  return (
    <div className="w-full md:w-4/5 min-h-12 rounded-xl border-b flex justify-between items-center mb-4 md:mb-2 lg:mb-0">
      <p className="ps-2">
        {item.id}. {item.question}
      </p>
      {item.inputOrSelect === "select" ? (
        <select
          className="min-w-[100px] max-w-[100px] lg:min-w-[300px] lg:max-w-[300px] border rounded-lg p-1"
          value={state}
          onChange={handleChange}
          name={item.state}
        >
          <option disabled value=""></option>
          {item.selectOptions.map((option: string) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          className="min-w-[150px] max-w-[150px] lg:min-w-[300px] lg:max-w-[300px] h-12 ps-2 rounded-lg focus:outline-0"
          value={state}
          onChange={handleChange}
          placeholder="Писать сюда..."
          name={item.state}
          type="text"
        />
      )}
    </div>
  );
};

export default SingleItem;
