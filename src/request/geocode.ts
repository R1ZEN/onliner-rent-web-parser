import { api } from './api';

interface IGeocode {
  lat: string;
  lon: string;
  display_name: string;
  type: string;
}

export function getGeocode(address: string): Promise<IGeocode[]> {
  return api.get('https://nominatim.openstreetmap.org/search/', {
    query: {
      format: 'json',
      q: address,
      country: 'Беларусь',
      city: 'Минск',
    }
  });
}
