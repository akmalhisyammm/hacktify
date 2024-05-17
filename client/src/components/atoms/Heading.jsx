const Heading = ({ children }) => {
  return (
    <div className="text-3xl font-bold">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
        {children}
      </span>
    </div>
  );
};

export default Heading;
