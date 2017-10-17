import React from 'react';
import { View, Text } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';

import Home from './screens/home'
import searchForm from './screens/search-form'

const App = StackNavigator({
  Home: { screen: Home },
  SearchForm: { screen: searchForm },
});

module.exports = App
