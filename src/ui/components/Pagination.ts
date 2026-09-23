import { el } from "../dom";

export class Pagination {
  readonly element: HTMLElement;
  private readonly list: HTMLUListElement;

  constructor(private readonly onChange: (page: number) => void) {
    this.element = el("nav", "mt-3");
    this.list = el("ul", "pagination pagination-sm justify-content-center mb-0");
    this.element.append(this.list);
  }

  render(page: number, totalPages: number): void {
    this.element.hidden = totalPages <= 1;

    const items: HTMLElement[] = [this.createItem("‹", page - 1, page === 1, false)];
    for (let number = 1; number <= totalPages; number++) {
      items.push(this.createItem(String(number), number, false, number === page));
    }
    items.push(this.createItem("›", page + 1, page === totalPages, false));

    this.list.replaceChildren(...items);
  }

  private createItem(
    label: string,
    target: number,
    disabled: boolean,
    active: boolean,
  ): HTMLElement {
    const item = el("li", "page-item");
    item.classList.toggle("disabled", disabled);
    item.classList.toggle("active", active);

    const button = el("button", "page-link", label);
    button.type = "button";
    button.disabled = disabled;
    button.addEventListener("click", () => this.onChange(target));

    item.append(button);
    return item;
  }
}
