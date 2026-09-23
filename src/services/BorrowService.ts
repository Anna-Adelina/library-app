import { Book } from "../models/Book";
import { User } from "../models/User";
import { Library } from "./Library";

export const MAX_BORROWED_BOOKS = 3;

export type BorrowResult =
  | { status: "success"; book: Book; user: User }
  | { status: "already-borrowed"; book: Book }
  | { status: "user-not-found" }
  | { status: "limit-reached"; user: User };

export class BorrowService {
  constructor(
    private readonly books: Library<Book>,
    private readonly users: Library<User>,
  ) {}

  countBorrowedBy(userId: string): number {
    return this.books.find((book) => book.borrowedBy === userId).length;
  }

  borrow(bookId: string, userId: string): BorrowResult {
    const book = this.books.findById(bookId);
    if (!book) {
      throw new Error(`Book ${bookId} not found`);
    }
    if (book.isBorrowed) {
      return { status: "already-borrowed", book };
    }

    const user = this.users.findById(userId);
    if (!user) {
      return { status: "user-not-found" };
    }
    if (this.countBorrowedBy(userId) >= MAX_BORROWED_BOOKS) {
      return { status: "limit-reached", user };
    }

    book.borrow(userId);
    return { status: "success", book, user };
  }

  giveBack(bookId: string): Book {
    const book = this.books.findById(bookId);
    if (!book) {
      throw new Error(`Book ${bookId} not found`);
    }
    book.giveBack();
    return book;
  }
}
