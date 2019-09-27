const api = ({ jsonPost, secret, globalConfig }) => ({
  loadAll: ({ token }) => jsonPost({ path: `/api/jobs/loadAll`, headers: { ...secret(token), 'x-tenant': globalConfig.tenant } }),
  add: ({ job, token }) => jsonPost({ path: `/api/jobs/add`, body: job, headers: { ...secret(token), 'x-tenant': globalConfig.tenant } }),
  update: ({ updates, token }) => jsonPost({ path: `/api/jobs/update`, body: updates, headers: { ...secret(token), 'x-tenant': globalConfig.tenant } }),
  del: ({ job, token }) => jsonPost({ path: `/api/jobs/del/${job._id}`, headers: { ...secret(token), 'x-tenant': globalConfig.tenant } }),
});
export default api;
