import React, {useEffect, useState} from 'react';
import { View, Text,TextInput, TouchableOpacity, Button, Platform, ScrollView, Image, Switch } from 'react-native';
import { lightStyle, darkStyle } from '../styles/ExamPageStyle';
import { useTheme } from '../config/ThemeContext';
import Icon from "react-native-vector-icons/FontAwesome";
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Calendar, Clock, Blackboard, CustomSvgComponent, Bell, Pen, TrashCan, LocationPin} from '../config/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Vibration } from 'react-native';
// import PushNotification from 'react-native-push-notification';
import Animated, {FadeInDown, FadeInRight} from "react-native-reanimated";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import PushNotification from "react-native-push-notification";
import * as Notifications from 'expo-notifications';
import { LanguageProvider } from '../config/LanguageContext';
import {useTranslation} from "react-i18next";

const ExamsScreen = () => {

    const { t } = useTranslation(); // Access t function for translation
    const { theme } = useTheme();
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [dateDisplay, setDateDisplay] = useState(t('Alege data'));
    const [timeDisplay, setTimeDisplay] = useState(t('Alege ora'));
    const [roomNumber, setRoomNumber] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [inputText, setInputText] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [exams, setExams] = useState([]);
    const [editingExamIndex, setEditingExamIndex] = useState(null);
    const [notificationModalVisible, setNotificationModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);



    const [inputTextError, setInputTextError] = useState('');
    const [dateDisplayError, setDateDisplayError] = useState('');
    const [timeDisplayError, setTimeDisplayError] = useState('');
    const [roomNumberError, setRoomNumberError] = useState('');

    // const swipeableRef = exams.map(() => React.useRef(null));


    const validateFields = () => {
        let isValid = true;

        if (inputText.trim() === '') {
            setInputTextError('Please enter the exam name.');
            isValid = false;
        } else {
            setInputTextError('');
        }

        if (dateDisplay === 'Alege data' || dateDisplay === 'Choose date') {
            setDateDisplayError('Please select a date.');
            isValid = false;
        } else {
            setDateDisplayError('');
        }

        if (timeDisplay === 'Alege ora' || timeDisplay === 'Choose time') {
            setTimeDisplayError('Please select a time.');
            isValid = false;
        } else {
            setTimeDisplayError('');
        }

        if (roomNumber.trim() === '') {
            setRoomNumberError('Please enter the room number.');
            isValid = false;
        } else {
            setRoomNumberError('');
        }

        return isValid;
    };


    const handleBellPress = () => {
        setNotificationModalVisible(true);
    };


    const openEditModal = (index) => {
        const exam = exams[index];
        setInputText(exam.name);
        setDateDisplay(exam.date);
        setTimeDisplay(exam.time);
        setRoomNumber(exam.room);
        setEditingExamIndex(index);
        setEditModalVisible(true);
    };

    const updateExam = async () => {
        if (validateFields()) {
            const updatedExam = {
                id: exams[editingExamIndex].id,  // Keep the same id
                name: inputText,
                date: dateDisplay,
                time: timeDisplay,
                room: roomNumber
            };
            let updatedExams = [...exams];
            updatedExams[editingExamIndex] = updatedExam;
            setExams(updatedExams);
            setInputText('');
            setRoomNumber('');
            setDateDisplay('Choose date');
            setTimeDisplay('Choose time');
            setEditModalVisible(false);
            setEditingExamIndex(null);
            await AsyncStorage.setItem('exams', JSON.stringify(updatedExams)); // Save exams to AsyncStorage
        }
        // swipeableRef[editingExamIndex].current.close();

    };

    const editExam = (index) => {
        const exam = exams[index];
        setInputText(exam.name);
        setDateDisplay(exam.date);
        setTimeDisplay(exam.time);
        setRoomNumber(exam.room);
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
        if (validateFields()) {
            const newExam = {
                id: Math.random().toString(),  // Add a unique id
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
        }
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

    const [isSwitchOn, setIsSwitchOn] = useState(false); // Add this line at the top of your component

    useEffect(() => {
        Notifications.requestPermissionsAsync();
    }, []);

     useEffect(() => {
        const subscription = Notifications.addNotificationReceivedListener(notification => {
            console.log(notification);
        });

        return () => subscription.remove();
    }, []);

    const handleNotification = () => {
        // Parse the date and time strings to create a Date object representing the exam time
        const examDateTime = new Date(`${date}T${time}`);

        // Subtract 1 minute from the exam time
        examDateTime.setMinutes(examDateTime.getMinutes() - 1);

        Notifications.scheduleNotificationAsync({
            content: {
                title: "Your exam is coming up!",
                body: 'Exam starts in 1 minute.',
            },
            trigger: examDateTime,
        });
    };

    return(
        <View style={{flex:1, backgroundColor: theme === 'dark' ?  '#000000':'#FFFFFF'}}>
            <ScrollView>
                {exams.length === 0 ? (
                    // <Animated.View entering = {FadeInDown.duration(500).springify()}>
                        <Animated.View entering = {FadeInDown.duration(800).springify()}>

                            <Image
                                style={{ width: 170, height: 170, alignSelf: 'center' , marginTop: 220, justifyContent: "center"}}
                                source={require('../images/blackboard-svgrepo-com.png')}
                            />
                            <Text style={{textAlign: "center",alignItems: "center", marginTop: 20, fontSize: 20, fontWeight: "bold", color:  theme === 'dark' ?  '#FFFFFF': '#000000'}}>{t("mesajExamScreen")}</Text>
                        </Animated.View>

                ) : (
                    exams.map((exam, index) => {

                        const renderRightActions = () => (
                            // <Animated.View entering = {FadeInRight.duration(2000).springify(200)}>
                                <View style={{marginRight: 10, marginTop: 10, padding: 10, backgroundColor  : theme === 'dark' ? '#012A4A' :'#A9D6E5', borderTopLeftRadius: 20, borderBottomLeftRadius: 20}}>
                                    <View style={{marginTop: 9}}>
                                        <View>
                                            <TouchableOpacity onPress={() => openEditModal(index)}>
                                                <Pen/>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{marginTop:40}}>
                                            <TouchableOpacity onPress={() => deleteExam(index)}>
                                                <TrashCan/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                            // </Animated.View>

                        );

                        return (
                            <View style={{marginTop: 15}} key = {exam.id}>
                                <Swipeable key={exam.id}  renderRightActions={renderRightActions} friction={1} onSwipeableWillOpen={() => Vibration.vibrate([0,50])}>
                                    <View style={{marginLeft: 15,marginRight: 15, marginTop: 10, padding: 13, backgroundColor  : theme === 'dark' ? '#012A4A' :'#89C2D9',  borderRadius: 20}}>
                                        <View style={{margin: 2,padding: 10 ,backgroundColor  : theme === 'dark' ? '#013A63' :'#A9D6E5', borderRadius: 20}}>
                                            <Text style={{marginLeft:3 ,fontSize: 16,color: theme === 'dark' ? '#FFFFFF' :'#000000',fontWeight:"bold"}}>{exam.name}</Text>
                                        </View>

                                        <View style={{flexDirection: "row", marginLeft: 10, marginTop: 10,color: theme === 'dark' ? '#FFFFFF' :'#000000',}}>
                                            <MaterialCommunityIcons name="calendar-clock" size={25} style={{marginRight: 10}} />
                                            <Text style={{marginRight: 10, marginTop: 5, color: theme === 'dark' ? '#FFFFFF' :'#000000',}}>{exam.date}</Text>
                                            <Text  style={{marginRight: 10, marginTop: 5, color: theme === 'dark' ? '#FFFFFF' :'#000000',}}>{exam.time}</Text>
                                            {/*<TouchableOpacity style={{marginRight: 10, marginLeft: 18}}  onPress={handleBellPress}>*/}
                                            {/*    <Bell/>*/}
                                            {/*</TouchableOpacity>*/}
                                        </View>

                                        <View style={{flexDirection: "row", marginLeft: 10, marginTop: 10,color: theme === 'dark' ? '#FFFFFF' :'#000000',}}>
                                            <MaterialCommunityIcons name="map-marker" size={25} style={{marginRight: 10}} />
                                            <Text  style={{marginRight: 10, marginTop: 5, color: theme === 'dark' ? '#FFFFFF' :'#000000',}}>{exam.room}</Text>

                                            <TouchableOpacity style={{marginRight: 10, marginLeft: 18}}  onPress={handleBellPress}>
                                                    <Text style={{marginRight: 10, marginTop: 5, color: theme === 'dark' ? '#FFFFFF' :'#000000',}}>{exam.date}</Text>
                                                    <Text  style={{marginRight: 10, marginTop: 5, color: theme === 'dark' ? '#FFFFFF' :'#000000',}}>{exam.time}</Text>
                                                    <Text  style={{marginRight: 10, marginTop: 5, color: theme === 'dark' ? '#FFFFFF' :'#000000',}}>{exam.room}</Text>
                                            <TouchableOpacity style={{float: 'right',}}  onPress={handleBellPress}>
                                                <Bell/>
                                            </TouchableOpacity>
                                        </View>



                                    </View>
                                </Swipeable>
                            </View>

                        );
                    })
                )}
            </ScrollView>

            <Modal
                isVisible={editModalVisible}
                onBackdropPress={() => setEditModalVisible(false)}
            >
                <View style={theme === 'dark' ? darkStyle.modalPopUp : lightStyle.modalPopUp}>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 10, paddingLeft: 10, marginTop: 10}}
                        onChangeText={text => setInputText(text)}
                        placeholder={t("Introdu numele examenului")}
                        value={inputText}
                    />
                    {/*<Text style={{color: 'red'}}>{inputTextError}</Text>*/}

                    <View style={{flexDirection: "row",  marginTop:20}}>

                        <TouchableOpacity
                            style={{height: 40,width: 250,borderColor: 'gray', borderWidth: 1, borderRadius: 10, paddingLeft: 10, justifyContent: 'center'}}
                            onPress={() => setShowDatePicker(true)}

                        >
                            <Text>{dateDisplay}</Text>
                        </TouchableOpacity>

                        <View style={{marginLeft: 15}}>
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
                        <View style={{marginLeft: 15}}>
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
                    {/*<View style={{flexDirection: "row",  marginTop:20}}>*/}
                    <View style={{flexDirection: "row", marginTop: 20}}>
                        <TextInput
                            style={{height: 40,width:250, borderColor: 'gray', borderWidth: 1, borderRadius: 10, paddingLeft: 10, justifyContent: 'center'}}
                            onChangeText={text => setRoomNumber(text)}
                            placeholder={t("Introdu locatia")}
                            value={roomNumber}
                        />
                        <View style={{marginLeft: 15}}>
                            <LocationPin/>
                        </View>

                    </View>

                    {/*<View/>*/}
                    <View style={{marginTop: 80, alignItems: "center"}}>
                        <TouchableOpacity
                            style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1, borderRadius: 10, backgroundColor: '#417B5A', justifyContent: 'center', alignItems: 'center'}}
                            onPress={() => updateExam()}
                        >
                            <Text style={{color:'black', textAlign: "center"}}>{t("Update exam")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

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
                <View style={theme === 'dark' ? darkStyle.modalNotificationPopUp : lightStyle.modalNotificationPopUp}>
                    <Button title={"Set notification"} onPress={handleNotification}/>
                    {/*<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginLeft: 60 ,transform: [{ scaleX: 1.5 }, { scaleY:1.5 }] }}>*/}
                    {/*    <Switch*/}
                    {/*        trackColor={{ false: "#000000", true: "#fdfdfd" }}*/}
                    {/*        thumbColor={"#000000"}*/}
                    {/*        ios_backgroundColor="#3e3e3e"*/}
                    {/*        onValueChange={handleNotification()}*/}
                    {/*        value={isSwitchOn} // Add this line*/}

                    {/*    />*/}
                    {/*</View>*/}
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
                        placeholder={t("Introdu numele examenului")}
                        value={inputText}
                    />

                    <View style={{flexDirection: "row",  marginTop:20}}>

                        <TouchableOpacity
                            style={{height: 40,width: 250,borderColor: 'gray', borderWidth: 1, borderRadius: 10, paddingLeft: 10, justifyContent: 'center'}}
                            onPress={() => setShowDatePicker(true)}

                        >
                            <Text>{dateDisplay}</Text>
                        </TouchableOpacity>

                        <View style={{marginLeft: 15}}>
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
                        <View style={{marginLeft: 15}}>
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
                    <View style={{flexDirection: "row", marginTop: 20}}>
                        <TextInput
                            style={{height: 40,width:250, borderColor: 'gray', borderWidth: 1, borderRadius: 10, paddingLeft: 10, justifyContent: 'center'}}
                            onChangeText={text => setRoomNumber(text)}
                            placeholder={t("Introdu locatia")}
                            value={roomNumber}
                        />
                        <View style={{marginLeft: 15}}>
                            <LocationPin/>
                        </View>

                    </View>

                    {/*<View/>*/}
                    <View style={{marginTop: 80, alignItems: "center"}}>
                        <TouchableOpacity
                            style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1, borderRadius: 10, backgroundColor: '#417B5A', justifyContent: 'center', alignItems: 'center'}}
                            onPress={() => addExam()}
                        >
                            <Text style={{color:'black', textAlign: "center"}}>{t("Adauga examen")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default ExamsScreen;