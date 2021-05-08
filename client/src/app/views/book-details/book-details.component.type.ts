export interface Book {
  _id: string;
  title: string;
  categories: string[];
  description: string;
  publishedDate: string;
  language: string;
  imageLink: string;
  authors: string[];
  rating: number;
  pageCount: number;
  comments: [
    {
      userId: string;
      rating: number;
      dateTime: string;
      comment: string;
    }
  ];
}
