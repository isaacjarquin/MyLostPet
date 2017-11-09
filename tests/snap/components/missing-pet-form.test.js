import "react-native"
import React from "react"
import MissingPetForm from "../../../components/missing-pet-form"
import renderer from "react-test-renderer"

it("renders correctly", () => {
	const now = new Date("12-01-2017")
	const tree = renderer.create(<MissingPetForm date={now} />).toJSON()
	expect(tree).toMatchSnapshot()
})
