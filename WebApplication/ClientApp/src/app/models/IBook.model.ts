export interface IBook {
  id: string;
  name: string;
  author: string;
  translator: string;
  genre: string;
  coverImageUrl: string;
  summary: string;
  comments: IBookComment[];
}
export interface IBookComment {
  writer: string,
  comment: string,
  createdDateTime: Date
}
