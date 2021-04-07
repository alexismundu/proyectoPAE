export interface Movie {
  _id: string;
  title: string;
  releaseDate: string;
  thumbnailURL: string;
  language: string;
  description: string;
  rating: number;
  comments: [
    {
      userId: string;
      rating: number;
      dateTime: string;
      comment: string;
    }
  ];
}
