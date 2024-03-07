import React, { useState, useEffect } from "react";
import {
  DestinationData,
  updateExsistingDestination,
  getDestination,
  createMissingData

} from "../controllers/fierbaseController";
import "../css/CreateDestination.css";
import { useParams } from "react-router-dom";
import Destination from "./GalleryDestination";

interface FormProps {
  goToDestination: (destinationId: string) => void;
}
const [destination, setDestination] = useState(createMissingData());
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    fetchAndSetData();
  }, []);

  const { id } = useParams<{ id: string }>();
  let currentDestinationId: string = id as string;

  const fetchAndSetData = async () => {
    const fetchedDestination = await getDestination(currentDestinationId);
    console.log(destination.name);
    setDestination(fetchedDestination);
  };

interface Tag {
  label: string;
  isChecked: boolean;
}

const Form: React.FC<FormProps> = ({ goToDestination }) => {
  const [name, setName] = useState<string>(destination.name);
  const [region, setRegion] = useState<string>(destination.region);
  const [price, setPrice] = useState<number>(destination.price);
  const [yrid, setYrId] = useState<string>(destination.yrid);
  const [imageSrc, setImageSrc] = useState<string>(destination.imageSrc);
  const [description, setDescription] = useState<string>(destination.description);
  const [tags, setTags] = useState<Tag[]>([
    { label: "By", isChecked: false },
    { label: "Natur", isChecked: false },
    { label: "Historie", isChecked: false },
    { label: "Kultur", isChecked: false },
    { label: "Mat", isChecked: false },
    { label: "Sport", isChecked: false },
  ]);

  // Create a function that create a DestinationData of the current state
  function getDestinationData(): DestinationData {
    return {
      id: "",
      name: name,
      imageSrc: imageSrc,
      region: region,
      description: description,
      price: price,
      tags: tags.filter((tag) => tag.isChecked).map((tag) => tag.label),
      yrid: yrid,
    };
  }

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

  const handlePictureUrlChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setImageSrc(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleTagChange = (label: string, isChecked: boolean) => {
    setTags((prevTags) =>
      prevTags.map((tag) => (tag.label === label ? { ...tag, isChecked } : tag))
    );
  };

  const handleSubmit = async (updatedDestination: DestinationData) => {
    await updateExsistingDestination(updatedDestination);
    if (currentDestinationId) {
      goToDestination(currentDestinationId);
    }
  };

  return (
    <div className="FormBody">
      <div className="FormName">
        <h3>Destinasjons Navn: </h3>
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
          type="number"
          min={1}
          max={10}
          required
          value={price}
          onChange={handlePriceChange}
        />
      </div>
      <div className="FormYrID">
        <h3>YrID: </h3>
        <input type="text" value={yrid} onChange={handleYrIdChange} />
      </div>
      <div className="FormPicture">
        <h3>BILDE URL: </h3>
        <input type="url" value={imageSrc} onChange={handlePictureUrlChange} />
      </div>
      <div className="FormInfo">
        <h3>Destinasjons Informasjon: </h3>
        <textarea
          minLength={20}
          maxLength={300}
          required
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div className="FormTags">
        {tags.map((tag) => (
          <Checkbox
            key={tag.label}
            label={tag.label}
            isChecked={tag.isChecked}
            onChange={handleTagChange}
          />
        ))}
      </div>
      <button className="FormButton" onClick={() => handleSubmit(getDestinationData())}>
        Legg til Destinasjon
      </button>
    </div>
  );
};

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
