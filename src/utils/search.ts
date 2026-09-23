import { Book } from "../models/Book";

export function matchesBook(book: Book, query: string): boolean {
  const text = query.trim().toLowerCase();
  if (text === "") {
    return true;
  }
  return book.title.toLowerCase().includes(text) || book.author.toLowerCase().includes(text);
}
