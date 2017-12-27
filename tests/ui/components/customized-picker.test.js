import "react-native"
import React from "react"
import SecondaryMenuModal from "../../../components/customized-picker"
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

import renderer from "react-test-renderer"

describe("SecondaryMenuModal", () => {
    const navigate = jest.fn()

    const props = {
        handler: jest.fn(),
        hidePetTypeModal: jest.fn(),
        items: []
    };

    beforeEach(() => {
        wrapper = shallow(<SecondaryMenuModal {...props} />);
    });

    it("renders correctly", () => {
        expect(wrapper).toBeDefined()
        expect(toJSON(wrapper)).toMatchSnapshot();
    })

    describe("handleSelected", () => {
        beforeEach(() => {
            wrapper.instance().handleSelected()
        })

        it("navigate to MissingPetForm", () => {
            expect(props.handler).toHaveBeenCalledTimes(1)
            expect(props.hidePetTypeModal).toHaveBeenCalledTimes(1)
            expect(props.handler).toHaveBeenCalledWith("")
        })
    })
})