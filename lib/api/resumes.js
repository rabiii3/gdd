import { pick } from 'ramda';

const api = ({ jsonPost, blobPost, secret, globalConfig }) => ({
  loadAll: ({ token }) => jsonPost({ path: '/api/resumes/loadAll', headers: { ...secret(token), 'x-tenant': globalConfig.tenant }}),
  loadFile: ({ resume, token }) => blobPost({ path: `/api/resumes/loadFile/${resume._id}`, headers: { ...secret(token), 'x-tenant': globalConfig.tenant } }),
  add: ({ resume, token }) => {
    const { file } = resume;
    const body = {
      ...pick(['firstname', 'lastname', 'email', 'award', 'phoneNumber', 'skills', 'color','status', 'rating'], resume),
      file: {
        mimetype: file.type,
        size: file.size,
      },
    };
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        body.file.content = reader.result;
        resolve(jsonPost({ path: `/api/resumes/add`, body, headers: { ...secret(token), 'x-tenant': globalConfig.tenant } }));
      };
      reader.onabort = () => reject(new Error('Error: file reading was aborted'));
      reader.onerror = () => reject(new Error('Error: file reading has failed'));
      reader.readAsDataURL(file);
    });
  },
  update: ({ updates, token }) => {
    const { file } = updates;
    if (file) {
      const body = {
        ...pick(['_id', 'firstname', 'lastname', 'award', 'email', 'phoneNumber', 'status', 'rating'], updates),
        file: {
          mimetype: file.type,
          size: file.size,
        },
      };
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          body.file.content = reader.result;
          resolve(jsonPost({ path: `/api/resumes/update`, body, headers: { ...secret(token), 'x-tenant': globalConfig.tenant } }));
        };
        reader.onabort = () => reject(new Error('Error: file reading was aborted'));
        reader.onerror = () => reject(new Error('Error: file reading has failed'));
        reader.readAsDataURL(file);
      });
    } 
    const body = pick(['_id', 'firstname', 'lastname', 'award', 'email', 'phoneNumber', 'skills', 'status', 'rating'], updates);
    return jsonPost({ path: `/api/resumes/update`, body, headers: { ...secret(token), 'x-tenant': globalConfig.tenant } });
  },

  del: ({ resume, token }) => jsonPost({ path: `/api/resumes/del/${resume._id}`, headers: { ...secret(token), 'x-tenant': globalConfig.tenant } }),
});

export default api;
