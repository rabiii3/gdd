const api = ({ jsonPost, secret, globalConfig }) => ({
  loadAll: ({ token, comments }) => jsonPost({ path: `/api/comments/loadAll`, body: { comments }, headers: { ...secret(token), 'x-tenant': globalConfig.tenant } }),
  add: ({ comment, token }) => jsonPost({ path: `/api/comments/add`, body: comment, headers: { ...secret(token), 'x-tenant': globalConfig.tenant } }),
  update: ({ updates, token }) => jsonPost({ path: `/api/comments/update`, body: updates, headers: { ...secret(token), 'x-tenant': globalConfig.tenant } }),
  del: ({ comment, token }) => jsonPost({ path: `/api/comments/del/${comment._id}`, headers: { ...secret(token), 'x-tenant': globalConfig.tenant } }),
});
export default api;
