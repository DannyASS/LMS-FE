import Loading from "./Spinner";

const Button = ({ children, className = "", type = "button", onLoading = false, ...props }) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg bg-black text-white hover:bg-grey-800 transition cursor-pointer ${className}`}
      {...props}
    >
      {onLoading? <Loading /> : children}
    </button>
  );
};

export default Button;
