import React from "react";

const DragFileIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-12 w-12 mb-3"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 15a4 4 0 004 4h10a4 4 0 004-4v-3a4 4 0 00-4-4H7a4 4 0 00-4 4v3z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8M12 6v8" />
    </svg>
  );
};

export default DragFileIcon;
