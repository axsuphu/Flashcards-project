import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, deleteCard, deleteDeck } from "../utils/api";

function DeckScreen() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [cardsList, setCardsList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    async function fetchData() {
      try {
        const deckResponse = await readDeck(deckId, abortController.signal);
        setDeck(deckResponse);
        setCardsList(deckResponse.cards);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    fetchData();
    return () => abortController.abort();
  }, [deckId]);

  const deleteCardHandler = async (cardId) => {
    if (
      window.confirm(
        "Delete this card? \n\nYou will not be able to recover it."
      )
    ) {
      await deleteCard(cardId);
      history.go(0);
    } else {
      history.push(`/decks/${deckId}`);
    }
  };

  const deleteDeckHandler = async (deckId) => {
    if (
      window.confirm(
        "Delete this deck? \n\nYou will not be able to recover it."
      )
    ) {
      await deleteDeck(deckId);
      history.push(`/`);
    } else {
      history.push(`/decks/${deckId}`);
    }
  };

  const deckView = cardsList.map((card) => (
    <div className="row">
      <div className="column-front">
        <p className="card-text">{card.front}</p>
      </div>
      <div className="column-back">
        <p className="card-text">{card.back}</p>
        <Link
          to={`/decks/${deckId}/cards/${card.id}/edit`}
          type="button"
          className="btn btn-secondary"
          role="button"
        >
          Edit
        </Link>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => deleteCardHandler(card.id)}
        >
          Delete
        </button>
      </div>
    </div>
  ));

  return (
    <React.Fragment>
      <div className="content">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {`${deck.name}`}
            </li>
          </ol>
        </nav>
        <div>
          <h3>{deck.name}</h3>
          <p>{deck.description}</p>
          <Link
            to={`/decks/${deckId}/edit`}
            type="button"
            className="btn btn-secondary"
            role="button"
          >
            Edit
          </Link>
          <Link
            to={`/decks/${deckId}/study`}
            type="button"
            className="btn btn-primary"
            role="button"
          >
            Study
          </Link>
          <Link
            to={`/decks/${deckId}/cards/new`}
            type="button"
            className="btn btn-primary"
            role="button"
          >
            +Add Cards
          </Link>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => deleteDeckHandler(deckId)}
          >
            Delete
          </button>
        </div>

        <h1>Cards</h1>
        <div>{deckView}</div>
      </div>
    </React.Fragment>
  );
}

export default DeckScreen;
