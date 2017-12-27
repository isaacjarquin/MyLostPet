import "react-native"
import React from "react"
import OperationMessage from "../../../components/operation-message"
import { shallow } from "enzyme"
import toJSON from "enzyme-to-json"

describe("OperationMessage", () => {
    beforeEach(() => {
        wrapper = shallow(<OperationMessage />)
    })

    it("renders correctly", () => {
        expect(wrapper).toBeDefined()
        expect(toJSON(wrapper)).toMatchSnapshot()
    })
})