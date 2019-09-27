import configureStore from '../../store/configureStore.test';
import { COMMENT_ADDED, add, COMMENT_UPDATED, update, COMMENT_DELETED, del } from '../comments';
import { getComments } from '../../selectors/comments';

const initialState = {
  comments: { data: [{ _id: 2, content: 'a' }, { _id: 3, content: 'z' }] },
};
describe('web | actions', () => {
  describe('add comment', () => {
    it('should dispatch add comment', () => {
      const comment = {
        entityType: 'resume',
        entityId: 0,
        content: '1',
      };
      const hook = {
        [COMMENT_ADDED]: getState => {
          const state = getState();
          expect(getComments(state)[0]).toEqual(comment);
        },
      };
      const store = configureStore(initialState, hook);
      store.dispatch(add(comment));
    });
  });
  describe('edit comment', () => {
    it('should dispatch edit comment', () => {
      const comment = { _id: 2, content: 'c' };
      const hook = {
        [COMMENT_UPDATED]: getState => {
          const state = getState();
          expect(getComments(state)[0].content).toEqual(comment);
        },
      };
      const store = configureStore(initialState, hook);
      store.dispatch(update(comment));
    });
  });
  describe('delete comment', () => {
    it('should dispatch delete comment', () => {
      const comment = { _id: 2 };
      const hook = {
        [COMMENT_DELETED]: getState => {
          const state = getState();
          expect(getComments(state)).toHaveLength(1);
        },
      };
      const store = configureStore(initialState, hook);
      store.dispatch(del(comment));
    });
  });
});
