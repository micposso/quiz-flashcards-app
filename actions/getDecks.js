export const GET_DECKS = "GET_DECKS";

export function getAllDecks(decks) {
  return {
    type: GET_DECKS,
    decks
  };
}
