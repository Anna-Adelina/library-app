import { Validation } from "../../utils/validators";
import { el } from "../dom";
import { createCard } from "./Card";
import { FormField } from "./FormField";

export interface UserFormData {
  name: string;
  email: string;
}

export class UserForm {
  readonly element: HTMLElement;
  private readonly fields: Record<keyof Validation.UserInput, FormField>;

  constructor(private readonly onSubmit: (data: UserFormData) => void) {
    const { card, body } = createCard("Додати Користувача");

    this.fields = {
      name: new FormField("Ім'я"),
      email: new FormField("Email", "email"),
    };

    const form = el("form");
    form.noValidate = true;
    const button = el("button", "btn btn-success btn-sm", "Додати Користувача");
    button.type = "submit";
    form.append(this.fields.name.element, this.fields.email.element, button);
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.handleSubmit();
    });

    body.append(form);
    this.element = card;
  }

  private handleSubmit(): void {
    const input: Validation.UserInput = {
      name: this.fields.name.value,
      email: this.fields.email.value,
    };
    const errors = Validation.validateUser(input);

    (Object.keys(this.fields) as (keyof Validation.UserInput)[]).forEach((key) => {
      this.fields[key].showError(errors[key]);
    });

    if (Validation.hasErrors(errors)) {
      return;
    }

    this.onSubmit({ name: input.name.trim(), email: input.email.trim() });
    Object.values(this.fields).forEach((field) => field.clear());
  }
}
