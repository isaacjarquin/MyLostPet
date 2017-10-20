import React from 'react';
import { StyleSheet, Text, View, ListView } from 'react-native';
import PetCard from '../components/pet-card'
import { Grid, Row } from 'react-native-elements'

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
        <Grid>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(pet) => <Row><PetCard {...pet} /></Row>}
          />
        </Grid>
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
