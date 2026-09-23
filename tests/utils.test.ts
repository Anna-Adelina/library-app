import { expect } from "chai";
import { Book } from "../src/models/Book";
import { paginate } from "../src/utils/pagination";
import { matchesBook } from "../src/utils/search";

describe("paginate", () => {
  const items = Array.from({ length: 12 }, (_, index) => index + 1);

  it("returns the first page", () => {
    const result = paginate(items, 1, 5);
    expect(result.items).to.deep.equal([1, 2, 3, 4, 5]);
    expect(result.totalPages).to.equal(3);
  });

  it("returns a shorter last page", () => {
    expect(paginate(items, 3, 5).items).to.deep.equal([11, 12]);
  });

  it("clamps a page number that is too big", () => {
    expect(paginate(items, 99, 5).page).to.equal(3);
  });

  it("clamps a page number below 1", () => {
    expect(paginate(items, 0, 5).page).to.equal(1);
  });

  it("gives one empty page for an empty list", () => {
    const result = paginate([], 1, 5);
    expect(result.items).to.deep.equal([]);
    expect(result.totalPages).to.equal(1);
  });
});

describe("matchesBook", () => {
  const book = new Book("1", "Clean Code", "Robert Martin", 2008);

  it("matches by title ignoring case", () => {
    expect(matchesBook(book, "clean")).to.equal(true);
  });

  it("matches by author", () => {
    expect(matchesBook(book, "MARTIN")).to.equal(true);
  });

  it("matches everything for an empty query", () => {
    expect(matchesBook(book, "  ")).to.equal(true);
  });

  it("does not match an unrelated query", () => {
    expect(matchesBook(book, "java")).to.equal(false);
  });
});
