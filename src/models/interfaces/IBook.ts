export interface IBook {
  readonly id: string;
  readonly title: string;
  readonly author: string;
  readonly year: number;
  readonly isBorrowed: boolean;
  readonly borrowedBy: string | null;
}