import { Injectable, Logger } from '@nestjs/common';
import {
  Coordinates,
  IGeocodeService,
  ReverseGeocodeResponse,
} from 'src/common/interfaces/geocode.interface';

@Injectable()
export class GeocodeService implements IGeocodeService {
  async getAddress(lat: number, lon: number): Promise<ReverseGeocodeResponse> {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      );
      const data = await response.json();
      return data;
    } catch (e) {
      this.logger.error(e);
      return null;
    }
  }
  private readonly logger = new Logger(GeocodeService.name);

  async getCoordinates(address: string): Promise<Coordinates> {
    try {
      const encodedAddress = encodeURIComponent(address);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&limit=1`,
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        return { lat: parseFloat(lat), lon: parseFloat(lon) };
      } else {
        console.error('No coordinates found for the provided address.');
        return null;
      }
    } catch (e) {
      this.logger.error(e);
      return null;
    }
  }
}
