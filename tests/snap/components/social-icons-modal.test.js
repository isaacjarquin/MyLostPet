import "react-native"
import React from "react"
import SocialIconsModal from "../../../components/social-icons-modal"

import renderer from "react-test-renderer"

it("renders correctly", () => {
	const tree = renderer.create(
		<SocialIconsModal />
	).toJSON()
	expect(tree).toMatchSnapshot()
})
