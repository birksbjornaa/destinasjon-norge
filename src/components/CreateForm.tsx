import React, { useState, useEffect } from "react";
import {
  DestinationData,
  getAllDestinations,
  postNewDestination,
} from "../controllers/fierbaseController";
import "../css/CreateDestination.css";

interface FormProps {
  goToDestination: (destinationId: string) => void;
}

interface Tag {
  label: string;
  isChecked: boolean;
}

const Form: React.FC<FormProps> = ({ goToDestination }) => {
  const [errorMessage, setErrormessage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [yrid, setYrId] = useState<string>("");
  const [imageSrc, setImageSrc] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<Tag[]>([
    { label: "by", isChecked: false },
    { label: "natur", isChecked: false },
    { label: "historie", isChecked: false },
    { label: "kultur", isChecked: false },
    { label: "mat", isChecked: false },
    { label: "sport", isChecked: false },
    //Always keep letters in label lowercase
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
    fetchAndSetData();
  }, [tags, price]);

  const [destinations, setDestinations] = useState<DestinationData[]>([]);

  const fetchAndSetData = async () => {
    const destinations = await getAllDestinations();
    setDestinations(destinations);
  };

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

  const handleSubmit = async (newDestination: DestinationData) => {
    try {
      validateDestination(newDestination);
    } catch (e) {
      setErrormessage((e as Error).message); // Accessing the message property
      excecuteShake();
      return;
    }

    const newDestinationId = await postNewDestination(newDestination);
    if (newDestinationId) {
      goToDestination(newDestinationId);
    }
  };

  const [shake, setShake] = useState(false);

  const excecuteShake = () => {
    setShake(true);
    setTimeout(() => {
      setShake(false);
    }, 500); // (0.5s)
  };

  function validateDestination(newDestination: DestinationData) {
    if (newDestination.name.length < 2) {
      throw new Error("Navn er for kort, minimum 2 tegn");
    }

    if (newDestination.region.length < 2) {
      throw new Error("Region er for kort, minimum 2 tegn");
    }
    if (newDestination.price < 1 || newDestination.price > 10) {
      throw new Error("Prisnivå må settes");
    }
    if (!newDestination.yrid.includes("-")) {
      throw new Error("YrID har feil format (x-xxxxx)");
    }
    if (newDestination.imageSrc.length === 0) {
      throw new Error("Bilde url er tom");
    }
    if (newDestination.description.length < 10) {
      throw new Error("Beskrivelse er for kort, minimum 10 tegn");
    }

    destinations.map((destination) => {
      if (
        destination.name.toLowerCase() === newDestination.name.toLowerCase()
      ) {
        throw new Error("Navn er allerede i bruk");
      }
      if (
        destination.yrid.toLowerCase() === newDestination.yrid.toLowerCase()
      ) {
        throw new Error("YrID er allerede i bruk");
      }
    });
  }

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
      <div className="error-message">
        <p className={shake ? "shake-animation" : ""}>{errorMessage}</p>
      </div>
      <button
        className="FormButton"
        onClick={() => handleSubmit(getDestinationData())}
      >
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
