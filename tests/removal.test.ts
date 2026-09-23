import { expect } from "chai";
import { Book } from "../src/models/Book";
import { User } from "../src/models/User";
import { BorrowService } from "../src/services/BorrowService";
import { Library } from "../src/services/Library";
import { RemovalService } from "../src/services/RemovalService";

describe("RemovalService", () => {
  let books: Library<Book>;
  let users: Library<User>;
  let borrowService: BorrowService;
  let removal: RemovalService;

  beforeEach(() => {
    books = new Library<Book>();
    users = new Library<User>();
    borrowService = new BorrowService(books, users);
    removal = new RemovalService(books, users, borrowService);
    books.add(new Book("b1", "Clean Code", "Robert Martin", 2008));
    users.add(new User("100", "Артем", "artem@gmail.com"));
  });

  it("removes a book that is not borrowed", () => {
    expect(removal.removeBook("b1").status).to.equal("removed");
    expect(books.count).to.equal(0);
  });

  it("does not remove a borrowed book", () => {
    borrowService.borrow("b1", "100");
    expect(removal.removeBook("b1").status).to.equal("borrowed");
    expect(books.count).to.equal(1);
  });

  it("removes a user without borrowed books", () => {
    expect(removal.removeUser("100").status).to.equal("removed");
    expect(users.count).to.equal(0);
  });

  it("does not remove a user who has borrowed books", () => {
    borrowService.borrow("b1", "100");
    const result = removal.removeUser("100");
    expect(result.status).to.equal("has-books");
    expect(users.count).to.equal(1);
  });

  it("allows removing the user after the book is returned", () => {
    borrowService.borrow("b1", "100");
    borrowService.giveBack("b1");
    expect(removal.removeUser("100").status).to.equal("removed");
  });
});
