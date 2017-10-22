import React from 'react';
import { StyleSheet, Text, View, ListView } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements'
import PetCard from '../components/pet-card'

export default class SearchResultPage extends React.Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const { pets } = props.navigation.state.params;

    this.state = {
      dataSource: ds.cloneWithRows(pets),
    };
  }

  renderRow (rowData, sectionID) {
    const cardTitleWithBreed = `${rowData.kind}, de raza ${rowData.breed}`
    const cardTitle = rowData.breed ? cardTitleWithBreed : rowData.kind
    const cardSubtitle = `Encontrado en ${rowData.location}, el ${rowData.date}. ${rowData.info}`

    return (
      <ListItem
        roundAvatar
        key={sectionID}
        title={cardTitle}
        subtitle={cardSubtitle}
        subtitleNumberOfLines={2}
        avatar={{uri:rowData.image}}
        avatarStyle={{width: 55, height: 55, marginTop: 20, marginRight: 20, marginLeft: 20}}
        containerStyle={{marginLeft: 10}}
        titleContainerStyle={{marginLeft: 10}}
        subtitleContainerStyle={{marginLeft: 10}}
      />
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <List>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
          />
        </List>
        <View style={styles.searchBarGroup}>
          <SearchBar
          round
          placeholder='Ciudad/Municipio...' />
          <SearchBar
          round
          placeholder='Raza...' />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  searchBarGroup: {
    marginTop: 10
  }
});
