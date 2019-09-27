import api from '..';

jest.mock('axios', () => ({
  post: (url, body, options) => Promise.resolve({ data: { url, body, options } }),
}));

const token = 'TOKEN';
const person = 'PERSON';
const endpoint = 'ENDPOINT';

describe('lib | api', () => {
  it('should call with api', async () => {
    const res = await api.people.add({ token, person });
    expect(res.url).toEqual('/api/people/add');
    expect(res.options.headers).toEqual({ 'x-secret': 'TOKEN' });
    expect(res.body).toEqual(person);
  });

  it('should call with string', async () => {
    const res = await api({ method: 'people:add', token, person });
    expect(res.url).toEqual('/api/people/add');
    expect(res.options.headers).toEqual({ 'x-secret': 'TOKEN' });
    expect(res.body).toEqual(person);
  });

  it('should setup path', async () => {
    api.config({ endpoint });
    const res = await api({ method: 'people:add', token, person });
    expect(res.url).toEqual(`${endpoint}/api/people/add`);
  });
});
