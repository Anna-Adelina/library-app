import { expect } from "chai";
import { Book } from "../src/models/Book";
import { User } from "../src/models/User";
import { Library } from "../src/services/Library";

describe("Library", () => {
  const cleanCode = new Book("1", "Clean Code", "Robert Martin", 2008);
  const codeComplete = new Book("2", "Code Complete", "Steve McConnell", 2004);
  let library: Library<Book>;

  beforeEach(() => {
    library = new Library<Book>();
  });

  describe("add", () => {
    it("adds an item to the collection", () => {
      library.add(cleanCode);
      expect(library.count).to.equal(1);
      expect(library.getAll()).to.deep.equal([cleanCode]);
    });

    it("throws when an item with the same id already exists", () => {
      library.add(cleanCode);
      expect(() => library.add(cleanCode)).to.throw("already exists");
    });
  });

  describe("remove", () => {
    it("removes an existing item and returns true", () => {
      library.add(cleanCode);
      expect(library.remove("1")).to.equal(true);
      expect(library.count).to.equal(0);
    });

    it("returns false when the id does not exist", () => {
      expect(library.remove("999")).to.equal(false);
    });
  });

  describe("search", () => {
    beforeEach(() => {
      library.add(cleanCode);
      library.add(codeComplete);
    });

    it("finds an item by id", () => {
      expect(library.findById("2")).to.equal(codeComplete);
    });

    it("returns undefined for an unknown id", () => {
      expect(library.findById("999")).to.equal(undefined);
    });

    it("finds items by a predicate", () => {
      const result = library.find((book) => book.author.includes("Martin"));
      expect(result).to.deep.equal([cleanCode]);
    });
  });

  describe("getAll", () => {
    it("returns a copy, so outside changes do not affect the library", () => {
      library.add(cleanCode);
      const all = library.getAll();
      all.pop();
      expect(library.count).to.equal(1);
    });
  });

  it("works with another type too (generics)", () => {
    const users = new Library<User>();
    users.add(new User("100", "Артем", "artem@gmail.com"));
    expect(users.findById("100")?.name).to.equal("Артем");
  });
});
