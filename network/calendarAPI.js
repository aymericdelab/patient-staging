var fetch = require("node-fetch");

const FormatHourMinutes = (time) => {
    const newMinutes = (time.getMinutes() < 10? '0':'') + time.getMinutes().toString()
    const formattedTime = time.getHours().toString() + ':' + newMinutes
    return formattedTime
}

const determineInterval = (startTime, endTime) => {
    let timeIntervalsArray = [];
    while(startTime < endTime) {
        timeIntervalsArray.push(FormatHourMinutes(startTime));
        startTime.setMinutes(startTime.getMinutes() + 30);
    }
    return timeIntervalsArray;
}

const padIntervals = (responseArray) => {
    // function to pad the time intervals so that 
    //all the intervals have the same size as the biggest one

    // define the max lenght of the time intervals
    let maxLenght = 0;
    for (let i=0; i<responseArray.length; i++) {
        const intervalLength = responseArray[i].timeIntervals.length;
        if (intervalLength > maxLenght) {
            maxLenght = intervalLength;
        }
    }
    // add '-' to all the intervals lower than max length
    for (let i=0; i<responseArray.length; i++) {
        while(responseArray[i].timeIntervals.length < maxLenght) {
            responseArray[i].timeIntervals.push('-')
        }
    }
    return responseArray
}


const parseTime = (time) => {
    return new Date((Date.parse(time)));
}

const formatDayOfTheWeekDict = {
    1: "MO",
    2: "TU",
    3: "WE",
    4: "TH",
    5: "FR",
    6: "SA",
    7: "SU",
}

const formatMonthDict = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
}

const processDates = (response) => {
    let newArray = [];
    for (let i=0; i<response.length; i++) {
        const startTime = parseTime(response[i]['startAt'])
        const endTime = parseTime(response[i]['endAt'])
        newArray.push({
            'day': response[i]['day'],
            'month': response[i]['month'],
            'year': response[i]['year'],
            'dayOfTheWeek': formatDayOfTheWeekDict[response[i]['dayOfTheWeek']],
            'dayMonth': formatMonthDict[response[i]['month']] + ' ' + response[i]['day'],
            'start': startTime,
            'end': endTime,
            'timeIntervals': determineInterval(startTime, endTime)
        })
    };
    newArray
    return newArray;
}

export const motiveIdDict = {
    'technical' : '61eea350ddf6c500149ae2cb',
    'cultural' : '61eea367ddf6c500149ae2cc',
    'introduction' : '61379ba159d4940022b6c929',
}


export const defaultQueryArgs = {
    "from": '2022-02-15T23:00:00.000Z',
    "to": '2022-02-24T23:00:00.000Z',
    "is_new_patient": "true",
    "motive_id": motiveIdDict['technical'],
}

export default function getAgenda(queryArgs) {
    const query = `https://staging-api.rosa.be/api/availabilities?from=${queryArgs['from']}&to=${queryArgs['to']}&motive_id=${queryArgs['motive_id']}&is_new_patient=${queryArgs['is_new_patient']}&calendar_ids=61379ba159d4940022b6c928&state=open`
    return fetch(query)
    .then((response) => response.json())
    .then((json) => processDates(json))
    .then((processedJson) => padIntervals(processedJson))
    .catch((error) => {
        console.log(error);
    });
};
