import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class SearchResultPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <Text>Aqui va el resultado de las busqueda</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});
