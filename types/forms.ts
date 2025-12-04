export interface EventFormValues {
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  tickets: {
    type: string;
    amount: number;
  }[];
}
