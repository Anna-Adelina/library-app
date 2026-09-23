import { expect } from "chai";
import { Validation } from "../src/utils/validators";

describe("Validation", () => {
  describe("isRequired", () => {
    it("accepts a non-empty string", () => {
      expect(Validation.isRequired("Clean Code")).to.equal(true);
    });

    it("rejects an empty string", () => {
      expect(Validation.isRequired("")).to.equal(false);
    });

    it("rejects a string with only spaces", () => {
      expect(Validation.isRequired("   ")).to.equal(false);
    });
  });

  describe("isUserId", () => {
    it("accepts digits only", () => {
      expect(Validation.isUserId("1725533394038")).to.equal(true);
    });

    ["12a4", "abc", "12 34", "-5", ""].forEach((value) => {
      it(`rejects "${value}"`, () => {
        expect(Validation.isUserId(value)).to.equal(false);
      });
    });
  });

  describe("isYear", () => {
    ["1000", "1999", "2004", "2099"].forEach((value) => {
      it(`accepts "${value}"`, () => {
        expect(Validation.isYear(value)).to.equal(true);
      });
    });

    ["204", "20a4", "3000", "2100", "-2004", "abcd", ""].forEach((value) => {
      it(`rejects "${value}"`, () => {
        expect(Validation.isYear(value)).to.equal(false);
      });
    });
  });

  describe("validateUserId", () => {
    it("returns null for a valid id", () => {
      expect(Validation.validateUserId("123")).to.equal(null);
    });

    it("returns the required message for an empty id", () => {
      expect(Validation.validateUserId("")).to.equal(Validation.messages.required);
    });

    it("returns the digits message for a non-numeric id", () => {
      expect(Validation.validateUserId("12x")).to.equal(Validation.messages.digitsOnly);
    });
  });

  describe("validateBook", () => {
    it("returns no errors for valid input", () => {
      const errors = Validation.validateBook({
        title: "Clean Code",
        author: "Robert Martin",
        year: "2008",
      });
      expect(Validation.hasErrors(errors)).to.equal(false);
    });

    it("reports every empty field as required", () => {
      const errors = Validation.validateBook({ title: "", author: "", year: "" });
      expect(errors).to.deep.equal({
        title: Validation.messages.required,
        author: Validation.messages.required,
        year: Validation.messages.required,
      });
    });

    it("reports an invalid year", () => {
      const errors = Validation.validateBook({ title: "A", author: "B", year: "20a4" });
      expect(errors.year).to.equal(Validation.messages.invalidYear);
    });
  });

  describe("validateUser", () => {
    it("returns no errors for valid input", () => {
      const errors = Validation.validateUser({ name: "Артем", email: "a@gmail.com" });
      expect(Validation.hasErrors(errors)).to.equal(false);
    });

    it("reports empty fields as required", () => {
      const errors = Validation.validateUser({ name: "", email: "" });
      expect(errors.name).to.equal(Validation.messages.required);
      expect(errors.email).to.equal(Validation.messages.required);
    });
  });
});
