import { User } from "../../models/User";
import { el } from "../dom";
import { createCard } from "./Card";

export class UserList {
  readonly element: HTMLElement;
  private readonly list: HTMLUListElement;

  constructor() {
    const { card, body } = createCard("Список Користувачів");
    this.list = el("ul", "list-group list-group-flush");
    body.append(this.list);
    this.element = card;
  }

  render(users: User[]): void {
    if (users.length === 0) {
      this.list.replaceChildren(el("li", "list-group-item text-muted", "Користувачів поки немає"));
      return;
    }
    this.list.replaceChildren(...users.map((user) => el("li", "list-group-item", user.toString())));
  }
}
