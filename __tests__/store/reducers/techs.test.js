import reducer, { INITIAL_STATE } from '~/store/modules/techs/reducer';
import * as Techs from '~/store/modules/techs/actions';

describe('Techs reducer', () => {
  it('should enter inside the default case (DEFAULT)', () => {
    const state = reducer(undefined, []);
    expect(state).toStrictEqual(INITIAL_STATE);
  });

  // For each action that change the state of the reducer will be tested (all actions generate a test)
  it('should be able to add a new tech inside the state (ADD_TECH)', () => {
    const state = reducer(INITIAL_STATE, Techs.addTech('Node.js'));

    // Expect the state to be strictly equal as the passed array
    expect(state).toStrictEqual(['Node.js']);
  });
});
