import { IBook } from "./interfaces/IBook";

export class Book implements IBook {
  private _borrowedBy: string | null;

  constructor(
    private readonly _id: string,
    private readonly _title: string,
    private readonly _author: string,
    private readonly _year: number,
    borrowedBy: string | null = null,
  ) {
    this._borrowedBy = borrowedBy;
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get author(): string {
    return this._author;
  }

  get year(): number {
    return this._year;
  }

  get isBorrowed(): boolean {
    return this._borrowedBy !== null;
  }

  get borrowedBy(): string | null {
    return this._borrowedBy;
  }

  borrow(userId: string): void {
    if (this.isBorrowed) {
      throw new Error("Book is already borrowed");
    }
    this._borrowedBy = userId;
  }

  giveBack(): void {
    this._borrowedBy = null;
  }

  toString(): string {
    return `${this._title} by ${this._author} (${this._year})`;
  }

  toJSON(): IBook {
    return {
      id: this._id,
      title: this._title,
      author: this._author,
      year: this._year,
      isBorrowed: this.isBorrowed,
      borrowedBy: this._borrowedBy,
    };
  }

  static fromJSON(data: IBook): Book {
    return new Book(data.id, data.title, data.author, data.year, data.borrowedBy);
  }
}