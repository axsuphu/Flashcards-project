import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";
// The Study screen has the following features:

// The path to this screen should include the deckId (i.e., /decks/:deckId/study).
// You must use the readDeck() function from src/utils/api/index.js to load the deck that is being studied.
function StudyScreen() {
  //take the parameters out of the URL that we are on
  const { deckId } = useParams();
  //declare deck outside useEffect
  const [deck, setDeck] = useState({});
  //cardsList willhold JUST the card information after async call
  const [cardsList, setCardsList] = useState([]);
  const [deckName, setDeckName] = useState("");
  //cardId is used to match with card.id to render only 1 card at a time
  const [cardIndex, setCardIndex] = useState(0);
  //frontSide is initialized to true; this is used when we want to show either the front or back of card
  const [frontSide, setFrontSide] = useState(true);

  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      try {
        const abortController = new AbortController();
        const deckResponse = await readDeck(deckId, abortController.signal);
        setDeck(deckResponse);
        setCardsList(deckResponse.cards);
        setDeckName(deckResponse.name);
      } catch (error) {
        console.error("Unable to retrieve deck " + deckId, error);
      }
    }
    fetchData();
  }, [deckId]);
  const notEnoughCardsMessage = (
    <div>
      <h2>{deckName}: Study</h2>
      <h2>Not enough cards.</h2>
      <p>
        You need at least 3 cards to study. There are {cardsList.length} cards
        in this deck.
      </p>
      <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
        + Add Cards
      </Link>
    </div>
  );
  const handleFlipButtonClick = () => {
    setFrontSide(!frontSide);
  };

  function messageHandler() {
    if (
      window.confirm(
        "Do you really want to restart? \n\nClick Cancel to return to the Home Page"
      )
    ) {
      history.go(0);
    } else {
      history.push(`/`);
    }
  }

  const handleNextButtonClick = () => {
    if (cardIndex + 1 < cardsList.length) {
      setCardIndex(cardIndex + 1);
      setFrontSide(true);
    } else {
      messageHandler();
    }
  };

  const oneCardView = (
    <React.Fragment>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h1>Study: {deck.name}</h1>
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">
            {cardIndex + 1} of {cardsList.length}
          </h3>
          <p className="card-text"></p>
          <div>
            {cardsList
              .filter((card, index) => index === cardIndex)
              .map((card) =>
                frontSide === true ? (
                  <div>{card.front}</div>
                ) : (
                  <div>{card.back}</div>
                )
              )}
          </div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => handleFlipButtonClick()}
          >
            Flip
          </button>
          {frontSide === false ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleNextButtonClick()}
            >
              Next
            </button>
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );

  return (
    <div>{cardsList.length > 2 ? oneCardView : notEnoughCardsMessage}</div>
  );
}

// There is a breadcrumb navigation bar with links to home /, followed by the name of the deck being studied, and finally the text Study (e.g., Home/Rendering In React/Study).
// The deck title (i.e., "Study: Rendering in React" ) is shown on the screen.
// Cards are shown one at a time, front-side first.
// A button at the bottom of each card "flips" it to the other side.
// After flipping the card, the screen shows a Next button (see the Next button section below) to continue to the next card.
// After the final card in the deck has been shown, a message (see the Restart prompt section below) is shown offering the user the opportunity to restart the deck.
// If the user does not restart the deck, they should return to the home screen.
// Studying a deck with two or fewer cards should display a "Not enough cards" message (see the "Not enough cards" section below) and a button to add cards to the deck

export default StudyScreen;
