import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import "./style.css";

function DeckScreen() {
  //take the parameters out of the URL that we are on
  const { deckId } = useParams();
  //declare deck outside useEffect
  const [deck, setDeck] = useState({});
  //cardsList willhold JUST the card information after async call
  const [cardsList, setCardsList] = useState([]);
  //cardId is used to match with card.id to render only 1 card at a time
  // const [cardIndex, setCardIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const abortController = new AbortController();
        const deckResponse = await readDeck(deckId, abortController.signal);
        console.log("deckResponse from DeckScreen", deckResponse);
        setDeck(deckResponse);
        setCardsList(deckResponse.cards);
      } catch (error) {
        console.error("Unable to retrieve deck " + deckId, error);
      }
    }
    fetchData();
  }, [deckId]);
  console.log("cardsList from Deck Screen", cardsList);

  //map through cardslist
  //for each card, return a card with front on left andback on right with 2 buttons
  //return this with template literals
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
        <button type="button" className="btn btn-danger">
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
              React Router
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
          <Link to="" type="button" className="btn btn-danger" role="button">
            Delete
          </Link>
        </div>

        <h1>Cards</h1>
        <div>{deckView}</div>
      </div>
    </React.Fragment>
  );
}

export default DeckScreen;
