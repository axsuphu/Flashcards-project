import React from "react";
import { Link } from "react-router-dom";

function CreateDeckButton() {
  return (
    <div>
      <Link to="/decks/new">
        <button type="button" className="btn btn-secondary">
          + Create Deck
        </button>
      </Link>
    </div>
  );
}

export default CreateDeckButton;
