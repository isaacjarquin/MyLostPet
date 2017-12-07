import "react-native"
import React from "react"
import ContactDetailsModal from "../../../components/contact-details-modal"

import renderer from "react-test-renderer"

it("renders correctly", () => {
    const tree = renderer.create(
        <ContactDetailsModal />
    ).toJSON()
    expect(tree).toMatchSnapshot()
})
