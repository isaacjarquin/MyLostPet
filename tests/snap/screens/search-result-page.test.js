import 'react-native'
import React from 'react'
import SearchResultPage from '../../../screens/search-result-page'

import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const pet = {name: 'name'}
  const navigation = {
    state: {
      params: {
        pets: [pet]
      }
    }
  }

  const tree = renderer.create(
    <SearchResultPage navigation={navigation} />
    ).toJSON()
  expect(tree).toMatchSnapshot()
})
