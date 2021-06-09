import produce from 'immer';

// Its needed for the tests
export const INITIAL_STATE = [];

// The name of the reducer follow the name of the module
export default function techs(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case 'ADD_TECH':
        draft.push(action.payload.tech);
        break;
      default:
    }
  });
}
