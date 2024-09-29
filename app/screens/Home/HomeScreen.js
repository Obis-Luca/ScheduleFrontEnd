import React, { useState, useRef, useEffect } from "react";
import { Image, Modal, View, Button, SectionList, Text, Linking, TouchableOpacity, ScrollView } from "react-native";
import { lightStyle, darkStyle, floatingButtonStyles } from "../../styles/HomePageStyles";
import { useTheme } from "../../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import EmptyState from "./EmptyState";
import CourseItem from "./CourseItem";
import LocationModal from "./LocationModal";
import { useSchedule } from "../../context/ScheduleContext";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useTranslation } from 'react-i18next';


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
	const [selectedCourses, setSelectedCourses] = useState(hiddenCourses || []);
	const { t, i18n } = useTranslation();
	const [location, setLocation] = useState(null);

	useEffect(() => {
		if (!isLoading) {
			setDataWeek1(asyncStorageWeek1Schedule || []);
			setDataWeek2(asyncStorageWeek2Schedule || []);
		}
	}, [isLoading, asyncStorageWeek1Schedule, asyncStorageWeek2Schedule]);

	useEffect(() => {
		setSelectedCourses(hiddenCourses || []);
		filterAndSetDataToShow();
	}, [DataWeek1, DataWeek2, weekShown, hiddenCourses]);

	const filterAndSetDataToShow = () => {
		const data = weekShown ? (DataWeek2 || []) : (DataWeek1 || [])
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

	const handleOpenMaps = (currentLocation) => {
		setLocation(currentLocation);
		Linking.canOpenURL(`https://maps.apple.com/?q=${currentLocation}`).then((supported) => {
			supported ? setIsModalVisible(true) : console.log("Maps app is not available.");
		});
	};
	

	const handleModalConfirm = () => {
		setIsModalVisible(false);
		if (location) {
			Linking.openURL(`https://maps.apple.com/?q=${location}`);
		} else {
			console.log("Location is not set, falling back to default.");
			Linking.openURL(`https://maps.apple.com/?q=Cluj-Napoca`);
		}
	};
	

	const renderSectionHeader = ({ section: { title } }) => (
		<Text style={theme === "dark" ? darkStyle.dayHeader : lightStyle.dayHeader}>{t(`home_page.${title}`)}</Text>
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
			
			saveSchedule(DataWeek1, DataWeek2, updatedSelectedCourses || []);
			return updatedSelectedCourses;
		});
	};

	return (
		<View style={{ flex: 1, backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF" }}>
			{DataWeek1.length === 0 ? (
				<EmptyState theme={theme} navigation={navigation} />
			) : (
				<View style={{ flex: 1 }}>
						<TouchableOpacity style={theme === "dark" ? darkStyle.weekButton : lightStyle.weekButton}
						onPress={toggleWeeks}>
							<Text style={theme === "dark" ? darkStyle.weekButtonText : lightStyle.weekButtonText}>
								{weekShown ? t("home_page.week_2") : t("home_page.week_1")}
							</Text>
						</TouchableOpacity>

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
								handleOpenMaps={() => handleOpenMaps(item.roomDetails)}
							/>
						)}
						renderSectionHeader={renderSectionHeader}
					/>
				</View>
			)}

			<TouchableOpacity
			style={[floatingButtonStyles.floatingButton, theme === "dark" ? floatingButtonStyles.darkButton : floatingButtonStyles.lightButton]}
			onPress={handleOpenConfigureModal}>
				<Image 
					source={require('../../images/hide.png')} 
					style={{ width: 30, height: 30 }}           
				/>
			</TouchableOpacity>

			<Modal
			transparent={true}
			visible={isConfigureModalVisible}
			animationType="fade"
			onRequestClose={handeClosedConfigureModal}
			>
			<View style={floatingButtonStyles.ConfigureModalOverlay}>
				<View style={[
				theme === "dark" 
					? floatingButtonStyles.ConfigureModalContainerDark 
					: floatingButtonStyles.ConfigureModalContainerLight,
				{ maxHeight: '80%', width: '90%' } 
				]}>

				<ScrollView 
					style={floatingButtonStyles.modalContent} 
					contentContainerStyle={{ flexGrow: 1 }} 
				>
					{courseNames.map((course, index) => (
					<TouchableOpacity key={index} onPress={() => handleCheckboxToggle(index)}>
						<View style={[
						theme === "dark" 
							? floatingButtonStyles.courseRowDark 
							: floatingButtonStyles.courseRowLight, 
						index === courseNames.length - 1 ? { marginBottom: 0 } : null
						]}>
						<Text style={floatingButtonStyles.modalText}>{t(`course_names.${course}`)}</Text>
						<BouncyCheckbox
							style={floatingButtonStyles.checkboxStyle}
							isChecked={selectedCourses.includes(course)}
							onPress={() => handleCheckboxToggle(index)}
							fillColor="#3f51b5"
							unfillColor="#FFFFFF"
						/>
						</View>
					</TouchableOpacity>
					))}
				</ScrollView>
				
				<View style={{ marginTop: 20 }}>
					<Button title="Close" onPress={handeClosedConfigureModal} color="#3f51b5" />
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
