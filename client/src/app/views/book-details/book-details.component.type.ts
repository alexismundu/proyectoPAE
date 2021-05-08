export interface Book {
  _id: string;
  id: string;
  title: string;
  categories: string[];
  description: string;
  publishedDate: string;
  language: string;
  imageLink: string;
  previewLink : string,
  authors: string[];
  averageRating: number;
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
