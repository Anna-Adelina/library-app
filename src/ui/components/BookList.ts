import { Book } from "../../models/Book";
import { el } from "../dom";
import { createCard } from "./Card";

export interface BookListHandlers {
  onBorrow: (book: Book) => void;
  onReturn: (book: Book) => void;
}

export class BookList {
  readonly element: HTMLElement;
  private readonly list: HTMLUListElement;

  constructor(private readonly handlers: BookListHandlers) {
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
    this.list.replaceChildren(...books.map((book) => this.createItem(book)));
  }

  private createItem(book: Book): HTMLElement {
    const item = el("li", "list-group-item d-flex justify-content-between align-items-center");
    const button = el(
      "button",
      book.isBorrowed ? "btn btn-warning btn-sm" : "btn btn-primary btn-sm",
      book.isBorrowed ? "Повернути" : "Позичити",
    );
    button.type = "button";
    button.addEventListener("click", () => {
      if (book.isBorrowed) {
        this.handlers.onReturn(book);
      } else {
        this.handlers.onBorrow(book);
      }
    });
    item.append(el("span", "", book.toString()), button);
    return item;
  }
}
