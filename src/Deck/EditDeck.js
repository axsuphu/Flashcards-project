import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import DeckContentForm from "./DeckContentForm";

function EditDeck() {
  const [deckInfo, setDeckInfo] = useState([]);
  const params = useParams();
  const deckId = params.deckId;
  const history = useHistory();
  const [editDeckFormData, setEditDeckFormData] = useState({
    name: "",
    description: "",
  });

  const handleFormChange = ({ target }) => {
    setEditDeckFormData({ ...editDeckFormData, [target.name]: target.value });
  };
  useEffect(() => {
    async function loadDeckInfo() {
      const response = await readDeck(deckId);
      setDeckInfo(response);

      setEditDeckFormData({
        name: response.name,
        description: response.description,
        id: response.id,
      });
    }
    loadDeckInfo();
  }, [deckId]);
  console.log("deckinfo", deckInfo);
  const submitHandler = async (event) => {
    event.preventDefault();
    const deckWithUpdate = await updateDeck({ ...editDeckFormData });
    console.log(deckWithUpdate);
    history.go(0);
  };
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {editDeckFormData.name}
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <DeckContentForm
        title="Edit Deck"
        cancelLink={`/decks/${deckId}`}
        handleFormChange={handleFormChange}
        nameValue={editDeckFormData.name}
        descriptionValue={editDeckFormData.description}
        submitHandler={submitHandler}
      />
    </div>
  );
}

export default EditDeck;
