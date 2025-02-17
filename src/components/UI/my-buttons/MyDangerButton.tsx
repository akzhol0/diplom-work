type MyButtonProps = {
  children?: React.ReactNode;
  className?: string;
  type?: string;
};

function MyDangerButton({ children, className, type }: MyButtonProps) {
  return (
    <button
      type={type ? "submit" : "button"}
      className={
        "flex items-center justify-center text-red-600 px-5 py-3 hover:bg-red-600 hover:text-white border-red-600 border-2 rounded-[8px] cursor-pointer duration-150 " +
        " " +
        className
      }
    >
      {children}
    </button>
  );
}

export default MyDangerButton;
