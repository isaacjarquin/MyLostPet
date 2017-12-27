import "react-native"
import React from "react"
import Home from "../../../screens/home"
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

import renderer from "react-test-renderer"

import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() });

describe("Home", () => {
    const navigate = jest.fn()

    const props = {
        navigation: {
            navigate: navigate
        }
    };

    beforeEach(() => {
        wrapper = shallow(<Home {...props} />);
    });

    afterEach(() => {
        navigate.mockReset()
    });

    it("renders correctly", () => {
        expect(wrapper).toBeDefined()
        expect(toJSON(wrapper)).toMatchSnapshot();
    })

    describe("navigateToMissingPetForm", () => {
        beforeEach(() => {
            wrapper.instance().navigateToMissingPetForm()
        })

        it("navigate to MissingPetForm", () => {
            expect(navigate).toHaveBeenCalledTimes(1);
            expect(navigate).toHaveBeenCalledWith("MissingPetForm");
        })
    })

    describe("navigateToSearchForm", () => {
        beforeEach(() => {
            wrapper.instance().navigateToSearchForm()
        })

        it("navigate to MissingPetForm", () => {
            expect(navigate).toHaveBeenCalledTimes(1);
            expect(navigate).toHaveBeenCalledWith("SearchForm");
        })
    })

    describe("_showModal", () => {
        it("modify isModalVisible state when called", () => {
            wrapper.setState({ isModalVisible: false })
            wrapper.instance()._showModal()
            expect(wrapper.state().isModalVisible).toBe(true);
        })
    })
})