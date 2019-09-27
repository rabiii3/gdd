import { getComments, getCommentsByResumeId, root, getLastTodo, getFutureTodo } from '../comments';

describe('web | selectors | comments', () => {
  describe('root', () => {
    it("should select the comment ' object value", () => {
      const state = { comments: { data: [{ _id: 1 }] } };
      expect(root(state)).toEqual({ data: [{ _id: 1 }] });
    });
  });
  describe('getComments', () => {
    it('should select comments', () => {
      const state = { comments: { data: [{ _id: 1 }] } };
      expect(getComments(state)[0]._id).toEqual(1);
    });
  });
  describe('getCommentsByResume', () => {
    it('should select comments', () => {
      const state = {
        comments: { data: [{ entityId: 1 }, { entityId: 2 }] },
      };
      expect(getCommentsByResumeId(2)(state)[0].entityId).toEqual(2);
      expect(getCommentsByResumeId(2)(state)).toHaveLength(1);
    });
  });

  describe('getLastTodoInResume', () => {
    it('should select last todo', () => {
      const state = {
        comments: {
          data: [
            { entityId: 1, what: "forward", when: "2020-02-16T11:51:00.000Z", who: [] },
            { entityId: 1, what: "call", when: "2018-01-16T11:51:00.000Z", who: [] },
            { entityId: 1, what: "meet", when: "2017-01-16T11:51:00.000Z", who: [] },
            { entityId: 1, what: "forward", when: "2016-01-16T11:51:00.000Z", who: [] },
          ]
        },
      };
      expect(getLastTodo(1)(state)).toEqual(state.comments.data[0]);
    });
  });


  describe('getFutureTodo', () => {
    it('should select all future todo', () => {
      const state = {
        comments: {
          data: [
            { entityId: 1, what: "forward", when: "2029-02-16T11:51:00.000Z", who: [] },
            { entityId: 2, what: "call", when: "2020-01-16T11:51:00.000Z", who: [] },
            { entityId: 3, what: "meet", when: "2017-01-16T11:51:00.000Z", who: [] },
            { entityId: 1, what: "forward", when: "2016-01-16T11:51:00.000Z", who: [] },
          ]
        },
      };
      expect(getFutureTodo(state)).toHaveLength(2);
    });
  });

});
