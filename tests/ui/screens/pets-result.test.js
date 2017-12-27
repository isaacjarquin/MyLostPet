import "react-native"
import { ListView, ListViewDataSource } from "react-native"
import React from "react"
import PetsResult from "../../../screens/pets-result"

import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'
import renderer from "react-test-renderer"
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe("PetsResult", () => {
    const navigate = jest.fn()

    const props = {
        navigation: {
            navigate: navigate,
            state: {
                params: {
                    pets: []
                }
            }
        }
    };

    beforeEach(() => {
        wrapper = shallow(<PetsResult {...props} />);
    })

    it("renders correctly", () => {
        expect(wrapper).toBeDefined()
        expect(toJSON(wrapper)).toMatchSnapshot()
    })

    describe("onLocationFocus", ()=> {
        it("modify the state when called", () => {
            wrapper.setState({ 
                locationFocusColor: "",
                breedFocusColor: ""
            })
            wrapper.instance().onLocationFocus()
            expect(wrapper.state().locationFocusColor).toBe("white")
            expect(wrapper.state().breedFocusColor).toBe("grey");
        })
    })

    describe("onBreedFocus", () => {
        it("modify the state when called", () => {
            wrapper.setState({
                breedFocusColor: "",
                locationFocusColor: ""
            })
            wrapper.instance().onBreedFocus()
            expect(wrapper.state().breedFocusColor).toBe("white")
            expect(wrapper.state().locationFocusColor).toBe("grey");
        })
    })

    describe("setAndfilterbyCity", () => {
        it("modify the state when called", () => {
            wrapper.setState({
                breed: "",
                location: ""
            })

            wrapper.instance().setAndfilterbyCity("location")
            expect(wrapper.state().location).toBe("location")
            expect(wrapper.state().breed).toBe("");
        })
    })

    describe("setAndfilterbyBreed", () => {
        it("modify the state when called", () => {
            wrapper.setState({
                breed: "",
                location: ""
            })

            wrapper.instance().setAndfilterbyBreed("breed")
            expect(wrapper.state().location).toBe("")
            expect(wrapper.state().breed).toBe("breed");
        })
    })

    describe("filterPets", () => {
        it("returns all items when no filter is selected", () => {
            const pet = {
                location: 'Tenerife',
                breed: 'Pastor aleman'
            }
            const pet1 = {
                location: 'Las palmas',
                breed: 'pitbull'
            }
            wrapper.setState({ pets: [pet, pet1] })
            
            wrapper.instance().filterPets({ location: "", breed: "" })
            expect(wrapper.state().dataSource.getRowCount()).toBe(2)
        })

        it("returns one items when only one item match the filter", () => {
            const pet = {
                location: 'Tenerife',
                breed: 'Pastor aleman'
            }
            const pet1 = {
                location: 'Las palmas',
                breed: 'pitbull'
            }
            wrapper.setState({ pets: [pet, pet1] })

            wrapper.instance().filterPets({ location: "Las palmas", breed: "" })
            expect(wrapper.state().dataSource.getRowCount()).toBe(1)
        })

        it("returns no items when search doesnt match the filter", () => {
            const pet = {
                location: 'Tenerife',
                breed: 'Pastor aleman'
            }
            const pet1 = {
                location: 'Las palmas',
                breed: 'pitbull'
            }
            wrapper.setState({ pets: [pet, pet1] })

            wrapper.instance().filterPets({ location: "Las palmas", breed: "Pastor aleman" })
            expect(wrapper.state().dataSource.getRowCount()).toBe(0)
        })
    })
})
