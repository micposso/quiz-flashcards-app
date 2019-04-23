import { getDecks, saveDeckTitle, saveCardToDeck, removeDeck  } from "../utils/api";
import { getAllDecks } from './getDecks'
import { addDeck } from './addDeck'
import { addCard } from './addCard'
import { resetDeck } from './resetDeck'

export function handleGetAllDecks() {
  return dispatch => {
    return getDecks().then(decks => {
      dispatch(getAllDecks(decks));
    });
  };
}

export function handleAddDecks(deckTitle) {
  return dispatch => {
    return saveDeckTitle(deckTitle).then(deck => {
      dispatch(addDeck(deck));
    });
  };
}

export function handleAddCardToDeck(deckId, card) {
  return dispatch => {
    return saveCardToDeck(deckId, card).then(() => {
      dispatch(addCard(deckId, card));
    });
  };
}

export function handleDeleteDeck(deckId) {
  return dispatch => {
    return removeDeck(deckId).then(() => {
      dispatch(resetDeck(deckId));
    });
  };
}
