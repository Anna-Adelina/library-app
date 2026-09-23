import { Book } from "../models/Book";
import { User } from "../models/User";
import { BorrowService } from "./BorrowService";
import { Library } from "./Library";

export type RemoveBookResult =
  { status: "removed"; book: Book } | { status: "borrowed"; book: Book };

export type RemoveUserResult =
  { status: "removed"; user: User } | { status: "has-books"; user: User; count: number };

export class RemovalService {
  constructor(
    private readonly books: Library<Book>,
    private readonly users: Library<User>,
    private readonly borrowService: BorrowService,
  ) {}

  removeBook(bookId: string): RemoveBookResult {
    const book = this.books.findById(bookId);
    if (!book) {
      throw new Error(`Book ${bookId} not found`);
    }
    if (book.isBorrowed) {
      return { status: "borrowed", book };
    }
    this.books.remove(bookId);
    return { status: "removed", book };
  }

  removeUser(userId: string): RemoveUserResult {
    const user = this.users.findById(userId);
    if (!user) {
      throw new Error(`User ${userId} not found`);
    }
    const count = this.borrowService.countBorrowedBy(userId);
    if (count > 0) {
      return { status: "has-books", user, count };
    }
    this.users.remove(userId);
    return { status: "removed", user };
  }
}
