import Types from './types';
import { iState } from './state';

/**
 * Main Context Reducer
 * @param state current state of the app
 * @param action action to perform
 * @param action.type type of action to perform
 * @param action.payload new data to store
 */
const reducer = (state: iState, action: iAction) => {
  const { type, payload } = action;

  switch (type) {
    case Types.SET_CREDENTIALS:
      state.isAuthenticated = true;
      state.user = payload;
      return state;
    case Types.REMOVE_CREDENTIALS:
      state.isAuthenticated = false;
      state.user = {};
      return state;
    default:
      return state;
  }
};

/**
 * Matches action type with some specific interface for the payload
 */
type ActionMap<T extends { [index: string]: any }> = {
  [Key in keyof T]: T[Key] extends undefined
    ? { type: Key }
    : { type: Key; payload: T[Key] };
};

interface iPayload {
  [Types.SET_CREDENTIALS]: {
    email: string;
    _id: string;
    name: string;
    username: string;
    followers: string[];
    following: string[];
  };
  [Types.REMOVE_CREDENTIALS]: {};
}

export default reducer;
export type iAction = ActionMap<iPayload>[keyof ActionMap<iPayload>];