import React from 'react';
import { View, Text } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';

import Home from './screens/home'
import SearchResultPage from './screens/search-result-page'
import searchForm from './components/home/search-form'

const App = StackNavigator({
  Home: { screen: Home },
  SearchForm: { screen: searchForm },
  SearchResultPage: { screen: SearchResultPage },
});

module.exports = App
