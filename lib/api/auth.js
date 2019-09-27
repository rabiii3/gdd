const api = ({ jsonPost, secret, globalConfig }) => ({
  register: ({ user }) => jsonPost({ path: '/api/auth/register/', body: user, headers: { 'x-tenant': globalConfig.tenant } }),
  registerIn: ({ user, token }) => jsonPost({ path: '/api/auth/registerIn/', body: { token, user }, headers: { 'x-tenant': globalConfig.tenant } }),
  registerInWith: ({ service, token, googleToken }) => jsonPost({ path: '/api/auth/registerInWith/', body: { token, service, googleToken }, headers: { 'x-tenant': globalConfig.tenant } }),
  signIn: ({ email, password }) => jsonPost({ path: '/api/auth/login/', body: { email, password }, headers: { 'x-tenant': globalConfig.tenant } }),
  signOut: ({ token }) => jsonPost({ path: '/api/auth/logout/', body: { token }, headers: { 'x-tenant': globalConfig.tenant } }),
  signInWith: ({ token, service }) => jsonPost({ path: '/api/auth/loginWith/', body: { token, service }, headers: { 'x-tenant': globalConfig.tenant } }),
  checkEmailUniqueness: ({ email, token }) => jsonPost({ path: `/api/auth/checkEmailUniqueness`, body: { email }, headers: { ...secret(token), 'x-tenant': globalConfig.tenant } }),
  loadFromToken: ({ token }) => jsonPost({ path: `/api/auth/getUser`, headers: { ...secret(token), 'x-tenant': globalConfig.tenant } }),
  checkToken: ({ token }) => jsonPost({ path: `/api/auth/getUser`, headers: { ...secret(token), 'x-tenant': globalConfig.tenant } }),
  updatePassword: ({ token, password }) => jsonPost({ path: `/api/auth/updatePassword`, body: { token, password }, headers: { ...secret(token), 'x-tenant': globalConfig.tenant } }),
  requestResetPassword: ({ email }) => jsonPost({ path: `/api/auth/requestNewPassword`, body: { email }, headers: { 'x-tenant': globalConfig.tenant } }),
  resendRegisterConfirmation: ({ email }) => jsonPost({ path: `/api/auth/resendConfirmation`, body: { email }, headers: { 'x-tenant': globalConfig.tenant } }),
});

export default api;
