const DotSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center space-x-1 h-10">
      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '-0.32s' }}></div>
      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '-0.16s' }}></div>
      <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
    </div>
  );
};

export default DotSpinner;