type MyButtonProps = {
  children?: React.ReactNode;
  className?: string;
  type?: string;
  disabled?: boolean;
};

function MyPrimaryButton({
  children,
  className,
  type,
  disabled,
}: MyButtonProps) {
  return (
    <button
      type={type ? "submit" : "button"}
      disabled={disabled}
      className={`flex items-center justify-center px-5 py-3 text-blue-600 whitespace-nowrap hover:bg-blue-600 
      hover:text-white border-blue-600 border-2 rounded-[8px] cursor-pointer duration-150 ${className}`}
    >
      {children}
    </button>
  );
}

export default MyPrimaryButton;
