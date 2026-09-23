import { Book } from "../../models/Book";
import { paginate } from "../../utils/pagination";
import { matchesBook } from "../../utils/search";
import { el } from "../dom";
import { createCard } from "./Card";
import { Pagination } from "./Pagination";

export interface BookListHandlers {
  getBooks: () => Book[];
  onBorrow: (book: Book) => void;
  onReturn: (book: Book) => void;
}

export class BookList {
  readonly element: HTMLElement;
  private readonly list: HTMLUListElement;
  private readonly search: HTMLInputElement;
  private readonly pagination: Pagination;
  private query = "";
  private page = 1;

  constructor(private readonly handlers: BookListHandlers) {
    const { card, body } = createCard("Список Книг");

    this.search = el("input", "form-control mb-3");
    this.search.type = "search";
    this.search.placeholder = "Пошук за назвою або автором";
    this.search.addEventListener("input", () => {
      this.query = this.search.value;
      this.page = 1;
      this.refresh();
    });

    this.list = el("ul", "list-group list-group-flush");
    this.pagination = new Pagination((page) => {
      this.page = page;
      this.refresh();
    });

    body.append(this.search, this.list, this.pagination.element);
    this.element = card;
  }

  refresh(): void {
    const found = this.handlers.getBooks().filter((book) => matchesBook(book, this.query));
    const { items, page, totalPages } = paginate(found, this.page);
    this.page = page;

    if (items.length === 0) {
      const message = this.query.trim() ? "Нічого не знайдено" : "Книг поки немає";
      this.list.replaceChildren(el("li", "list-group-item text-muted", message));
    } else {
      this.list.replaceChildren(...items.map((book) => this.createItem(book)));
    }
    this.pagination.render(page, totalPages);
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
