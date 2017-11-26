import "react-native"
import React from "react"
import SecondaryMenyModal from "../../../components/secondary-menu-modal"

import renderer from "react-test-renderer"

it("renders correctly", () => {
	const tree = renderer.create(
		<SecondaryMenyModal />
	).toJSON()
	expect(tree).toMatchSnapshot()
})
