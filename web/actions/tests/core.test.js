import configureStore from '../../store/configureStore.test';
import { ackError, ACK_ERROR } from '../core';
import { getError } from '../../selectors/core';

const initialState = { core: { error: {} } };
describe('web | actions | core', () => {
  describe('ackError', () => {
    it('should dispatch ackError', done => {
      const hook = {
        [ACK_ERROR]: getState => {
          const state = getState();
          expect(getError(state)).toBeFalsy();
          done();
        },
      };
      const store = configureStore(initialState, hook);
      store.dispatch(ackError());
    });
  });
});
