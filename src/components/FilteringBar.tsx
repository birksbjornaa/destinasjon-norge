import {useState} from 'react';

export function FilteringBar() {
    return (
      <div className="FilterCheckboxes">
            <Checkbox label="By" />
            <Checkbox label="Natur" />
            <Checkbox label="Historie" />
            <Checkbox label="kultur" />
            <Checkbox label="Mat" />
            <Checkbox label="sport" />
            <Button title="Søk etter reise" onClick={() => console.log('Button clicked!')} />
            <Slider />
        </div>
    );
  }

const Slider = () => {
    const levels: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const [level, setLevel] = useState<number>(levels[4]);

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLevel(parseInt(event.target.value, 10));
      };

      return (
          <div>
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
}

const Button = ({ title, onClick }: { title: string; onClick: () => void }) => (
    <button onClick={onClick}>{title}</button>
  );



const Checkbox = ({ label }: {
    label: String}) => {

  const [isChecked, setIsChecked] = useState(false);
  const toggleCheckbox = () => setIsChecked(!isChecked);

  return (
    <label>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={toggleCheckbox}
      />
      {label}
    </label>
  );
};



export default FilteringBar;