const Label = ({ children, className = "", ...props }) => {
  return (
    <label className={`text-sm font-medium ${className}`} {...props}>
      {children}
    </label>
  );
};

export default Label;
