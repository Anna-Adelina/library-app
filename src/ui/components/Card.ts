import { el } from "../dom";

export function createCard(title: string): { card: HTMLElement; body: HTMLElement } {
  const card = el("section", "card shadow-sm mb-3");
  const body = el("div", "card-body");
  body.append(el("h2", "h5 mb-3", title));
  card.append(body);
  return { card, body };
}
