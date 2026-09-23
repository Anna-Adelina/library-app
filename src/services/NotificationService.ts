import { Book } from "../models/Book";
import { User } from "../models/User";
import { MAX_BORROWED_BOOKS } from "./BorrowService";

export interface Notifier {
  show(message: string, buttonLabel: string): Promise<void>;
}

export class NotificationService {
  constructor(private readonly notifier: Notifier) {}

  borrowed(book: Book, user: User): Promise<void> {
    return this.notifier.show(
      `${book.toString()} has been borrowed by ${user.toString()}.`,
      "Зрозуміло!",
    );
  }

  returned(book: Book): Promise<void> {
    return this.notifier.show(`${book.toString()} has been returned.`, "Закрити");
  }

  limitReached(user: User): Promise<void> {
    return this.notifier.show(
      `Користувач ${user.name} вже позичив максимум книг (${MAX_BORROWED_BOOKS}). Спершу поверніть одну з них.`,
      "Зрозуміло!",
    );
  }

  userNotFound(userId: string): Promise<void> {
    return this.notifier.show(`Користувача з ID ${userId} не знайдено.`, "Зрозуміло!");
  }

  alreadyBorrowed(book: Book): Promise<void> {
    return this.notifier.show(`${book.toString()} вже позичена.`, "Зрозуміло!");
  }
}
