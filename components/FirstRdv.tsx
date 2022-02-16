import React, { Component, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  CheckBox,
  ViewPropTypes,
} from 'react-native';


export default function FirstRdv(props: any) {
    return (
        <View>
          <Text style={styles.questionText}> Is this your first appointment with this practitioner?
          </Text>
          <Appointment style={styles.container} useState={props.useState}></Appointment>
        </View> 
    )
};


// to algin you need parent to have "inline-block" and children to be float

function Appointment(props: any) {
    const [useSelection, setSelection] = props.useState
    const updateYesClick = () => setSelection(true)
    const updateNoClick = () => setSelection(false)
    return (
        <View style={styles.container}>
            <View style={[styles.smallContainer, {"float": "left"}]}>
                <View style={[styles.smallerContainer]}>
                    <CheckBox style={[styles.checkBoxStyle, {"float": "left"}]}
                        value={useSelection? true:false}
                        onClick={updateYesClick}
                        >
                    </CheckBox>
                    <Text style={[]}> Yes </Text>
                </View>
            </View>
            <View style={[styles.smallContainer, {"float": "left"}]}>
                <View style={[styles.smallerContainer]}>
                    <CheckBox style={[styles.checkBoxStyle, {"float": "left"}]}
                        value={useSelection? false:true}
                        onClick={updateNoClick}
                    ></CheckBox>
                    <Text style={[]}> No </Text>
            </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "inline-block",
        minWidth: "150px",
    },
    smallContainer: {
        padding: "3px",
        display: "inline-block",
        borderWidth: 1,
        minWidth: "150px",
    },
    smallerContainer: {
        //paddingLeft: "150px"
        display: "inline-block",
        //display: "flex",
        margin: "auto",
        minWidth: "150px",
        marginLeft: "10px",
    },
    checkBoxStyle: {
        //borderRadius: "50%",
        //border: "2px solid #7f5bc2",
        //width: "16px",
        //height: "16px",
        //marginTop: "-8px",
        //top: "50%",
        //position: "absolute",
        //content: "",
    },
    questionText: {
        marginBottom: "5px",
        fontFamily: "Roboto,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
    },
})