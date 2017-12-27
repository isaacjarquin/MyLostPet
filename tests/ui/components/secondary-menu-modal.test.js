import "react-native"
import React from "react"
import SecondaryMenyModal from "../../../components/secondary-menu-modal"
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

import renderer from "react-test-renderer"

describe("SecondaryMenyModal", () => {
    const props = {}

    beforeEach(() => {
        wrapper = shallow(<SecondaryMenyModal {...props} />);
    })

    it("renders correctly", () => {
        expect(wrapper).toBeDefined()
        expect(toJSON(wrapper)).toMatchSnapshot();
    })

    describe("_showModal", () => {
        it("shows modal", () => {
            wrapper.setState({ isModalVisible: false })
            wrapper.instance()._showModal()
            expect(wrapper.state().isModalVisible).toBe(true);
        })
    })

    describe("_hideModal", () => {
        it("hides modal", () => {
            wrapper.setState({ isModalVisible: true })
            wrapper.instance()._hideModal()
            expect(wrapper.state().isModalVisible).toBe(false);
        })
    })

    describe("_showPetTypeModal", () => {
        it("shows modal", () => {
            wrapper.setState({ isPetTypeModalVisible: false })
            wrapper.instance()._showPetTypeModal()
            expect(wrapper.state().isPetTypeModalVisible).toBe(true);
        })
    })

    describe("_hidePetTypeModal", () => {
        it("hides modal", () => {
            wrapper.setState({ isPetTypeModalVisible: true })
            wrapper.instance()._hidePetTypeModal()
            expect(wrapper.state().isPetTypeModalVisible).toBe(false);
        })
    })

    describe("_showAutonomousComunityModal", () => {
        it("shows modal", () => {
            wrapper.setState({ isAutonomousComunityModalVisible: false })
            wrapper.instance()._showAutonomousComunityModal()
            expect(wrapper.state().isAutonomousComunityModalVisible).toBe(true);
        })
    })

    describe("_hideAutonomousComunityModal", () => {
        it("hides modal", () => {
            wrapper.setState({ isAutonomousComunityModalVisible: true })
            wrapper.instance()._hideAutonomousComunityModal()
            expect(wrapper.state().isAutonomousComunityModalVisible).toBe(false);
        })
    })

    describe("_showProvinceModal", () => {
        it("shows modal", () => {
            wrapper.setState({ isProvinceModalVisible: false })
            wrapper.instance()._showProvinceModal()
            expect(wrapper.state().isProvinceModalVisible).toBe(true);
        })
    })

    describe("_hideProvinceModal", () => {
        it("hides modal", () => {
            wrapper.setState({ isProvinceModalVisible: true })
            wrapper.instance()._hideProvinceModal()
            expect(wrapper.state().isProvinceModalVisible).toBe(false)
        })
    })

    describe("setType", () => {
        it("sets a type", () => {
            wrapper.setState({ type: "" })
            wrapper.instance().setType("dog")
            expect(wrapper.state().type).toBe("dog")
        })
    })

    describe("setProvince", () => {
        it("sets the province", () => {
            wrapper.setState({ province: "" })
            wrapper.instance().setProvince("Tenerife")
            expect(wrapper.state().province).toBe("Tenerife")
        })
    })

    describe("setAutonomousComunity", () => {
        it("sets autonomous comunity and provincias", () => {
            wrapper.setState({ autonomousComunity: "", provincias: [] })
            wrapper.instance().setAutonomousComunity("Canarias")
            expect(wrapper.state().autonomousComunity).toBe("Canarias")
            expect(wrapper.state().provincias).toEqual([{ "id": 12, "value": "Las Palmas" }, { "id": 13, "value": "Santa Cruz de Tenerife" }])
        })
    })
})
