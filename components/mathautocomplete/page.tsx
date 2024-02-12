import React, { useState } from "react";

const MathAutocomplete: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setInputValue(value);

    // List of mathematical operations
    const mathOptions: { [key: string]: string } = {
      "plus": "+",
      "minus": "-",
      "multiply": "*",
      "divide": "/",
      // Add more mathematical operations as needed
    };

    // Filter options based on input value
    const filteredOptions = Object.keys(mathOptions).filter(option =>
      option.includes(value)
    ).map(option => mathOptions[option]);

    setOptions(filteredOptions);
  };

  const handleSelectOption = (option: string) => {
    setInputValue(inputValue + option);
    setOptions([]);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Type a math operation..."
      />
      {options.length > 0 && (
        <ul>
          {options.map(option => (
            <li key={option} onClick={() => handleSelectOption(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MathAutocomplete;
