const TextLengthCounter = ({ textLength, maxTextLength, bottom, right }) => {
  return (
    <div
      className={`flex gap-1 absolute bottom-${bottom} right-${right} ${
        textLength <= maxTextLength ? "text-green-1" : "text-red-400"
      }`}>
      <span>{textLength}</span>
      <span>|</span>
      <span>{maxTextLength}</span>
    </div>
  );
};

export default TextLengthCounter;
