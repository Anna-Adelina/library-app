export namespace Validation {
  export const messages = {
    required: "Це поле є обов'язковим",
    digitsOnly: "ID має містити лише цифри",
    invalidYear: "Введіть коректний рік (наприклад, 2004)",
  } as const;

  export interface BookInput {
    title: string;
    author: string;
    year: string;
  }

  export interface UserInput {
    name: string;
    email: string;
  }

  export type Errors<T> = Partial<Record<keyof T, string>>;

  const DIGITS_ONLY = /^\d+$/;
  const YEAR = /^(1\d{3}|20\d{2})$/;

  export function isRequired(value: string): boolean {
    return value.trim().length > 0;
  }

  export function isUserId(value: string): boolean {
    return DIGITS_ONLY.test(value.trim());
  }

  export function isYear(value: string): boolean {
    return YEAR.test(value.trim());
  }

  export function validateUserId(id: string): string | null {
    if (!isRequired(id)) {
      return messages.required;
    }
    if (!isUserId(id)) {
      return messages.digitsOnly;
    }
    return null;
  }

  export function validateBook(input: BookInput): Errors<BookInput> {
    const errors: Errors<BookInput> = {};
    if (!isRequired(input.title)) {
      errors.title = messages.required;
    }
    if (!isRequired(input.author)) {
      errors.author = messages.required;
    }
    if (!isRequired(input.year)) {
      errors.year = messages.required;
    } else if (!isYear(input.year)) {
      errors.year = messages.invalidYear;
    }
    return errors;
  }

  export function validateUser(input: UserInput): Errors<UserInput> {
    const errors: Errors<UserInput> = {};
    if (!isRequired(input.name)) {
      errors.name = messages.required;
    }
    if (!isRequired(input.email)) {
      errors.email = messages.required;
    }
    return errors;
  }

  export function hasErrors<T>(errors: Errors<T>): boolean {
    return Object.keys(errors).length > 0;
  }
}
