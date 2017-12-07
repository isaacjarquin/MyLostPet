import "react-native"
import React from "react"
import PetCard from "../../../components/pet-card"

import renderer from "react-test-renderer"

it("renders correctly", () => {
    const navigation = {
        state: {
            params: {
                pet: {
                    kind: "kind",
                    info: "info",
                    image: "image",
                    location: "location",
                    date: "date",
                    breed: "breed"
                }
            }
        }
    }

    const tree = renderer.create(
        <PetCard navigation={navigation} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
})
