import React, {useEffect, useState} from 'react';
import { View, Text,TextInput, TouchableOpacity, Button, Platform, ScrollView } from 'react-native';
import { lightStyle, darkStyle } from '../styles/ExamPageStyle';
import { useTheme } from '../config/ThemeContext';
import Icon from "react-native-vector-icons/FontAwesome";
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar, Clock } from '../config/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExamsScreen = () => {

    const { theme } = useTheme();
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [dateDisplay, setDateDisplay] = useState('Choose date');
    const [timeDisplay, setTimeDisplay] = useState('Choose time');
    const [modalVisible, setModalVisible] = useState(false);
    const [inputText, setInputText] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [exams, setExams] = useState([]);

    useEffect(() => {
        const loadExams = async () => {
            const savedExams = await AsyncStorage.getItem('exams');
            if (savedExams !== null) {
                setExams(JSON.parse(savedExams));
            }
        };
        loadExams();
    }, []);


    const addExam = async () => {
        const newExam = {
            name: inputText,
            date: dateDisplay,
            time: timeDisplay
        };
        const updatedExams = [...exams, newExam];
        setExams(updatedExams);
        setInputText('');
        setDateDisplay('Choose date');
        setTimeDisplay('Choose time');
        setModalVisible(false);
        await AsyncStorage.setItem('exams', JSON.stringify(updatedExams)); // Save exams to AsyncStorage
    };
    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
        setDateDisplay(currentDate.toLocaleDateString());
    };

    const onChangeTime = (event, selectedTime) => {
        const currentTime = selectedTime || time;
        setShowTimePicker(Platform.OS === 'ios');
        setTime(currentTime);
        setTimeDisplay(currentTime.toLocaleTimeString());
    };

    return(
        <View style={{flex:1}}>
            <ScrollView>
                {exams.map((exam, index) => (
                    <View key={index} style={{margin: 10, padding: 10, backgroundColor: '#ddd', borderRadius: 10}}>
                        <Text>{exam.name}</Text>
                        <Text>{exam.date}</Text>
                        <Text>{exam.time}</Text>
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity
                style={theme === 'dark' ? darkStyle.addButton : lightStyle.addButton}
                onPress={() => setModalVisible(true)}
            >
                <Icon name="plus" size={24} color="#fff" />
            </TouchableOpacity>

            <Modal
                isVisible={modalVisible}
                onBackdropPress={() => setModalVisible(false)}
            >
                <View style={theme === 'dark' ? darkStyle.modalPopUp : lightStyle.modalPopUp}>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 10, paddingLeft: 10}}
                        onChangeText={text => setInputText(text)}
                        placeholder={"Enter exam name"}
                        value={inputText}
                    />
                    <View style={{flexDirection: "row",  marginTop:20}}>

                        <TouchableOpacity
                            style={{height: 40,width: 250,borderColor: 'gray', borderWidth: 1, borderRadius: 10, paddingLeft: 10, justifyContent: 'center'}}
                            onPress={() => setShowDatePicker(true)}

                        >
                            <Text>{dateDisplay}</Text>
                        </TouchableOpacity>
                        <View style={{marginLeft: 20}}>
                            <Calendar/>
                        </View>

                    </View>

                    {showDatePicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={onChangeDate}
                        />
                    )}

                    <View style={{flexDirection: "row",  marginTop:20}}>

                        <TouchableOpacity
                            style={{height: 40,width:250, borderColor: 'gray', borderWidth: 1, borderRadius: 10, paddingLeft: 10, justifyContent: 'center'}}
                            onPress={() => setShowTimePicker(true)}
                        >
                            <Text>{timeDisplay}</Text>
                    </TouchableOpacity>
                        <View style={{marginLeft: 20}}>
                            <Clock/>
                        </View>
                    </View>
                    {showTimePicker && (
                        <DateTimePicker
                            value={time}
                            mode="time"
                            display="default"
                            onChange={onChangeTime}
                        />
                    )}
                    <View style={{marginTop: 120, alignItems: "center"}}>
                        <TouchableOpacity
                            style={{height: 40,width: 100,borderColor: 'gray', borderWidth: 1, borderRadius: 10, paddingLeft: 10, justifyContent: 'center', backgroundColor: '#479030', alignItems: "center"}}
                            onPress={() => addExam()}
                        >
                            <Text style={{color:'black', textAlign: "center"}}>{"Add exam"}</Text>

                        </TouchableOpacity>
                    </View>

                </View>



            </Modal>
        </View>
    );
}

export default ExamsScreen;