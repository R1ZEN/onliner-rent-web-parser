import csv from 'csvtojson';
import { Db, Collection } from 'mongodb';
import { compose } from '../../compose';
import { api } from '../../request/api';
import { catchMongodbError } from '../../database/mongodb';

interface IContext {
  db: Db,
  colName: string;
}

interface ICSVJson {
  ID: number,
  City: number,
  Area: number,
  Street: number,
  Name: string,
  Info: string,
  Lng: string,
  Lat: string,
  Stops: string,
  StopNum: string,
}


async function initTransportCollection(context: IContext) {
  let {db, colName} = context;
  let collection;

  try {
    collection = await db.createCollection(colName, {strict: true});
    await collection.createIndex('station', {unique: true});
    await collection.createIndex({ location:'2dsphere' });
  } catch(err) {
    catchMongodbError(err, () => {
      collection = db.collection(colName);
    });
  }

  return {
    collection,
  }
}

async function getTransportDatasetSenary({collection}: {collection: Collection}) {
  const documents = await collection.countDocuments();
  if (documents !== 0) {
    return;
  }

  const csvDocument: string = await api.get('https://raw.githubusercontent.com/OsmBelarus/Databases/master/Minsktrans/0list.csv');
  const csvJson: ICSVJson[] = await csv({
    downstreamFormat: 'array',
    delimiter: '	',
  }).fromString(csvDocument);

  let set = new Set();

  try {
    await collection.insertMany(csvJson.map((item) => {
      if (set.has(item.Name)) {
        return null;
      }
  
      set.add(item.Name);
  
      return {
        station: item.Name,
        location: {
          type: 'Point',
          coordinates: [
            parseFloat(item.Lng),
            parseFloat(item.Lat)
          ],
        }
      };
    }).filter(Boolean), {ordered: false});
  } catch(err) {
    catchMongodbError(err, () => null);
  }
}


export const transportDatasetStrategy = compose(
  initTransportCollection,
  getTransportDatasetSenary,
);
