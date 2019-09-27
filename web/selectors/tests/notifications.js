import { getNotifications, root } from '../notifications';

describe('web | selectors | notifications', () => {
  describe('root', () => {
    it("should select the comment ' object value", () => {
      const state = { notifications: { data: [{ _id: 1 }] } };
      expect(root(state)).toEqual({ data: [{ _id: 1 }] });
    });
  });
  describe('getNotifications', () => {
    it('should select notifications', () => {
      const state = { notifications: { data: [{ _id: 1 }] } };
      expect(getNotifications(state)[0]._id).toEqual(1);
    });
  });
});
