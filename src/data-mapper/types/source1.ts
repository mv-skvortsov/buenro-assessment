export interface Source1 {
  id: number;
  name: string;
  isAvailable: boolean;
  priceForNight: number;
  address: {
    country: string;
    city: string;
  };
}
