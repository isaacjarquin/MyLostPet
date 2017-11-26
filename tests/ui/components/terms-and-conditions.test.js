import "react-native"
import React from "react"
import TermsAndConditions from "../../../components/terms-and-conditions"

import renderer from "react-test-renderer"

it("renders correctly", () => {
	const tree = renderer.create(
		<TermsAndConditions />
	).toJSON()
	expect(tree).toMatchSnapshot()
})
