import axios from 'axios';
import { path, split, prop, compose, toPairs, forEach } from 'ramda';
import resumes from './resumes';
import events from './events';
import people from './people';
import comments from './comments';
import jobs from './jobs';
import skills from './skills';
import auth from './auth';

const globalConfig = { debug: true };
const endPoint = (path, config = globalConfig) => (config.endpoint ? `${config.endpoint}${path}` : path);
/* eslint-disable-line no-shadow */
const config = config => Object.keys(config).forEach(k => globalConfig[k] = config[k]);

const secret = token => (token ? { 'x-secret': token } : {});

const jsonPost = ({ path: uri, body = {}, headers = {} }) => axios.post(endPoint(uri), body, { headers }).then(prop('data'));

const blobPost = ({ path: uri, body = {}, headers = {} }) => axios.post(endPoint(uri), body, { headers, responseType: 'blob' }).then(prop('data'));

const formDataPost = ({ path: uri, formData = {}, headers = {} }) => {
  const newHeaders = { ...headers, 'content-type': 'multipart/form-data' };
  return fetch(endPoint(uri), { method: 'POST', body: formData, headers: newHeaders });
};

const methods = { events, resumes, comments, jobs, skills, people, auth };

const error = method => () => {
  throw new Error(`Unkown method: ${method}`);
};

const getFn = (main, name) => path(split(':', name), main);
const main = ({ method, ...rest }) => (getFn(main, method) || error(method))(rest);
main.config = config;

compose(
  forEach(([name, fn]) => (main[name] = fn({ secret, blobPost, endPoint, formDataPost, jsonPost, globalConfig }))),
  toPairs,
)(methods);

export default main;
