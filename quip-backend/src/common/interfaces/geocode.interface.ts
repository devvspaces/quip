export interface Coordinates {
  lat: number;
  lon: number;
}

export interface ReverseGeocodeResponse {
  display_name: string;
  address: {
    state: string;
    country: string;
    county: string;
    city: string;
  };
}

export interface IGeocodeService {
  getCoordinates(address: string): Promise<{ lat: number; lon: number }>;
  getAddress(lat: number, lon: number): Promise<ReverseGeocodeResponse>;
}
