import { useState } from 'react';
import "../css/DestinationChooser.css";
import { getRemoteConfig } from 'firebase/remote-config';

export function FilteringBar() {
    return (
        <div className="FilterCheckboxes">
            <div className="CheckboxGroup">
                <Checkbox label="By" />
                <Checkbox label="Natur" />
            </div>
            <div className="CheckboxGroup">
                <Checkbox label="Historie" />
                <Checkbox label="Kultur" />
            </div>
            <div className="CheckboxGroup">
                <Checkbox label="Mat" />
                <Checkbox label="Sport" />
            </div>
            <div className='="SliderContainer'>
            <Slider />
            </div>
            <div className="ButtonContainer">

                <Button title="Søk etter reise" onClick={() => console.log('Button clicked!')} />
            </div>

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
}

const Button = ({ title, onClick }: { title: string; onClick: () => void }) => (
    <button onClick={onClick}>{title}</button>
);

const Checkbox = ({ label }: { label: string }) => {
    const [isChecked, setIsChecked] = useState(false);

    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
    };

    return (
        <label className={`FilterButton ${isChecked ? 'selected' : ''}`} htmlFor={label}>
            {label}
            <input
                id={label}
                type="checkbox"
                checked={isChecked}
                onChange={toggleCheckbox}
                style={{ color: 'green' }}
            />
        </label>
    );
};

export default FilteringBar;
