const api = ({ jsonPost, secret, globalConfig }) => ({
  loadAll: ({ token }) => jsonPost({ path: `/api/people/loadAll`, headers: { ...secret(token), 'x-tenant': globalConfig.tenant } }),
  add: ({ person, token }) => jsonPost({ path: `/api/people/add`, body: person, headers: { ...secret(token), 'x-tenant': globalConfig.tenant } }),
  update: ({ updates, token }) => jsonPost({ path: `/api/people/update`, body: updates, headers: { ...secret(token), 'x-tenant': globalConfig.tenant } }),
  del: ({ person, token }) => jsonPost({ path: `/api/people/del/${person._id}`, headers: { ...secret(token), 'x-tenant': globalConfig.tenant } }),
});

export default api;
