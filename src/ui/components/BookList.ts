import { Book } from "../../models/Book";
import { el } from "../dom";
import { createCard } from "./Card";

export class BookList {
  readonly element: HTMLElement;
  private readonly list: HTMLUListElement;

  constructor() {
    const { card, body } = createCard("Список Книг");
    this.list = el("ul", "list-group list-group-flush");
    body.append(this.list);
    this.element = card;
  }

  render(books: Book[]): void {
    if (books.length === 0) {
      this.list.replaceChildren(el("li", "list-group-item text-muted", "Книг поки немає"));
      return;
    }
    this.list.replaceChildren(...books.map((book) => el("li", "list-group-item", book.toString())));
  }
}
