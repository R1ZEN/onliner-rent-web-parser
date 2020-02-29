export interface IOnlinerApartments {
  apartments: {
    id: number;
    price: {
      amount: string;
      currency: string;
    };
    rent_type: string;
    location: {
      address: string;
      user_address: string;
      latitude: number;
      longitude: number;
    };
    photo: string;
    contact: {
      owner: boolean;
    };
    created_at: string;
    last_time_up: string;
    up_available_in: string;
    url: string;
  }[];
  total: number;
  page: {
    limit: number;
    items: number;
    current: number;
    last: number;
  }
}


export interface RentApartmentEntity {
  id: number;
  expireAt: Date;
  price: {
    amount: string;
    currency: string;
  };
  address: string;
  location: {
    type: 'Point';
    coordinates: number[];
  };
  photo: string;
  contact: {
    owner: boolean;
  };
  url: string;
}
