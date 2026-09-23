import { User } from "../../models/User";
import { paginate } from "../../utils/pagination";
import { el } from "../dom";
import { createCard } from "./Card";
import { Pagination } from "./Pagination";

export interface UserListHandlers {
  getUsers: () => User[];
  onDelete: (user: User) => void;
}

export class UserList {
  readonly element: HTMLElement;
  private readonly list: HTMLUListElement;
  private readonly pagination: Pagination;
  private page = 1;

  constructor(private readonly handlers: UserListHandlers) {
    const { card, body } = createCard("Список Користувачів");
    this.list = el("ul", "list-group list-group-flush");
    this.pagination = new Pagination((page) => {
      this.page = page;
      this.refresh();
    });
    body.append(this.list, this.pagination.element);
    this.element = card;
  }

  refresh(): void {
    const { items, page, totalPages } = paginate(this.handlers.getUsers(), this.page);
    this.page = page;

    if (items.length === 0) {
      this.list.replaceChildren(el("li", "list-group-item text-muted", "Користувачів поки немає"));
    } else {
      this.list.replaceChildren(...items.map((user) => this.createItem(user)));
    }
    this.pagination.render(page, totalPages);
  }

  private createItem(user: User): HTMLElement {
    const item = el("li", "list-group-item d-flex justify-content-between align-items-center");

    const deleteButton = el("button", "btn btn-outline-danger btn-sm", "Видалити");
    deleteButton.type = "button";
    deleteButton.addEventListener("click", () => this.handlers.onDelete(user));

    item.append(el("span", "", user.toString()), deleteButton);
    return item;
  }
}
