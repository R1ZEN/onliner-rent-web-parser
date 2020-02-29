import { Collection } from 'mongodb';
import { compose } from '../compose';

interface INearSearchOptions {
  minDistance: number;
  maxDistance: number;
}

export const nearSearch = compose(
  async function nearSearch(collection: Collection, coordinates: number[], options: INearSearchOptions) {
    let {minDistance, maxDistance} = options;

    let result = await collection.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates,
          },
          $minDistance: minDistance,
          $maxDistance: maxDistance,
        }
      }
    }, {fields: {url: 1}}).toArray();
  
    return result;
  }
);
