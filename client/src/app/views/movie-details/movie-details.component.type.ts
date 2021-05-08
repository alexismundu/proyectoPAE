export interface Movie {
  _id: string;
  id: string;
  title: string;
  release_date: string;
  thumbnailURL: string;
  original_language: string;
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
