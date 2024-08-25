import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Button, Platform, ScrollView, Image, Switch } from "react-native";
import { lightStyle, darkStyle } from "../styles/ExamPageStyle";
import { useTheme } from "../context/ThemeContext";
import Icon from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar, Clock, Bell, Pen, TrashCan, LocationPin } from "../config/Icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Vibration } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const ExamsScreen = () => {
	const { theme } = useTheme();
	const [date, setDate] = useState(new Date());
	const [time, setTime] = useState(new Date());
	const [dateDisplay, setDateDisplay] = useState("Alege data");
	const [timeDisplay, setTimeDisplay] = useState("Alege ora");
	const [roomNumber, setRoomNumber] = useState("");
	const [modalVisible, setModalVisible] = useState(false);
	const [inputText, setInputText] = useState("");
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [showTimePicker, setShowTimePicker] = useState(false);
	const [exams, setExams] = useState([]);
	const [editingExamIndex, setEditingExamIndex] = useState(null);
	const [notificationModalVisible, setNotificationModalVisible] = useState(false);
	const [inputTextError, setInputTextError] = useState("");
	const [dateDisplayError, setDateDisplayError] = useState("");
	const [timeDisplayError, setTimeDisplayError] = useState("");
	const [roomNumberError, setRoomNumberError] = useState("");

	const validateFields = () => {
		let isValid = true;

		if (inputText.trim() === "") {
			setInputTextError("Please enter the exam name.");
			isValid = false;
		} else {
			setInputTextError("");
		}

		if (dateDisplay === "Alege data" || dateDisplay === "Choose date") {
			setDateDisplayError("Please select a date.");
			isValid = false;
		} else {
			setDateDisplayError("");
		}

		if (timeDisplay === "Alege ora" || timeDisplay === "Choose time") {
			setTimeDisplayError("Please select a time.");
			isValid = false;
		} else {
			setTimeDisplayError("");
		}

		if (roomNumber.trim() === "") {
			setRoomNumberError("Please enter the room number.");
			isValid = false;
		} else {
			setRoomNumberError("");
		}

		return isValid;
	};

	const handleBellPress = () => {
		setNotificationModalVisible(true);
	};

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
		if (validateFields()) {
			const newExam = {
				id: Math.random().toString(), // Add a unique id
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
			setExams(updatedExams);
			setInputText("");
			setRoomNumber("");
			setDateDisplay("Choose date");
			setTimeDisplay("Choose time");
			setModalVisible(false);
			setEditingExamIndex(null);
			await AsyncStorage.setItem("exams", JSON.stringify(updatedExams)); // Save exams to AsyncStorage
		}
	};

	const onChangeDate = (selectedDate) => {
		const currentDate = selectedDate || date;
		setShowDatePicker(Platform.OS === "ios");
		setDate(currentDate);
		setDateDisplay(currentDate.toLocaleDateString());
	};

	const onChangeTime = (selectedTime) => {
		const currentTime = selectedTime || time;
		setShowTimePicker(Platform.OS === "ios");
		setTime(currentTime);
		setTimeDisplay(currentTime.toLocaleTimeString());
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
				{"No added exams.."}
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
								<TouchableOpacity style={{ marginLeft: 130 }} onPress={handleBellPress}>
									<Bell />
								</TouchableOpacity>
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

	const renderNotificationModal = () => (
		<Modal isVisible={notificationModalVisible} onBackdropPress={() => setNotificationModalVisible(false)}>
			<View style={theme === "dark" ? darkStyle.modalNotificationPopUp : lightStyle.modalNotificationPopUp}>
				<View
					style={{
						flex: 1,
						alignItems: "center",
						justifyContent: "center",
						marginLeft: 120,
						transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
					}}>
					<Switch
						trackColor={{ false: "#000000", true: "#fdfdfd" }}
						thumbColor={"#000000"}
						ios_backgroundColor="#3e3e3e"
					/>
				</View>
			</View>
		</Modal>
	);

	const renderAddExamModal = () => (
		<Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)}>
			<View style={theme === "dark" ? darkStyle.modalPopUp : lightStyle.modalPopUp}>
				<TextInput
					style={{ height: 40, borderColor: "gray", borderWidth: 1, borderRadius: 10, paddingLeft: 10, marginTop: 10 }}
					onChangeText={(text) => setInputText(text)}
					placeholder={"Introdu numele examenului"}
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
						placeholder={"Introdu locatia"}
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
						<Text style={{ color: "black", textAlign: "center" }}>{"Adauga examen"}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);

	return (
		<View style={{ flex: 1, backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF" }}>
			<ScrollView>{exams.length === 0 ? renderEmptyExams() : renderExamsList()}</ScrollView>
			{renderAddExamButton()}
			{renderNotificationModal()}
			{renderAddExamModal()}
		</View>
	);
};

export default ExamsScreen;
