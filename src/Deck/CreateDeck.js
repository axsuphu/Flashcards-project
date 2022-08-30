import React, { useState } from "react";
import DeckContentForm from "./DeckContentForm";
import { useHistory, Link } from "react-router-dom";
import { createDeck } from "../utils/api";

function CreateDeck() {
  const history = useHistory();

  const initialFormState = {
    name: "",
    description: "",
  };

  const [newDeckFormData, setNewDeckFormData] = useState({
    ...initialFormState,
  });

  const handleFormChange = ({ target }) => {
    setNewDeckFormData({ ...newDeckFormData, [target.name]: target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const newDeck = await createDeck({ ...newDeckFormData });
    const newDeckId = newDeck.id;
    history.push(`/decks/${newDeckId}`);
  };

  return (
    <React.Fragment>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <DeckContentForm
        title="Create Deck"
        deckName="Deck Name"
        deckDescription="Brief description of the deck"
        handleFormChange={handleFormChange}
        nameValue={newDeckFormData.name}
        descriptionValue={newDeckFormData.description}
        submitHandler={submitHandler}
        cancelLink={"/"}
      />
    </React.Fragment>
  );
}

export default CreateDeck;
