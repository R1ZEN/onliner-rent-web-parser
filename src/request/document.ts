import { api } from './api';
import { JSDOM } from 'jsdom';
import { logApp } from '../logger/withLogger';
import { compose } from '../compose';

export const getDocument = compose(
  async function getDocument(url: string, options: any) {
    let retry = 0;
    let error;

    while (retry < 10) {
      try {
        let html = await api.get<string>(url, options);

        return new JSDOM(html).window.document;
      } catch (err) {
        error = err;
        retry++;
        logApp.error('error:', err);
        logApp.warn('retry:', retry);

        await new Promise(res => {
          setTimeout(res, 500);
        });
      }
    }

    return Promise.reject(error);
  }
);
