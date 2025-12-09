export interface EventFormValues {
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  eventImages: (File | string)[];
  tickets: {
    name: string;
    quantity: number;
    price: string;
  }[];
}
