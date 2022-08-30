import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api";

function DeckList() {
  const [decks, setDecks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDecks() {
      try {
        const response = await listDecks(abortController.signal);
        setDecks(response);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    loadDecks();
    return () => abortController.abort();
  }, []);

  const deleteDeckHandler = async (deckId) => {
    if (
      window.confirm(
        "Delete this deck? \n\nYou will not be able to recover it."
      )
    ) {
      await deleteDeck(deckId);
      history.go(0);
    } else {
      history.pushState("/");
    }
  };

  //have another const that is the card and how it looks like

  const deckInformation = decks.map((deck, index) => (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">{deck.name}</h3>
        <h6 className="card-subtitle mb-2 text-muted">
          {deck.cards.length} cards
        </h6>
        <p className="card-text">{deck.description}</p>
        <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
          View
        </Link>
        <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
          Study
        </Link>
        <button
          className="btn btn-danger"
          onClick={() => deleteDeckHandler(deck.id)}
        >
          Delete
        </button>
      </div>
    </div>
  ));
  //return that const in a div or react frag
  return <div>{deckInformation}</div>;
}

export default DeckList;
