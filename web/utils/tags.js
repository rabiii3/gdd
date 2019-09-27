export const TAGS = {
  skill: 'skill',
  status: 'status',
  author: 'author',
  role: 'role',
  country: 'country',
};

export const makeTaggedQuery = (tag, term) => `${tag}:"${term}"`;
