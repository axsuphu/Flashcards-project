import React, { useEffect, useState } from "react";

// import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api";

function EditCard() {
  const params = useParams();
  const cardId = params.cardId;
  const deckId = params.deckId;
  const [deckInfo, setDeckInfo] = useState({});
  const [cardInfo, setCardInfo] = useState({});
  const [editCardFormData, setEditCardFormData] = useState({});
  const history = useHistory();

  useEffect(() => {
    async function loadDeckInfo() {
      const response = await readDeck(deckId);
      setDeckInfo(response);
    }
    loadDeckInfo();
  }, [deckId]);

  useEffect(() => {
    async function loadCardInfo() {
      const response = await readCard(cardId);
      setCardInfo(response);
      setEditCardFormData({
        front: response.front,
        back: response.back,
        deckId: response.deckId,
        id: response.id,
      });
    }
    loadCardInfo();
  }, [cardId]);

  const handleFormChange = ({ target }) => {
    setEditCardFormData({
      ...editCardFormData,
      [target.name]: target.value,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    await updateCard(editCardFormData);
    history.push(`/decks/${deckId}`);
  };

  return (
    <React.Fragment>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">{deckInfo.name}</li>
          <li className="breadcrumb-item active" aria-current="page">
            {`Edit Card ${cardId}`}
          </li>
        </ol>
      </nav>
      <form onSubmit={submitHandler}>
        <h1>Edit Card</h1>
        <div className="mb-3">
          <label htmlFor="frontSideOfCard" className="form-label">
            Front
          </label>
          <textarea
            type="text"
            className="form-control"
            id="editCard"
            name="front"
            placeholder={cardInfo.front}
            onChange={handleFormChange}
            value={cardInfo.front}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="backSideOfCard" className="form-label">
            Back
          </label>
          <textarea
            type="text"
            className="form-control"
            id="editCard"
            name="back"
            placeholder={cardInfo.back}
            onChange={handleFormChange}
            value={cardInfo.back}
          />
        </div>
        <Link to={`/decks/${deckId}`} className="btn btn-secondary">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </React.Fragment>
  );
}

export default EditCard;
