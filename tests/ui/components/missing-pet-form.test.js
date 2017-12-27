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
})
