import React, { Component, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Picker,
} from 'react-native';

export default function DrowpDown(props: any) {
    //const [selectedValue, setSelectedValue] = props.useState;
    const [selectedValue, setSelectedValue] = props.useState;
    return (
        <View>
            <Text style={styles.text}> What is the reason of your visit? </Text>
            <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => {
                    setSelectedValue(itemValue);
                }}
                >
                <Picker.Item label="Technical Assessement" value="technical" />
                <Picker.Item label="Cultural Fit" value="cultural" />
                <Picker.Item label="Introduction Call" value="introduction" />
            </Picker>
        </View>
    )
}


const styles = StyleSheet.create({
    text: {
        float: "left",
        marginBottom: "5px",
    }
})