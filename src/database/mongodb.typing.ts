import { MongoError } from 'mongodb';

export interface IBulkWriteError<T = any> extends MongoError {
  writeErrors: Array<{err: {op: T}}>;
}
