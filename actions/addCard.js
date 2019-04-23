export const ADD_CARD = "ADD_CARD";

export function addCard(deck) {
  return {
    type: ADD_CARD,
    deck
  };
}
