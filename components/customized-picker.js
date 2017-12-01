import React from "react"
import { StyleSheet, Text, View, TouchableOpacity, Picker } from "react-native"
import Modal from "react-native-modal"
import { Icon } from "react-native-elements"

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
		this.props.hidePetTypeModal()
	}

	render () {
		const { items } = this.props

		return (
			<View style={styles.container}>
				<Modal isVisible={this.props.isVisible} style={styles.modalContainer}>
					<TouchableOpacity style={styles.share} onPress={() => this.props.hidePetTypeModal()} >
  	          <Icon color='grey' type="MaterialIcons" name="keyboard-arrow-down" size={30} />
  					</TouchableOpacity>

					<Picker
						style={{borderRadius: 10, borderWidth: 1, borderColor: "grey", margin: 10}}
  					  selectedValue={this.state.itemSelected}
  					  onValueChange={(itemValue) => this.setState({itemSelected: itemValue})}
  						>
						{items.map((item) => <Picker.Item label={item.value} value={item.value} key={item.id}/>)}
  					</Picker>

  					<TouchableOpacity style={styles.submitButton} onPress={this.handleSelected} >
  						<Text style={styles.searchButtonText}>Confirmar</Text>
  					</TouchableOpacity>
				</Modal>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start"
	},
	modalContainer: {
		backgroundColor: "white",
		marginTop: "75%"
	},
	optionListStyle: {
		backgroundColor: "white",
		borderColor: "black",
		width: "65%",
		borderRadius: 10
	},
	submitButton: {
		backgroundColor: "grey",
		padding: 20,
		margin: 10,
		borderRadius: 10
	},
	searchButtonText: {
		alignSelf: "center",
		color: "white"
	}
})
