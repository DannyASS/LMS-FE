const Card = ({ className = "", children }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md border p-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ className = "", children }) => {
  return <div className={`p-2 ${className}`}>{children}</div>;
};

export default Card;
