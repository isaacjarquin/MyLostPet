import React from "react"
import { StyleSheet, Text, View, TouchableOpacity, Picker } from "react-native"
import Modal from "react-native-modal"
import bodyParamsBuilder from "../utils/http-request.js"
import { get } from "../services/items-api"
import locations from "../data/locations"
import { Icon } from "react-native-elements"
import {Select, Option} from "react-native-chooser"

export default class SecondaryMenuModal extends React.Component {
  constructor (props) {
		super(props)

    this.handleSelected = this.handleSelected.bind(this)

    this.state = {
      itemSelected: ""
    }
	}

  handleSelected () {
    this.props.handler(this.state.itemSelected)
  }

	render () {
    const { items } = this.props

		return (
			<View style={styles.container}>
          <Picker
					  selectedValue={this.state.itemSelected}
					  onValueChange={(itemValue, itemIndex) => this.setState({itemSelected: itemValue})}
						>
            {items.map((item) => <Picker.Item label={item.value} value={item.value} key={item.id}/>)}
					</Picker>

					<TouchableOpacity style={styles.submitButton} onPress={this.handleSelected} >
						<Text style={styles.searchButtonText}>Confirmar</Text>
					</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start"
	},
  optionListStyle: {
		backgroundColor: "white",
		borderColor: "black",
		width: "65%",
		borderRadius: 10
	},
  submitButton: {
    width: "100%",
    backgroundColor: "grey",
    padding: 20
  },
  searchButtonText: {
    alignSelf: "center"
  }
})
