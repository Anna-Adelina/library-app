import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { Book } from "./models/Book";
import { IBook } from "./models/interfaces/IBook";
import { Library } from "./services/Library";
import { Storage } from "./services/Storage";
import { BookForm } from "./ui/components/BookForm";
import { BookList } from "./ui/components/BookList";
import { el } from "./ui/dom";
import { generateId } from "./utils/idGenerator";

const BOOKS_KEY = "books";

const root = document.getElementById("app");
if (!root) {
  throw new Error("Element #app not found");
}

const storage = new Storage();
const books = new Library<Book>(
  (storage.load<IBook[]>(BOOKS_KEY) ?? []).map((data) => Book.fromJSON(data)),
);

const bookList = new BookList();
const bookForm = new BookForm((data) => {
  books.add(new Book(generateId(), data.title, data.author, data.year));
  storage.save(BOOKS_KEY, books.getAll());
  bookList.render(books.getAll());
});

document.body.classList.add("bg-light");
root.className = "container py-4";
root.append(
  el("h1", "h3 text-center mb-4", "Система Управління Бібліотекою"),
  bookForm.element,
  bookList.element,
);

bookList.render(books.getAll());
