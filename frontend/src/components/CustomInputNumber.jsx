const CustomInputNumber = ({
  value,
  startContent,
  handleBlur,
  endContent,
  onChange,
  width,
}) => {
  const handleKeyDown = (e) => {
    if (["e", "E", "-", "+"].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      onChange(e);
    }
  };
  return (
    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-gray-100">
      <div className="flex items-center justify-center px-3">
        {startContent}
      </div>
      <input
        type="text"
        value={value}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        onBlur={handleBlur}
        className={`${width} p-2 text-center focus:outline-none`}
      />
      <div className="flex items-center justify-center px-3">{endContent}</div>
    </div>
  );
};
export default CustomInputNumber;
