const api = ({ jsonPost, secret, globalConfig }) => ({
  loadAll: ({ token }) => jsonPost({ path: `/api/skills/loadAll`, headers: { ...secret(token), 'x-tenant': globalConfig.tenant } }),
  add: ({ skill, token }) => jsonPost({ path: `/api/skills/add`, body: skill, headers: { ...secret(token), 'x-tenant': globalConfig.tenant } }),
  update: ({ skill, token }) => jsonPost({ path: `/api/skills/update`, body: skill, headers: { ...secret(token), 'x-tenant': globalConfig.tenant } }),
  del: ({ skill, token }) => jsonPost({ path: `/api/skills/del/${skill._id}`, headers: { ...secret(token), 'x-tenant': globalConfig.tenant } }),
});
export default api;
