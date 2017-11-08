import "react-native"
import React from "react"
import MissingPetForm from "../../../components/missing-pet-form"

import renderer from "react-test-renderer"

it("renders correctly", () => {
	const tree = renderer.create(
		<MissingPetForm />
	).toJSON()
	expect(tree).toMatchSnapshot()
})
