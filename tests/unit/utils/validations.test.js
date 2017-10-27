import "react-native"
import {
  presence,
  isValidNumber,
  isValidEmail,
  setValidation
} from "../../../utils/validations"

describe("validations", () => {
  describe("presence", () => {
    test("when value is present, it returns true", () => {
      expect(presence({value: "some value"})).toBe(true)
    })

    test("when value is not present, it returns false", () => {
      expect(presence({value: ""})).toBe(false)
    })
  })

  describe("isValiNumber", () => {
    test("when value is a number, it returns true", () => {
      expect(isValidNumber({value: 1234})).toBe(true)
    })

    test("when value is not a number, it returns false", () => {
      expect(isValidNumber({value: "12ab3"})).toBe(false)
    })

    test("when value is not a number, it returns false", () => {
      expect(isValidNumber({value: ""})).toBe(false)
    })
  })

  describe("isValidEmail", () => {
    test("when value is a valid email, it returns true", () => {
      expect(isValidEmail({value: "test@test.com"})).toBe(true)
    })

    test("when value is an invalid email, it returns false", () => {
      expect(isValidEmail({value: "test@test"})).toBe(false)
    })

    test("when value is an invalid email, it returns false", () => {
      expect(isValidEmail({value: "test"})).toBe(false)
    })

    test("when value is an invalid email, it returns false", () => {
      expect(isValidEmail({value: 1234})).toBe(false)
    })

    test("when value is an invalid email, it returns false", () => {
      expect(isValidEmail({value: ""})).toBe(false)
    })
  })

  describe("setValidation", () => {
    test("validation gets set appropiatly", () => {
      expect(setValidation("validation test")).toEqual({
        validationMessage: "validation test",
        validationMessageColor: "red",
        validationFieldBorderColor: "red"
      })
    })
  })
})
