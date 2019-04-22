import { GET_DECKS } from "../actions/getDecks";
import { ADD_DECK } from "../actions/addDeck";
import { ADD_CARD } from "../actions/addCard";
import { REMOVE_DECK } from "../actions/resetDeck";

export default function decks(state = {}, action) {
  switch (action.type) {
    case GET_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case ADD_DECK:
      const { deck } = action;
      return {
        ...state,
        [deck.id]: deck
      };
    case ADD_CARD:
      const { deckId, card } = action;
      return {
        ...state,
        [deckId]: {
          ...state[deckId],
          questions: state[deckId].questions.concat([card])
        }
      };
    case REMOVE_DECK:
      delete state[action.deckId];
      return {
        ...state
      };
    default:
      return state;
  }
}
