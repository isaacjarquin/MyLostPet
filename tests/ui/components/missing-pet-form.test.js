import "react-native"
import React from "react"
import MissingPetForm from "../../../components/missing-pet-form"
import { shallow } from "enzyme"
import toJSON from "enzyme-to-json"

describe("MissingPetForm", () => {
    const navigate = jest.fn()

    const props = {
        navigation: {
            navigate: navigate
        }
    }

    beforeEach(() => {
        wrapper = shallow(<MissingPetForm {...props} />)
    })

    afterEach(() => {
        navigate.mockReset()
    })

    it("renders correctly", () => {
        expect(wrapper).toBeDefined()
    })

    describe("hideAnimation", () => {
        it("hide animation", () => {
            wrapper.setState({ showOperationMessage: true })
            wrapper.instance().hideAnimation()
            expect(wrapper.state().showOperationMessage).toBe(false)
        })
    })

    describe("setProvince", () => {
        it("sets province", () => {
            wrapper.instance().setProvince("provincia")
            expect(wrapper.state().province).toEqual({ "backgroundColor": "#77DD77", "icon": "check", "iconType": "entypo", "validationFieldBorderColor": "green", "validationMessageColor": "green", "value": "provincia" })
        })
    })

    describe("setAutonomousComunity", () => {
        it("sets AutonomousComunity", () => {
            wrapper.instance().setAutonomousComunity("Canarias")
            expect(wrapper.state().autonomousComunity).toEqual({ "backgroundColor": "#77DD77", "icon": "check", "iconType": "entypo", "validationFieldBorderColor": "green", "validationMessage": "", "validationMessageColor": "green", "value": "Canarias" })
            expect(wrapper.state().provincias).toEqual([{ "id": 12, "value": "Las Palmas" }, { "id": 13, "value": "Santa Cruz de Tenerife" }])
        })
    })

    describe("setPetType", () => {
        it("sets PetType", () => {
            wrapper.instance().setPetType("pitbull")
            expect(wrapper.state().type).toEqual({ "backgroundColor": "#77DD77", "icon": "check", "iconType": "entypo", "validationFieldBorderColor": "#99d1ed", "validationMessage": "", "validationMessageColor": "green", "value": "pitbull" })
        })
    })

    describe("_showDateTimePicker", () => {
        it("show DateTimePicker", () => {
            wrapper.setState({ isDateTimePickerVisible: false })
            wrapper.instance()._showDateTimePicker()
            expect(wrapper.state().isDateTimePickerVisible).toBe(true)
        })
    })

    describe("_hideDateTimePicker", () => {
        it("hide animation", () => {
            wrapper.setState({ isDateTimePickerVisible: true })
            wrapper.instance()._hideDateTimePicker()
            expect(wrapper.state().isDateTimePickerVisible).toBe(false)
        })
    })

    describe("_showPetTypeModal", () => {
        it("shows PetTypeModal", () => {
            wrapper.setState({ isPetTypeModalVisible: false })
            wrapper.instance()._showPetTypeModal()
            expect(wrapper.state().isPetTypeModalVisible).toBe(true)
        })
    })

    describe("_hidePetTypeModal", () => {
        it("hides PetTypeModal", () => {
            wrapper.setState({ isPetTypeModalVisible: true })
            wrapper.instance()._hidePetTypeModal()
            expect(wrapper.state().isPetTypeModalVisible).toBe(false)
        })
    })

    describe("_showAutonomousComunityModal", () => {
        it("shows AutonomousComunityModal", () => {
            wrapper.setState({ isAutonomousComunityModalVisible: false })
            wrapper.instance()._showAutonomousComunityModal()
            expect(wrapper.state().isAutonomousComunityModalVisible).toBe(true)
        })
    })

    describe("_hideAutonomousComunityModal", () => {
        it("hides AutonomousComunityModal", () => {
            wrapper.setState({ isAutonomousComunityModalVisible: true })
            wrapper.instance()._hideAutonomousComunityModal()
            expect(wrapper.state().isAutonomousComunityModalVisible).toBe(false)
        })
    })

    describe("_showProvinceModal", () => {
        it("shows ProvinceModal", () => {
            wrapper.setState({ isProvinceModalVisible: false })
            wrapper.instance()._showProvinceModal()
            expect(wrapper.state().isProvinceModalVisible).toBe(true)
        })
    })

    describe("_hideProvinceModal", () => {
        it("hides ProvinceModal", () => {
            wrapper.setState({ isProvinceModalVisible: true })
            wrapper.instance()._hideProvinceModal()
            expect(wrapper.state().isProvinceModalVisible).toBe(false)
        })
    })

    describe("_handleDatePicked", () => {
        it("hides ProvinceModal", () => {
            wrapper.instance()._handleDatePicked(new Date("2017-12-26"))
            expect(wrapper.state().date).toEqual({ "backgroundColor": "#77DD77", "icon": "check", "iconType": "entypo", "validationFieldBorderColor": "#77DD77", "validationMessageColor": "green", "value": "2017-12-26" })
        })
    })
})
