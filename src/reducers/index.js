import { combineReducers } from 'redux';
import decks from './decks';
import newDeckId from './newDeck';

export default combineReducers({
    decks,
    newDeckId
});
