import axios from 'axios';
import querystring from 'querystring';

interface IOptions {
  query: {[key: string]: string | number},
}

export const api = (function api() {

  async function get<T = unknown>(url: string, options?: Partial<IOptions>): Promise<T> {
    let requestUrl = url;
    if (options && options.query) {
      requestUrl += '?' + querystring.stringify(options.query);
    }

    return axios.get(requestUrl)
      .then(res => res.data);
  }

  return {
    get,
  }
})();
