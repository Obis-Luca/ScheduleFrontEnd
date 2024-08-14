import React, { useState, useRef, useEffect } from "react";
import { View, Button, SectionList, Text, Linking } from "react-native";
import { lightStyle, darkStyle } from "../../styles/HomePageStyles";
import { useTheme } from "../../config/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import EmptyState from "./EmptyState";
import CourseItem from "./CourseItem";
import LocationModal from "./LocationModal";

const HomeScreen = ({ DataWeek1, DataWeek2 }) => {
	const navigation = useNavigation();
	const { theme } = useTheme();
	const [weekShown, setWeekShown] = useState(false);
	const [expandedItem, setExpandedItem] = useState(null);
	const [dataToShow, setDataToShow] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const sectionListRef = useRef(null);

	useEffect(() => {
		setDataToShow(formatDataForSectionList(weekShown ? DataWeek2 : DataWeek1));
	}, [DataWeek1, DataWeek2, weekShown]);

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

	const renderSectionHeader = ({ section: { title } }) => <Text style={theme === "dark" ? darkStyle.dayHeader : lightStyle.dayHeader}>{title}</Text>;

	return (
		<View style={{ flex: 1, backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF" }}>
			{DataWeek1.length === 0 ? (
				<EmptyState theme={theme} navigation={navigation} />
			) : (
				<View style={{ flex: 1 }}>
					<View style={theme === "dark" ? darkStyle.buttonContainer : lightStyle.buttonContainer}>
						<Button title={weekShown ? "Week 1" : "Week 2"} onPress={toggleWeeks} />
					</View>
					<SectionList
						ref={sectionListRef}
						style={{ width: "100%" }}
						sections={dataToShow}
						keyExtractor={(item, index) => item + index}
						renderItem={({ item }) => (
							<CourseItem item={item} expandedItem={expandedItem} toggleItem={toggleItem} theme={theme} handleOpenMaps={handleOpenMaps} />
						)}
						renderSectionHeader={renderSectionHeader}
					/>
				</View>
			)}
			<LocationModal isVisible={isModalVisible} onConfirm={handleModalConfirm} onCancel={() => setIsModalVisible(false)} theme={theme} />
		</View>
	);
};

export default HomeScreen;
