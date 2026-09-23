import { Validation } from "../../utils/validators";
import { el } from "../dom";
import { createCard } from "./Card";
import { FormField } from "./FormField";

export interface BookFormData {
  title: string;
  author: string;
  year: number;
}

export class BookForm {
  readonly element: HTMLElement;
  private readonly fields: Record<keyof Validation.BookInput, FormField>;

  constructor(private readonly onSubmit: (data: BookFormData) => void) {
    const { card, body } = createCard("Додати Книгу");

    this.fields = {
      title: new FormField("Назва книги"),
      author: new FormField("Автор"),
      year: new FormField("Рік видання"),
    };

    const form = el("form");
    form.noValidate = true;
    const button = el("button", "btn btn-success btn-sm", "Додати Книгу");
    button.type = "submit";
    form.append(
      this.fields.title.element,
      this.fields.author.element,
      this.fields.year.element,
      button,
    );
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.handleSubmit();
    });

    body.append(form);
    this.element = card;
  }

  private handleSubmit(): void {
    const input: Validation.BookInput = {
      title: this.fields.title.value,
      author: this.fields.author.value,
      year: this.fields.year.value,
    };
    const errors = Validation.validateBook(input);

    (Object.keys(this.fields) as (keyof Validation.BookInput)[]).forEach((key) => {
      this.fields[key].showError(errors[key]);
    });

    if (Validation.hasErrors(errors)) {
      return;
    }

    this.onSubmit({
      title: input.title.trim(),
      author: input.author.trim(),
      year: Number(input.year),
    });
    Object.values(this.fields).forEach((field) => field.clear());
  }
}
