import React, { Component, useState, useEffect } from 'react';
import {
  View,
  Platform,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  Button
} from 'react-native';

// API CALL

export default function Calendar(props: any) {
  const setSelectedTime = props.setTime
    return (
      <View>
      <FlatList
      numColumns={7}
      data = {props.data}
      horizontal={false}
      renderItem={(test) => {
        return (
        <View style={styles.calendar}>
        <Text style={styles.jour}> {test.item.dayOfTheWeek} </Text>
        <Text style={styles.date}> {test.item.dayMonth} </Text>
        <Availabilities data={test.item.timeIntervals} setTime={setSelectedTime}/>
        </View>
        )
      }}
      />
      </View>
      )
}

function Availabilities(props: any) {
  const [useButtonColor, setButtonColor] = useState("#c2b1e3");
  return (
    <View>
    <FlatList
    data={props.data}
    horizontal={false}
    renderItem={(test) => {
      if (test.item == '-') {
        return (
          <View style={styles.optionContainer}>
            <Text style={styles.nobooking}> {test.item} </Text>
          </View>
        )
      }
      else {
        return (
          <View style={styles.optionContainer}>
          <Button title={test.item} color={useButtonColor} onPress={() => {props.setTime(test.item);}}> </Button>
          </View>
        )
      }
    }}
    >
    </FlatList>
    </View>
  )
}

const styles = StyleSheet.create({
  date: {
    backgroundColor: "white",
    borderWidth: 0,
    borderColor: "#333",
    padding: 0,
    fontSize: "10px",
    fontWeight: "bolder",
  },
  jour: {
    backgroundColor: "white",
    borderWidth: 0,
    borderBottomColor: "red",
    borderColor: "#333",
    padding: 0,
    fontSize: "10px",
  },
  nobooking: {
    backgroundColor: "white",
    borderWidth: 0,
    borderBottomColor: "red",
    borderColor: "#333",
    padding: 0,
    textAlign: "center",
  },
  calendar: {
    fontFamily: "sans-serif",
  },
  textStyle: {
    textAlign: "center"
  },
  optionContainer: {
    "height": "30px"
  },
});