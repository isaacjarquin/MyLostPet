import "react-native"
import React from "react"
import ContactDetails from "../../../components/contact-details"

import renderer from "react-test-renderer"

it("renders correctly", () => {
	const tree = renderer.create(
		<ContactDetails />
	).toJSON()
	expect(tree).toMatchSnapshot()
})
