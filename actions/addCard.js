export const ADD_CARD = "ADD_CARD";

export function addCard(deckId, card) {
  return {
    type: ADD_CARD,
    deckId,
    card
  };
}
