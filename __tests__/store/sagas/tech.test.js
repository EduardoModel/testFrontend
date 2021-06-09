import { runSaga } from 'redux-saga';
import MockAdapter from 'axios-mock-adapter';
import api from '~/services/api';

import {
  getTechsFaliure,
  getTechsSuccess,
} from '~/store/modules/techs/actions';

import { getTechs } from '~/store/modules/techs/sagas';

const apiMock = new MockAdapter(api);

describe('Techs saga', () => {
  it('should be able to fetch the techs from the api', async () => {
    const dispatch = jest.fn();

    // Intercept all get requests that could be made
    apiMock.onGet('techs').reply(200, ['Node.js']);

    // Overwrite the dispatch function with the mocked one
    await runSaga({ dispatch }, getTechs).toPromise();

    expect(dispatch).toHaveBeenLastCalledWith(getTechsSuccess(['Node.js']));
  });

  it('should return faliure on the api call', async () => {
    const dispatch = jest.fn();

    // Intercept all get requests that could be made
    apiMock.onGet('techs').reply(500);

    // Overwrite the dispatch function with the mocked one
    await runSaga({ dispatch }, getTechs).toPromise();

    // Expect the request to fail
    expect(dispatch).toHaveBeenLastCalledWith(getTechsFaliure());
  });
});

/*
  OBS.: All external communication of the tests should be mocked,
  because our tests should not be influential from external factors, like
  an API isn't working or the latency of the request is too;
  There is a loot of libraries that have already a mock defined for it!
*/
