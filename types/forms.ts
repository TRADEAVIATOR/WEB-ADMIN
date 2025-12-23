export interface EventFormValues {
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  eventImages: (File | string)[];
  ticketTiers: {
    name: string;
    currency: string;
    quantity: number;
    price: string;
  }[];
}
