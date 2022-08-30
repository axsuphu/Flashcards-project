import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";

function CreateCard() {
  const history = useHistory();
  const [deckName, setDeckName] = useState("");
  const params = useParams();
  const deckId = params.deckId;
  const initialFormState = {
    front: "",
    back: "",
  };
  const [newCardFormData, setNewCardFormData] = useState({
    ...initialFormState,
  });
  console.log(newCardFormData);

  const handleFormChange = ({ target }) => {
    setNewCardFormData({ ...newCardFormData, [target.name]: target.value });
  };

  useEffect(() => {
    async function loadDeckInfo() {
      const response = await readDeck(deckId);
      console.log(response);
      setDeckName(response.name);
    }
    loadDeckInfo();
  }, [deckId]);

  const submitHandler = async (event) => {
    event.preventDefault();
    const newCard = await createCard(deckId, { ...newCardFormData });
    console.log(newCard);
    setNewCardFormData({ ...initialFormState });
  };

  const doneButtonHandler = () => {
    history.push(`/decks/${deckId}`);
  };

  return (
    <React.Fragment>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">{deckName}</li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <form onSubmit={submitHandler}>
        <h4>{`${deckName}: Add Card`}</h4>
        <div className="mb-3">
          <label htmlFor="frontSideOfCard" className="form-label">
            Front
          </label>
          <textarea
            type="text"
            className="form-control"
            id="deckDescription"
            name="front"
            placeholder="Front Side of card"
            onChange={handleFormChange}
            value={newCardFormData.front}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="deckDescription" className="form-label">
            Back
          </label>
          <textarea
            type="text"
            className="form-control"
            id="deckDescription"
            name="back"
            placeholder="Back Side of card"
            onChange={handleFormChange}
            value={newCardFormData.back}
          ></textarea>
        </div>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={doneButtonHandler}
        >
          Done
        </button>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </React.Fragment>
  );
}

export default CreateCard;
