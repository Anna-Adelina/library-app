import { User } from "../../models/User";
import { paginate } from "../../utils/pagination";
import { el } from "../dom";
import { createCard } from "./Card";
import { Pagination } from "./Pagination";

export interface UserListHandlers {
  getUsers: () => User[];
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
      this.list.replaceChildren(
        ...items.map((user) => el("li", "list-group-item", user.toString())),
      );
    }
    this.pagination.render(page, totalPages);
  }
}
