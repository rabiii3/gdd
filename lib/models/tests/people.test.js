import { isAdmin, ROLE, STATUS, isPending } from '../people';

describe('lib | models | people', () => {
  it('should be an admin', () => {
    const person = {
      roles: [ROLE.admin, ROLE.headHunter],
    };
    expect(isAdmin(person)).toBeTruthy();
  });

  it('should  not be an admin', () => {
    const person = {
      roles: [ROLE.headHunter],
    };
    expect(isAdmin(person)).toBeFalsy();
  });

  it('should  not be an admin again', () => {
    const person = {};
    expect(isAdmin(person)).toBeFalsy();
  });

  it('should be pending', () => {
    const person = { status: STATUS.pending };
    expect(isPending(person)).toBeTruthy();
  });
});
