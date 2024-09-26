import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Button, Platform, ScrollView, Image, Switch } from "react-native";
import { lightStyle, darkStyle } from "../styles/ExamPageStyle";
import { useTheme } from "../context/ThemeContext";
import Icon from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar, Clock, Pen, TrashCan, LocationPin } from "../constants/Icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Vibration } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTranslation } from 'react-i18next';

const ExamsScreen = () => {
	const { theme } = useTheme();
	const [date, setDate] = useState(new Date());
	const [time, setTime] = useState(new Date());
	const { t, i18n } = useTranslation();
	const [dateDisplay, setDateDisplay] = useState(t('exam_page.enter_date'));
	const [timeDisplay, setTimeDisplay] = useState(t('exam_page.enter_hour'));
	const [roomNumber, setRoomNumber] = useState("");
	const [modalVisible, setModalVisible] = useState(false);
	const [inputText, setInputText] = useState("");
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [showTimePicker, setShowTimePicker] = useState(false);
	const [exams, setExams] = useState([]);
	const [editingExamIndex, setEditingExamIndex] = useState(null);
	const [inputTextError, setInputTextError] = useState("");
	const [dateDisplayError, setDateDisplayError] = useState("");
	const [timeDisplayError, setTimeDisplayError] = useState("");
	const [roomNumberError, setRoomNumberError] = useState("");

	

	const validateFields = () => {
		let isValid = true;

		if (inputText.trim() === "") {
			setInputTextError(t('exam_page.enter_exam_name'));
			isValid = false;
		} else {
			setInputTextError("");
		}

		if (dateDisplay === t('exam_page.enter_date')) {
			setDateDisplayError(t('exam_page.enter_date'));
			isValid = false;
		} else {
			setDateDisplayError("");
		}

		if (timeDisplay === t('exam_page.enter_hour')) {
			setTimeDisplayError("t('exam_page.enter_hour')");
			isValid = false;
		} else {
			setTimeDisplayError("");
		}

		if (roomNumber.trim() === "") {
			setRoomNumberError("t('exam_page.enter_location')");
			isValid = false;
		} else {
			setRoomNumberError("");
		}

		return isValid;
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
		await AsyncStorage.setItem("exams", JSON.stringify(updatedExams));
	};

	useEffect(() => {
		const loadExams = async () => {
			const savedExams = await AsyncStorage.getItem("exams");
			if (savedExams !== null) {
				setExams(JSON.parse(savedExams));
			}
		};
		loadExams();
	}, []);

	const addExam = async () => {
		console.log("Validating fields...");
		if (validateFields()) {
			console.log("Fields are valid, adding exam...");
			const newExam = {
				id: Math.random().toString(), 
				name: inputText,
				date: dateDisplay,
				time: timeDisplay,
				room: roomNumber,
			};
			let updatedExams;
			if (editingExamIndex !== null) {
				updatedExams = [...exams];
				updatedExams[editingExamIndex] = newExam;
			} else {
				updatedExams = [...exams, newExam];
			}
			console.log("Updated exams:", updatedExams);
			setExams(updatedExams);
			setInputText("");
			setRoomNumber("");
			setDateDisplay(t('exam_page.enter_date'));
			setTimeDisplay(t('exam_page.enter_hour'));
			setModalVisible(false);
			setEditingExamIndex(null);
			await AsyncStorage.setItem("exams", JSON.stringify(updatedExams)); // Save exams to AsyncStorage
			console.log("Exam added and saved to storage.");
		} else {
			console.log("Fields validation failed.");
		}
	};

	const onChangeDate = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShowDatePicker(Platform.OS === "ios");
		if (event.type === "set") {
			setDate(currentDate);
			setDateDisplay(currentDate.toLocaleDateString());
		}
	};

	const onChangeTime = (event, selectedTime) => {
		const currentTime = selectedTime || time;
		setShowTimePicker(Platform.OS === "ios");
		if (event.type === "set") {
			setTime(currentTime);
			setTimeDisplay(currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
		}
	};

	const renderEmptyExams = () => (
		<Animated.View entering={FadeInDown.duration(800).springify()}>
			<Image
				style={{ width: 170, height: 170, alignSelf: "center", marginTop: 220, justifyContent: "center" }}
				source={require("../images/blackboard-svgrepo-com.png")}
			/>
			<Text
				style={{
					color: theme === "dark" ? "#FFFFFF" : "#000000",
					textAlign: "center",
					alignItems: "center",
					marginTop: 20,
					fontSize: 20,
					fontWeight: "bold",
				}}>
				{t('exam_page.empty_message')}
			</Text>
		</Animated.View>
	);

	const renderExamsList = () =>
		exams.map((exam, index) => {
			const renderRightActions = () => (
				<View
					style={{
						marginRight: 10,
						marginTop: 10,
						padding: 10,
						backgroundColor: theme === "dark" ? "#012A4A" : "#A9D6E5",
						borderTopLeftRadius: 20,
						borderBottomLeftRadius: 20,
					}}>
					<View style={{ marginTop: 9 }}>
						<View>
							<TouchableOpacity onPress={() => editExam(index)}>
								<Pen />
							</TouchableOpacity>
						</View>

						<View style={{ marginTop: 18 }}>
							<TouchableOpacity onPress={() => deleteExam(index)}>
								<TrashCan />
							</TouchableOpacity>
						</View>
					</View>
				</View>
			);

			return (
				<View style={{ marginTop: 15 }} key={exam.id}>
					<Swipeable
						key={exam.id}
						renderRightActions={renderRightActions}
						friction={1}
						onSwipeableWillOpen={() => Vibration.vibrate([0, 50])}>
						<View
							style={{
								marginLeft: 15,
								marginRight: 15,
								marginTop: 10,
								padding: 13,
								backgroundColor: theme === "dark" ? "#012A4A" : "#89C2D9",
								borderRadius: 20,
							}}>
							<View
								style={{
									margin: 2,
									padding: 20,
									backgroundColor: theme === "dark" ? "#013A63" : "#A9D6E5",
									borderRadius: 20,
								}}>
								<Text style={{ color: theme === "dark" ? "#FFFFFF" : "#000000" }}>{exam.name}</Text>
							</View>

							<View
								style={{
									flexDirection: "row",
									marginLeft: 10,
									marginTop: 10,
									color: theme === "dark" ? "#FFFFFF" : "#000000",
								}}>
								<Text style={{ marginRight: 10, marginTop: 5, color: theme === "dark" ? "#FFFFFF" : "#000000" }}>
									{exam.date}
								</Text>
								<Text style={{ marginRight: 10, marginTop: 5, color: theme === "dark" ? "#FFFFFF" : "#000000" }}>
									{exam.time}
								</Text>
								<Text style={{ marginRight: 10, marginTop: 5, color: theme === "dark" ? "#FFFFFF" : "#000000" }}>
									{exam.room}
								</Text>
							</View>
						</View>
					</Swipeable>
				</View>
			);
		});

	const renderAddExamButton = () => (
		<TouchableOpacity
			style={theme === "dark" ? darkStyle.addButton : lightStyle.addButton}
			onPress={() => setModalVisible(true)}>
			<Icon name="plus" size={24} color="#fff" />
		</TouchableOpacity>
	);

	const renderAddExamModal = () => (
		<Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)}>
			<View style={theme === "dark" ? darkStyle.modalPopUp : lightStyle.modalPopUp}>
				<TextInput
					style={{ height: 40, borderColor: "gray", borderWidth: 1, borderRadius: 10, paddingLeft: 10, marginTop: 10 }}
					onChangeText={(text) => setInputText(text)}
					placeholder={t('exam_page.enter_exam_name')}
					value={inputText}
				/>

				<View style={{ flexDirection: "row", marginTop: 20 }}>
					<TouchableOpacity
						style={{
							height: 40,
							width: 250,
							borderColor: "gray",
							borderWidth: 1,
							borderRadius: 10,
							paddingLeft: 10,
							justifyContent: "center",
						}}
						onPress={() => setShowDatePicker(true)}>
						<Text>{dateDisplay}</Text>
					</TouchableOpacity>

					<View style={{ marginLeft: 20 }}>
						<Calendar />
					</View>
				</View>

				{showDatePicker && <DateTimePicker value={date} mode="date" display="default" onChange={onChangeDate} />}

				<View style={{ flexDirection: "row", marginTop: 20 }}>
					<TouchableOpacity
						style={{
							height: 40,
							width: 250,
							borderColor: "gray",
							borderWidth: 1,
							borderRadius: 10,
							paddingLeft: 10,
							justifyContent: "center",
						}}
						onPress={() => setShowTimePicker(true)}>
						<Text>{timeDisplay}</Text>
					</TouchableOpacity>
					<View style={{ marginLeft: 20 }}>
						<Clock />
					</View>
				</View>
				{showTimePicker && <DateTimePicker value={time} mode="time" display="default" onChange={onChangeTime} />}
				<View style={{ flexDirection: "row", marginTop: 20 }}>
					<TextInput
						style={{
							height: 40,
							width: 250,
							borderColor: "gray",
							borderWidth: 1,
							borderRadius: 10,
							paddingLeft: 10,
							justifyContent: "center",
						}}
						onChangeText={(text) => setRoomNumber(text)}
						placeholder={t('exam_page.enter_location')}
						value={roomNumber}
					/>
					<View style={{ marginLeft: 20 }}>
						<LocationPin />
					</View>
				</View>

				<View style={{ marginTop: 80, alignItems: "center" }}>
					<TouchableOpacity
						style={{
							height: 40,
							width: 100,
							borderColor: "gray",
							borderWidth: 1,
							borderRadius: 10,
							backgroundColor: "#b5efa2",
							justifyContent: "center",
							alignItems: "center",
						}}
						onPress={() => addExam()}>
						<Text style={{ color: "black", textAlign: "center" }}>{t('exam_page.add_exam_button')}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);

	return (
		<View style={{ flex: 1, backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF" }}>
			<ScrollView>{exams.length === 0 ? renderEmptyExams() : renderExamsList()}</ScrollView>
			{renderAddExamButton()}
			{renderAddExamModal()}
		</View>
	);
};

export default ExamsScreen;
