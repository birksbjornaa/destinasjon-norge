import React, { useState, useEffect } from 'react';

interface FormProps {

}

interface Tag {
    label: string;
    isChecked: boolean;
}

const Form: React.FC<FormProps> = () => {
    const [name, setName] = useState<string>('');
    const [region, setRegion] = useState<string>('');
    const [price, setPrice] = useState<number | ''>('');
    const [yrId, setYrId] = useState<string>('');
    const [pictureUrl, setPictureUrl] = useState<string>('');
    const [formInfo, setFormInfo] = useState<string>('');
    const [tags, setTags] = useState<Tag[]>([
        { label: 'By', isChecked: false },
        { label: 'Natur', isChecked: false },
        { label: 'Historie', isChecked: false },
        { label: 'Kultur', isChecked: false },
        { label: 'Mat', isChecked: false },
        { label: 'Sport', isChecked: false }
    ]);

    useEffect(() => {
        console.log(tags);
        console.log(price);
    }, [tags, price]);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleRegionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRegion(event.target.value);
    };

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = Number(event.target.value);
        if (!isNaN(inputValue) && inputValue >= 1 && inputValue <= 10) {
            setPrice(inputValue);
        }
    };

    const handleYrIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setYrId(event.target.value);
    };

    const handlePictureUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPictureUrl(event.target.value);
    };

    const handleFormInfoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormInfo(event.target.value);
    };

    const handleTagChange = (label: string, isChecked: boolean) => {
        setTags(prevTags =>
            prevTags.map(tag =>
                tag.label === label ? { ...tag, isChecked } : tag
            )
        );
    };

    const handleSubmit = () => {
        // Handle form submission here
    };

    return (
        <div className="FormBody">
            <div className="FormName">
                <h3>Navn på venstre side: </h3>
                <input
                    type="text"
                    minLength={2}
                    maxLength={29}
                    required
                    value={name}
                    onChange={handleNameChange}
                />
            </div>
            <div className="FormRegion">
                <h3>Region: </h3>
                <input
                    type="text"
                    minLength={2}
                    maxLength={29}
                    required
                    value={region}
                    onChange={handleRegionChange}
                />
            </div>
            <div className="FormPrice">
                <h3>Prisnivå: </h3>
                <input
                    type='number'
                    min={1}
                    max={10}
                    required
                    value={price}
                    onChange={handlePriceChange}
                />
            </div>
            <div className="FormYrID">
                <h3>YrID: </h3>
                <input
                    type="text"
                    value={yrId}
                    onChange={handleYrIdChange}
                />
            </div>
            <div className="FormPicture">
                <h3>Picture URL: </h3>
                <input
                    type="url"
                    value={pictureUrl}
                    onChange={handlePictureUrlChange}
                />
            </div>
            <div className="FormInfo">
                <h3>Form Info: </h3>
                <textarea
                    minLength={20}
                    maxLength={300}
                    required
                    value={formInfo}
                    onChange={handleFormInfoChange}
                />
            </div>
            <div className="FormTags">
                {tags.map(tag => (
                    <Checkbox
                        key={tag.label}
                        label={tag.label}
                        isChecked={tag.isChecked}
                        onChange={handleTagChange}
                    />
                ))}
            </div>
            <button onClick={handleSubmit}>Bekreft endringer</button>
        </div>
    );
}

interface CheckboxProps {
    label: string;
    isChecked: boolean;
    onChange: (label: string, isChecked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, isChecked, onChange }) => {
    const toggleCheckbox = () => {
        onChange(label, !isChecked);
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

export default Form;
