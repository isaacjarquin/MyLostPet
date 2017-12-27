import "react-native"
import React from "react"
import HomeScreenDrawer from "../../../components/home-screen-drawer"

import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

import renderer from "react-test-renderer"

describe("HomeScreenDrawer", () => {
    const navigate = jest.fn()

    const props = {
        navigation: {
            navigate: navigate
        }
    };

    beforeEach(() => {
        wrapper = shallow(<HomeScreenDrawer {...props} />);
    });

    afterEach(() => {
        navigate.mockReset()
    });

    it("renders correctly", () => {
        expect(wrapper).toBeDefined()
        expect(toJSON(wrapper)).toMatchSnapshot();
    })

    describe("_whoWeAre", () => {
        beforeEach(() => {
            wrapper.instance()._whoWeAre()
        })

        it("navigate to WhoWeAre", () => {
            expect(navigate).toHaveBeenCalledTimes(1);
            expect(navigate).toHaveBeenCalledWith("WhoWeAre")
        })
    })

    describe("_termsAndConditions", () => {
        beforeEach(() => {
            wrapper.instance()._termsAndConditions()
        })

        it("navigate to WhoWeAre", () => {
            expect(navigate).toHaveBeenCalledTimes(1);
            expect(navigate).toHaveBeenCalledWith("TermsAndConditions")
        })
    })

    describe("_howToUse", () => {
        beforeEach(() => {
            wrapper.instance()._howToUse()
        })

        it("navigate to WhoWeAre", () => {
            expect(navigate).toHaveBeenCalledTimes(1);
            expect(navigate).toHaveBeenCalledWith("HowToUse")
        })
    })
})
