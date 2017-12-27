import "react-native"
import React from "react"
import ProgressAnimation from "../../../components/progress-animation"
import { shallow } from "enzyme"
import toJSON from "enzyme-to-json"

describe("ProgressAnimation", () => {
    beforeEach(() => {
        wrapper = shallow(<ProgressAnimation />)
    })

    it("renders correctly", () => {
        expect(wrapper).toBeDefined()
        expect(toJSON(wrapper)).toMatchSnapshot()
    })
})