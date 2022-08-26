import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function DeckList() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDecks() {
      try {
        const response = await fetch(
          "http://localhost:8080/decks?_embed=cards",
          { signal: abortController.signal }
        );
        const decksFromAPI = await response.json();
        setDecks(decksFromAPI);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    loadDecks();
  }, []);

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
        <Link to="#" className="btn btn-danger">
          Delete
        </Link>
      </div>
    </div>
  ));
  //return that const in a div or react frag
  return <div>{deckInformation}</div>;
}

export default DeckList;
