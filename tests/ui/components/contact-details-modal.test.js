import "react-native"
import React from "react"
import ContactDetailsModal from "../../../components/contact-details-modal"

import { shallow } from "enzyme"
import toJSON from "enzyme-to-json"

describe("ContactDetailsModal", () => {
    const navigate = jest.fn()

    const props = {
        navigation: {
            navigate: navigate
        }
    }

    beforeEach(() => {
        wrapper = shallow(<ContactDetailsModal {...props} />)
    })

    afterEach(() => {
        navigate.mockReset()
    })

    it("renders correctly", () => {
        expect(wrapper).toBeDefined()
        expect(toJSON(wrapper)).toMatchSnapshot()
    })

    describe("_showModal", () => {
        it("shows modal", () => {
            wrapper.setState({ isModalVisible: false })
            wrapper.instance()._showModal()
            expect(wrapper.state().isModalVisible).toBe(true)
        })
    })

    describe("_hideModal", () => {
        it("hides modal", () => {
            wrapper.setState({ isModalVisible: true })
            wrapper.instance()._hideModal()
            expect(wrapper.state().isModalVisible).toBe(false)
        })
    })

    describe("name", () => {
        it("sets name", () => {
            wrapper.setState({ name: "", email: "test@gmail.com", phoneNumber: "034534535345", personalInformation: "personalInformation" })
            wrapper.instance().setValidations()
            expect(wrapper.state().name).toEqual({ "backgroundColor": "#FF6961", "icon": "cross", "iconType": "entypo", "validationFieldBorderColor": "red", "validationMessage": "El campo nombre es obligatorio", "validationMessageColor": "red" })
        })
    })

    describe("email", () => {
        it("sets email", () => {
            wrapper.setState({ name: "name", email: "test", phoneNumber: "034534535345", personalInformation: "personalInformation" })
            wrapper.instance().setValidations()
            expect(wrapper.state().email).toEqual({ "backgroundColor": "#FF6961", "icon": "cross", "iconType": "entypo", "validationFieldBorderColor": "red", "validationMessage": "Debes introducir un formato valido de email", "validationMessageColor": "red" })
        })
    })

    describe("phoneNumber", () => {
        it("sets phoneNumber", () => {
            wrapper.setState({ name: "name", email: "test@gmail.com", phoneNumber: "", personalInformation: "personalInformation" })
            wrapper.instance().setValidations()
            expect(wrapper.state().phoneNumber).toEqual({ "backgroundColor": "#FF6961", "icon": "cross", "iconType": "entypo", "validationFieldBorderColor": "red", "validationMessage": "Debes introducir un numero valido de telefono", "validationMessageColor": "red" })
        })
    })

    describe("personalInformation", () => {
        it("sets personalInformation", () => {
            wrapper.setState({ name: "name", email: "test@gmail.com", phoneNumber: "034534535345", personalInformation: "" })
            wrapper.instance().setValidations()
            expect(wrapper.state().personalInformation).toEqual({ "backgroundColor": "#FF6961", "icon": "cross", "iconType": "entypo", "validationFieldBorderColor": "red", "validationMessage": "El campo informacion personal es obligatorio", "validationMessageColor": "red" })
        })
    })
})
