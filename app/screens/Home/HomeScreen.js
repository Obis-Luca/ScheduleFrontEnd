import React, { useState, useRef, useEffect } from "react";
import { Modal, View, Button, SectionList, Text, Linking, TouchableOpacity, ScrollView } from "react-native";
import { lightStyle, darkStyle, floatingButtonStyles } from "../../styles/HomePageStyles";
import { useTheme } from "../../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import EmptyState from "./EmptyState";
import CourseItem from "./CourseItem";
import LocationModal from "./LocationModal";
import { useSchedule } from "../../context/ScheduleContext";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const HomeScreen = () => {
	const navigation = useNavigation();
	const { theme } = useTheme();
	const { asyncStorageWeek1Schedule, asyncStorageWeek2Schedule, hiddenCourses, saveSchedule, isLoading } = useSchedule();
	const [DataWeek1, setDataWeek1] = useState([]);
	const [DataWeek2, setDataWeek2] = useState([]);
	const [courseNames, setCourseNames] = useState([]);
	const [weekShown, setWeekShown] = useState(false);
	const [expandedItem, setExpandedItem] = useState(null);
	const [dataToShow, setDataToShow] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isConfigureModalVisible, setIsConfigureModalVisible] = useState(false);
	const sectionListRef = useRef(null);
	const [selectedCourses, setSelectedCourses] = useState(hiddenCourses);

	useEffect(() => {
		if (!isLoading) {
			setDataWeek1(asyncStorageWeek1Schedule || []);
			setDataWeek2(asyncStorageWeek2Schedule || []);
		}
	}, [isLoading, asyncStorageWeek1Schedule, asyncStorageWeek2Schedule]);

	useEffect(() => {
		//getNames(weekShown ? DataWeek2 : DataWeek1);
		setSelectedCourses(hiddenCourses);
		filterAndSetDataToShow();
		//setDataToShow(formatDataForSectionList(weekShown ? DataWeek2 : DataWeek1));
	}, [DataWeek1, DataWeek2, weekShown, hiddenCourses]);

	const filterAndSetDataToShow = () => {
		const data = weekShown ? DataWeek2 : DataWeek1;
		getNames(data);
		const filteredData = data.filter(item => !selectedCourses.includes(item.courseName));
		setDataToShow(formatDataForSectionList(filteredData));
	  };

	const formatDataForSectionList = (data) => {
		const groupedByDay = data.reduce((groups, item) => {
			const day = item.courseDay;
			if (!groups[day]) {
				groups[day] = [];
			}
			groups[day].push(item);
			return groups;
		}, {});

		return Object.keys(groupedByDay).map((day) => ({
			title: day,
			data: groupedByDay[day],
		}));
	};

	const toggleWeeks = () => {
		setWeekShown((prevState) => !prevState);
		setExpandedItem(null);
	};

	const toggleItem = (item) => {
		setExpandedItem((prevItem) => (prevItem === item ? null : item));
	};

	const handleOpenMaps = () => {
		const location = "Universitatea+Babeș-Bolyai+din+Cluj-Napoca";
		Linking.canOpenURL(`https://maps.apple.com/?q=${location}`).then((supported) => {
			supported ? setIsModalVisible(true) : console.log("Maps app is not available.");
		});
	};

	const handleModalConfirm = () => {
		setIsModalVisible(false);
		const location = "Universitatea+Babeș-Bolyai+din+Cluj-Napoca";
		Linking.openURL(`https://maps.apple.com/?q=${location}`);
	};

	const renderSectionHeader = ({ section: { title } }) => (
		<Text style={theme === "dark" ? darkStyle.dayHeader : lightStyle.dayHeader}>{title}</Text>
	);

	const getNames = (data) =>
	{
		const names = data.reduce((courseNames, item) =>
		{
			courseNames.push(item.courseName);
			return courseNames;
		}, []);

		const uniqueNames = [...new Set(names)];

		setCourseNames(uniqueNames);
	}
	

	const handleOpenConfigureModal = () => {
		setIsConfigureModalVisible(true);
	};

	const handeClosedConfigureModal = () => {
		filterAndSetDataToShow();
		setIsConfigureModalVisible(false);
	};

	const handleCheckboxToggle = (index) => {
		const selectedCourse = courseNames[index];

		setSelectedCourses((prevSelectedCourses) => {
			let updatedSelectedCourses = [];
			if (prevSelectedCourses.includes(selectedCourse)) {
				updatedSelectedCourses = prevSelectedCourses.filter(course => course !== selectedCourse);
			} else {
				updatedSelectedCourses = [...prevSelectedCourses, selectedCourse];
			}
			
			saveSchedule(DataWeek1, DataWeek2, updatedSelectedCourses);
			return updatedSelectedCourses;
		});
	};

	return (
		<View style={{ flex: 1, backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF" }}>
			{DataWeek1.length === 0 ? (
				<EmptyState theme={theme} navigation={navigation} />
			) : (
				<View style={{ flex: 1 }}>
					<View style={theme === "dark" ? darkStyle.buttonContainer : lightStyle.buttonContainer}>
						<Button title={weekShown ? "Week 2" : "Week 1"} onPress={toggleWeeks} />
					</View>
					<SectionList
						ref={sectionListRef}
						style={{ width: "100%" }}
						sections={dataToShow}
						keyExtractor={(item, index) => item + index}
						renderItem={({ item }) => (
							<CourseItem
								item={item}
								expandedItem={expandedItem}
								toggleItem={toggleItem}
								theme={theme}
								handleOpenMaps={handleOpenMaps}
							/>
						)}
						renderSectionHeader={renderSectionHeader}
					/>
				</View>
			)}

			<TouchableOpacity
				style={[floatingButtonStyles.floatingButton, theme === "dark" ? floatingButtonStyles.darkButton : floatingButtonStyles.lightButton]}
				onPress={handleOpenConfigureModal}
			>
				<Text style={floatingButtonStyles.buttonText}>-</Text>
			</TouchableOpacity>

			<Modal
				transparent={true}
				visible={isConfigureModalVisible}
				animationType="fade"
				onRequestClose={handeClosedConfigureModal}
			>
				<View style={floatingButtonStyles.ConfigureModalOverlay}>
					<View style={floatingButtonStyles.ConfigureModalContainer}>
						<ScrollView contentContainerStyle={floatingButtonStyles.modalContent}>
							{courseNames.map((course, index) => (
								<TouchableOpacity key={index} onPress={() => handleCheckboxToggle(index)}>
									<View style={floatingButtonStyles.courseRow}>
										<Text style={floatingButtonStyles.modalText}>{course}</Text>
										<BouncyCheckbox
											style={floatingButtonStyles.checkboxStyle}
											isChecked={selectedCourses.includes(course)}
											onPress={() => handleCheckboxToggle(index)}
										/>
									</View>
								</TouchableOpacity>
							))}
						</ScrollView>
						<View style={{ marginTop: 20 }}>
							<Button title="Close" onPress={handeClosedConfigureModal} />
						</View>
					</View>
				</View>
			</Modal>

			<LocationModal
				isVisible={isModalVisible}
				onConfirm={handleModalConfirm}
				onCancel={() => setIsModalVisible(false)}
				theme={theme}
			/>
		</View>
	);
};

export default HomeScreen;
