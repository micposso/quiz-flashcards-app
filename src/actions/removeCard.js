export const REMOVE_DECK = "REMOVE_DECK";

export function removeDeck(deckId) {
  return {
    type: REMOVE_DECK,
    deckId
  };
}
