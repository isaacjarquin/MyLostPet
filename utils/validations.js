const presence = ({value}) => {
    return value !== "" && value !== undefined
}

const isValidNumber = ({value}) => {
    let reg = new RegExp(/^\d+(?:\.\d{1,2})?$/)

    return reg.test(value)
}

const isValidEmail = ({value}) => {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return reg.test(value)
}

const setValidation = (message) => {
    return {
        validationMessage: message,
        validationMessageColor: "red",
        validationFieldBorderColor: "red"
    }
}

const isInvalidForm = (fields) => {

    return fields.map(({field, validate}) => validate(field)).includes(false)
}

module.exports = {
    presence,
    isValidNumber,
    isValidEmail,
    setValidation,
    isInvalidForm
}
