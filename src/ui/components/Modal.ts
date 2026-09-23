import { Modal as BootstrapModal } from "bootstrap";
import { Validation } from "../../utils/validators";
import { el } from "../dom";
import { FormField } from "./FormField";

interface ModalButton {
  label: string;
  className: string;
  onClick: (close: () => void) => void;
}

interface ModalOptions {
  title?: string;
  body: HTMLElement;
  buttons: ModalButton[];
}

function openModal({ title, body, buttons }: ModalOptions): Promise<void> {
  const modal = el("div", "modal fade");
  modal.tabIndex = -1;
  const dialog = el("div", "modal-dialog modal-dialog-centered");
  const content = el("div", "modal-content");

  if (title) {
    const header = el("div", "modal-header");
    header.append(el("h5", "modal-title", title));
    content.append(header);
  }

  const bodyElement = el("div", "modal-body");
  bodyElement.append(body);
  const footer = el("div", "modal-footer");
  content.append(bodyElement, footer);
  dialog.append(content);
  modal.append(dialog);
  document.body.append(modal);

  const instance = new BootstrapModal(modal);
  const close = (): void => instance.hide();

  buttons.forEach((button) => {
    const element = el("button", button.className, button.label);
    element.type = "button";
    element.addEventListener("click", () => button.onClick(close));
    footer.append(element);
  });

  return new Promise<void>((resolve) => {
    modal.addEventListener("hidden.bs.modal", () => {
      instance.dispose();
      modal.remove();
      resolve();
    });
    instance.show();
  });
}

export function showMessage(message: string, buttonLabel: string): Promise<void> {
  return openModal({
    body: el("p", "mb-0", message),
    buttons: [{ label: buttonLabel, className: "btn btn-primary", onClick: (close) => close() }],
  });
}

export function askUserId(title: string): Promise<string | null> {
  const field = new FormField("ID");
  let result: string | null = null;

  return openModal({
    title,
    body: field.element,
    buttons: [
      { label: "Скасувати", className: "btn btn-secondary", onClick: (close) => close() },
      {
        label: "Зберегти",
        className: "btn btn-primary",
        onClick: (close) => {
          const error = Validation.validateUserId(field.value);
          field.showError(error ?? undefined);
          if (error) {
            return;
          }
          result = field.value.trim();
          close();
        },
      },
    ],
  }).then(() => result);
}

export function askConfirm(message: string, confirmLabel = "Видалити"): Promise<boolean> {
  let confirmed = false;

  return openModal({
    body: el("p", "mb-0", message),
    buttons: [
      { label: "Скасувати", className: "btn btn-secondary", onClick: (close) => close() },
      {
        label: confirmLabel,
        className: "btn btn-danger",
        onClick: (close) => {
          confirmed = true;
          close();
        },
      },
    ],
  }).then(() => confirmed);
}
