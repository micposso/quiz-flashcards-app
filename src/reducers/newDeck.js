import { ADD_DECK } from "../actions/addDeck";
import { RESET_DECK } from "../actions/resetDeck";

export default function newDeckId(state = {}, action) {
  switch (action.type) {
    case ADD_DECK:
      const { deck } = action;
      return {
        ...state,
        newDeckId: deck.id
      };
    case RESET_DECK:
      return {
        ...state,
        newDeckId: null
      };
    default:
      return state;
  }
}
