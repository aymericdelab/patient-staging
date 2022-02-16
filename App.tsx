import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { useSetState } from 'react-use';
import Constants from 'expo-constants';

// or any pure javascript modules available in npm
import Calendar from './components/Calendar'
import FirstRdv from './components/FirstRdv';
import DropDown from './components/DropDown';

import getAgenda, {defaultQueryArgs, motiveIdDict} from './network/calendarAPI'

export default function App() {

    // use state to define getter and setter for calendar data
    const [useAgenda, setAgenda] = React.useState([{"dayOfTheWeek": "", "day": "", "timeIntervals": ['']}])

    // use state to define and use selected time by the user
    const [useSelectedTime, setSelectedTime] = React.useState('')

    // message to display
    const [useMsg, setMsg] = React.useState('')

    // callback when user is confirming time of appointment
    const createAppointmentMsg = () => {
        setMsg(`${useFirstRdv? "First": "Not First"} ${useReason} appointment booked for ${useSelectedTime}`)
    }

    // define and use the query based on the user inputs
    const [useReason, setReason] = React.useState('cultural'); 
    const [useFirstRdv, setFirstRdv] = React.useState(true);

    // start with default arguments to show calendar
    let query = defaultQueryArgs;

    //const setQuery
    const setQuery = (query: any, reason: string, first: boolean) => {
      query['is_new_patient'] = first;
      if (reason == 'technical') {
        query['motive_id'] = '61eea350ddf6c500149ae2cb'
      }
      else {
        if (reason == 'cultural') {
          query['motive_id'] = '61eea367ddf6c500149ae2cc'

        }
        else {
          query['motive_id'] = '61379ba159d4940022b6c929'
        }
      }
      return query
    }

    React.useEffect(() => {
     query = setQuery(query, useReason, useFirstRdv)
    }, [useReason, useFirstRdv])

    // use effect to avoid calling api at each render 
    React.useEffect(() => {
      //setAgenda(data)
      getAgenda(query).then((response: any) => {setAgenda(response); console.log(response)})
    }, [query]);

  return (
    <View style={styles.bigContainer}>
      <View style={styles.smallContainer}>
        <View style={styles.smallerContainer}>
          <Text style={styles.header}> Find availability </Text>
        </View> 
        <View style={styles.smallerContainer}>
          <FirstRdv useState={[useFirstRdv, setFirstRdv]}></FirstRdv>
        </View> 
        <View style={styles.smallerContainer}>
          <DropDown useState={[useReason, setReason]}></DropDown>
        </View> 
        <View style={styles.smallerContainer}>
          <Calendar data={useAgenda} setTime={setSelectedTime}></Calendar>
        </View> 
        <View style={styles.smallerContainer}>
          <Button title={'Book Appointment'} color="#3B3B3B" onPress={() => createAppointmentMsg()}/>
        </View>
        <View style={styles.smallerContainer}>
          <Text> {useMsg} </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bigContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#FCF7F2',
    padding: 8,
  },
  smallContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#FFFFFF',
    padding: 8,
  },
  smallerContainer: {
    marginBottom: "20px",
  },
  header: {
    marginTop: "20px",
    fontSize: "28px",
    lineHeight: "33px",
    letterSpacing: "0.32px",
    fontFamily: "Roboto,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif",
    fontWeight: 500,
    color: "#814a58"
  },
});
