import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import CardContentForm from "./CardContentForm";

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

  const handleFormChange = ({ target }) => {
    setNewCardFormData({ ...newCardFormData, [target.name]: target.value });
  };

  useEffect(() => {
    async function loadDeckInfo() {
      const response = await readDeck(deckId);
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
      <CardContentForm
        title={`${deckName}: Add Card`}
        frontSidePlaceholder="Front Side of card"
        backSidePlaceholder="Back Side of card"
        handleFormChange={handleFormChange}
        frontValue={newCardFormData.front}
        backValue={newCardFormData.back}
        submitHandler={submitHandler}
        doneButtonHandler={doneButtonHandler}
        secondary="Done"
        primary="Save"
      />
    </React.Fragment>
  );
}

export default CreateCard;
