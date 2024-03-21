import { useState } from "react";
import "../css/DestinationChooser.css";

export function FilteringBar({
  applyFilters,
  showSlider,
}: {
  applyFilters: (tags: string[], price: number) => void;
  showSlider: boolean;
}) {
  const [tags, setTags] = useState<string[]>([]);
  const [price, setPrice] = useState(5);

  const handleSliderChange = (newPrice: number) => {
    setPrice(newPrice);
  };

  const handleCheckboxChange = (label: string, isChecked: boolean) => {
    if (isChecked) {
      setTags((prevTags) => [...prevTags, label.toLowerCase()]);
    } else {
      setTags((prevTags) =>
        prevTags.filter((tag) => tag.toLowerCase() !== label.toLowerCase())
      );
    }
  };

  const handleApplyFilters = () => {
    applyFilters(tags, price);
  };

  return (
    <div className="FilterCheckboxes">
      <div className="CheckboxGroup">
        <Checkbox label="By" onChange={handleCheckboxChange} />
        <Checkbox label="Natur" onChange={handleCheckboxChange} />
      </div>
      <div className="CheckboxGroup">
        <Checkbox label="Historie" onChange={handleCheckboxChange} />
        <Checkbox label="Kultur" onChange={handleCheckboxChange} />
      </div>
      <div className="CheckboxGroup">
        <Checkbox label="Mat" onChange={handleCheckboxChange} />
        <Checkbox label="Sport" onChange={handleCheckboxChange} />
      </div>
      {showSlider && (
        <div className='="SliderContainer'>
          <Slider onChange={handleSliderChange} />
        </div>
      )}
      <div className="ButtonContainer">
        {!showSlider && (
          <Button title="Sett tags" onClick={handleApplyFilters} />
        )}
        {showSlider && (
          <Button title="Søk etter reise" onClick={handleApplyFilters} />
        )}
      </div>
    </div>
  );
}

const Slider = ({ onChange }: { onChange: (newPrice: number) => void }) => {
  const levels: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [level, setLevel] = useState<number>(levels[4]);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    setLevel(newValue);
    onChange(newValue);
  };

  return (
    <div className="customSlider">
      <p>Valgt prisnivå: {level}</p>
      <input
        type="range"
        min={levels[0]}
        max={levels[levels.length - 1]}
        value={level}
        onChange={handleSliderChange}
      />
    </div>
  );
};

const Button = ({ title, onClick }: { title: string; onClick: () => void }) => (
  <button onClick={onClick}>{title}</button>
);

const Checkbox = ({
  label,
  onChange,
}: {
  label: string;
  onChange: (label: string, isChecked: boolean) => void;
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onChange(label, newCheckedState);
  };

  return (
    <label
      className={`FilterButton ${isChecked ? "selected" : ""}`}
      htmlFor={label}
    >
      {label}
      <input
        id={label}
        type="checkbox"
        checked={isChecked}
        onChange={toggleCheckbox}
        style={{ color: "green" }}
      />
    </label>
  );
};

export default FilteringBar;
