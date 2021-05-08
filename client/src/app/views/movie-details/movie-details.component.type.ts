export interface Movie {
  _id: string;
  title: string;
  releaseDate: string;
  thumbnailURL: string;
  language: string;
  overview: string;
  vote_average: number;
  comments: [
    {
      userId: string;
      rating: number;
      dateTime: string;
      comment: string;
    }
  ];
}
