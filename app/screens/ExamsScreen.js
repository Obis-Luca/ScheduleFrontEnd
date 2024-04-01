import React, {useEffect, useState} from 'react';
import { View, Text,TextInput, TouchableOpacity, Button, Platform, ScrollView, Image, Switch } from 'react-native';
import { lightStyle, darkStyle } from '../styles/ExamPageStyle';
import { useTheme } from '../config/ThemeContext';
import Icon from "react-native-vector-icons/FontAwesome";
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Calendar, Clock, Blackboard, CustomSvgComponent, Bell, Pen, TrashCan} from '../config/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Vibration } from 'react-native';
import PushNotification from 'react-native-push-notification';
const ExamsScreen = () => {

    const { theme } = useTheme();
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [dateDisplay, setDateDisplay] = useState('Choose date');
    const [timeDisplay, setTimeDisplay] = useState('Choose time');
    const [roomNumber, setRoomNumber] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [inputText, setInputText] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [exams, setExams] = useState([]);
    const [editingExamIndex, setEditingExamIndex] = useState(null);
    const [notificationModalVisible, setNotificationModalVisible] = useState(false);


    const handleBellPress = () => {
        setNotificationModalVisible(true);
    };
    // PushNotification.configure({
    //     onNotification: function(notification) {
    //         console.log('LOCAL NOTIFICATION ==>', notification);
    //     },
    //     popInitialNotification: true,
    //     requestPermissions: true
    // });

    // const scheduleNotification = (date, message) => {
    //     PushNotification.localNotificationSchedule({
    //         message: message,
    //         date: date,
    //         allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
    //     });
    // };

    const editExam = (index) => {
        const exam = exams[index];
        setInputText(exam.name);
        setDateDisplay(exam.date);
        setTimeDisplay(exam.time);
        setEditingExamIndex(index);
        setModalVisible(true);
    };

    const deleteExam = async (index) => {
        const updatedExams = exams.filter((exam, i) => i !== index);
        setExams(updatedExams);
        await AsyncStorage.setItem('exams', JSON.stringify(updatedExams));
    };


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
            time: timeDisplay,
            room: roomNumber

        };
        let updatedExams;
        if (editingExamIndex !== null) {
            updatedExams = [...exams];
            updatedExams[editingExamIndex] = newExam;
        } else {
            updatedExams = [...exams, newExam];
        }
        setExams(updatedExams);
        setInputText('');
        setRoomNumber('');
        setDateDisplay('Choose date');
        setTimeDisplay('Choose time');
        setModalVisible(false);
        setEditingExamIndex(null);
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
                {exams.length === 0 ? (
                    // <Image
                    //     style={{ width: 200, height: 200, alignSelf: 'center' }}
                    //     source={require('../images/pngtree-pink-watercolor-brushes-171474-png-image_1733978.jpg')}
                    // />

                    // <CustomSvgComponent/>
                    <Text style={{textAlign: 'center', marginTop: 20}}>No exams added yet</Text>
                ) : (
                    exams.map((exam, index) => {
                        const renderRightActions = () => (
                            <View style={{marginRight: 10, marginTop: 10, padding: 10, backgroundColor: '#afafaf', borderTopLeftRadius: 20, borderBottomLeftRadius: 20}}>
                                <View style={{marginTop: 9}}>
                                    <View>
                                        <TouchableOpacity onPress={() => editExam(index)}>
                                             <Pen/>
                                         </TouchableOpacity>
                                    </View>

                                    <View style={{marginTop: 18}}>
                                        <TouchableOpacity onPress={() => deleteExam(index)}>
                                            <TrashCan/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        );
                        return (
                            <View style={{marginTop: 15}}>
                                <Swipeable key={index} renderRightActions={renderRightActions} friction={1} onSwipeableWillOpen={() => Vibration.vibrate([0,50])}>
                                    <View style={{marginLeft: 15,marginRight: 15, marginTop: 10, padding: 13, backgroundColor: '#ddd', borderRadius: 20}}>
                                        <Text>{exam.name}</Text>
                                        <Text>{exam.date}</Text>
                                        <Text>{exam.time}</Text>
                                        <Text>{exam.room}</Text>

                                        <TouchableOpacity onPress={handleBellPress}>
                                            <Bell/>
                                        </TouchableOpacity>
                                    </View>
                                </Swipeable>
                            </View>

                        );
                    })
                )}
            </ScrollView>

            <TouchableOpacity
                style={theme === 'dark' ? darkStyle.addButton : lightStyle.addButton}
                onPress={() => setModalVisible(true)}
            >
                <Icon name="plus" size={24} color="#fff" />
            </TouchableOpacity>

            <Modal
                isVisible={notificationModalVisible}
                onBackdropPress={() => setNotificationModalVisible(false)}
            >
                <View style={theme === 'dark' ? darkStyle.modalPopUp : lightStyle.modalPopUp}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginLeft: 120 ,transform: [{ scaleX: 1.5 }, { scaleY:1.5 }] }}>
                        <Switch
                            trackColor={{ false: "#000000", true: "#fdfdfd" }}
                            thumbColor={"#000000"}
                            ios_backgroundColor="#3e3e3e"
                            // onValueChange={}
                            // value={}
                        />
                    </View>
                </View>
            </Modal>


            <Modal
                isVisible={modalVisible}
                onBackdropPress={() => setModalVisible(false)}
            >
                <View style={theme === 'dark' ? darkStyle.modalPopUp : lightStyle.modalPopUp}>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 10, paddingLeft: 10, marginTop: 10}}
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

                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 10, paddingLeft: 10, marginTop: 20}}
                        onChangeText={text => setRoomNumber(text)}
                        placeholder={"Enter room number"}
                        value={roomNumber}
                    />
                    <View style={{marginTop: 80, alignItems: "center"}}>
                        <TouchableOpacity
                            style={{height: 40,width: 100,borderColor: 'gray', borderWidth: 1, borderRadius: 10, paddingLeft: 10, justifyContent: 'center', backgroundColor: '#479030', alignItems: "center"}}
                            onPress={() => addExam()}
                        >
                            <Text style={{color:'black', textAlign: "center",alignItems: "center"}}>{"Add exam"}</Text>

                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default ExamsScreen;