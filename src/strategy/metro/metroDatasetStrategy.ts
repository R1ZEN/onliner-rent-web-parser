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
  "Station": string,
  "StationRus": string,
  "Line": string,
  "YearBuilt": string,
  "Elevator": 'Y' | 'N',
  "MapID": string,
  "Latitude": string,
  "Longitude": string,
}

async function initMetroCollection(context: IContext) {
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

async function getMetroDatasetSenary({collection}: {collection: Collection}) {
  const documents = await collection.countDocuments();
  if (documents !== 0) {
    return;
  }

  const csvDocument: string = await api.get('https://raw.githubusercontent.com/ilyankou/minsk-metro-dataset/master/minsk-metro-dataset.csv');
  const csvJson: ICSVJson[] = await csv().fromString(csvDocument);

  try {
    await collection.insertMany(csvJson.map((item) => ({
      station: item.Station,
      stationRus: item.StationRus,
      yearBuild: item.YearBuilt,
      line: item.Line,
      elevator: item.Elevator === 'Y',
      location: {
        type: 'Point',
        coordinates: [
          parseFloat(item.Longitude),
          parseFloat(item.Latitude)
        ],
      }
    })), {ordered: false});
  } catch (err) {
    catchMongodbError(err, () => null);
  }
}

export const metroDatasetStrategy = compose(
  initMetroCollection,
  getMetroDatasetSenary,
);
