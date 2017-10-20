import React from 'react';
import { StyleSheet, Text, View, ListView } from 'react-native';

export default class SearchResultPage extends React.Component {
  constructor(props) {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const { pets } = props.navigation.state.params;

    this.state = {
      dataSource: ds.cloneWithRows(pets),
    };
  }
  render() {
    return (
      <View style={styles.container}>
          <Text>Aqui va el resultado de las busqueda</Text>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={(pet) => <Text>{pet.name}</Text>}
            />
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
