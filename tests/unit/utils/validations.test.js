import "react-native"
import {
  presence,
  isValidNumber,
  isValidEmail,
  setValidation,
  isInvalidForm
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

  describe("isInvaliForm", () => {
    describe("when is a valid form", () => {
      const name = {value: 'test name'}
      const email = {value: 'test@gmail.com'}
      const phoneNumber = {value: 987465364}

      const fields = [
        { field: name, validate: presence},
        { field: email, validate: isValidEmail},
        { field: phoneNumber, validate: isValidNumber}
      ]

      test("returns false when all the fields are correct", () => {
        expect(isInvalidForm(fields)).toBe(false)
      })
    })

    describe("when is an invalid form", () => {
      test("return true if name is not present", () => {
        const fields = [
          { field: {value: ''}, validate: presence},
          { field: {value: 'test@gmail.com'}, validate: isValidEmail},
          { field: {value: 987465364}, validate: isValidNumber}
        ]

        expect(isInvalidForm(fields)).toBe(true)
      })

      test("return true if email is not present", () => {
        const fields = [
          { field: {value: 'some value'}, validate: presence},
          { field: {value: ''}, validate: isValidEmail},
          { field: {value: 987465364}, validate: isValidNumber}
        ]

        expect(isInvalidForm(fields)).toBe(true)
      })

      test("return true if email has an invalid format", () => {
        const fields = [
          { field: {value: 'some value'}, validate: presence},
          { field: {value: 'test@test'}, validate: isValidEmail},
          { field: {value: 987465364}, validate: isValidNumber}
        ]

        expect(isInvalidForm(fields)).toBe(true)
      })

      test("return true if phoneNumber is not present", () => {
        const fields = [
          { field: {value: 'some value'}, validate: presence},
          { field: {value: 'test@test.com'}, validate: isValidEmail},
          { field: {value: ''}, validate: isValidNumber}
        ]

        expect(isInvalidForm(fields)).toBe(true)
      })

      test("return true if phoneNumber is an invalid number", () => {
        const fields = [
          { field: {value: 'some value'}, validate: presence},
          { field: {value: 'test@test.com'}, validate: isValidEmail},
          { field: {value: "2345c4323"}, validate: isValidNumber}
        ]

        expect(isInvalidForm(fields)).toBe(true)
      })
    })
  })
})
