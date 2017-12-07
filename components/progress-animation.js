import React from "react"
import { StyleSheet, View, Text, Image } from "react-native"
import ProgressCircle from "react-native-progress-circle"

export default class ProgressAnimation extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
        const { progress } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.loader}>
                    <ProgressCircle
                        percent={progress}
                        radius={50}
                        borderWidth={2}
                        color="#3399FF"
                        shadowColor="#999"
                        bgColor="#fff">
                        <Image
                            source={require("../assets/images/loading.png")}
                            style={{width: 65, height: 65}}
                        />
        	</ProgressCircle>
                </View>
                <Text style={styles.progressText}>{progress}%</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        backgroundColor: "white",
        opacity: 0.9,
        width: "100%",
        top: "80%",
        paddingTop: 30,
        paddingBottom: 30
    },
    loader: {
        alignSelf: "center"
    },
    progressText: {
        marginTop: 2,
        alignSelf: "center",
        fontSize: 14
    },
})
