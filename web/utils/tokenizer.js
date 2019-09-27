import { compose, trim, prop, replace } from 'ramda';

const phraseOrTerm = search => {
  const { term } = search;
  if (/^".+"$/.test(term) || /^'.+'$/.test(term)) {
    const result = {
      phrase: true,
      term: replace(/'|"/g, '', term),
    };
    return { ...search, result };
  }
  return { ...search, result: { term } };
};

const negate = search => {
  const { negate, result } = search;
  if (negate) return { ...search, result: { ...result, exclude: true } };
  return search;
};

const tag = search => {
  const { tag, result } = search;
  if (tag) return { ...search, result: { ...result, tag: tag.slice(0, -1) } };
  return search;
};

const pattern = /(-)?(\w+:)?("[^"]*"|'[^']*'|[^\s]+)/g;

const makeTerm = compose(
  prop('result'),
  negate,
  tag,
  phraseOrTerm,
);

const extractTerms = input => {
  const terms = [];
  let matched;

  while ((matched = pattern.exec(input))) // eslint-disable-line
    terms.push(makeTerm({ negate: matched[1], tag: matched[2], term: matched[3] }));
  return terms;
};

export const tokenize = compose(
  extractTerms,
  trim,
  x => x || ''
);
