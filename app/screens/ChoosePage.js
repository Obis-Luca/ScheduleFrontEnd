import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { View, Button } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { compareData } from "../utils/utils";
import { apiProxy } from "../utils/apiProxy";
import { darkStyle, lightStyle, dropdownStyles } from "../styles/ChoosePageStyle";
import { useSchedule } from "../context/ScheduleContext";
import { colors } from "../constants/colors";

const ChoosePage = () => {
	const { saveSchedule } = useSchedule();
	const { theme } = useTheme();
	const navigation = useNavigation();

	const [showSpecializationDropdown, setShowSpecializationDropdown] = useState(false);
	const [showGroupDropdown, setShowGroupDropdown] = useState(false);
	const [showYearDropdown, setshowYearDropdown] = useState(false);
	const [showSubmitOptionsButton, setshowSubmitOptionsButton] = useState(false);

	const [selectedFaculty, setSelectedFaculty] = useState(null);
	const [selectedSpecialization, setSelectedSpecialization] = useState(null);
	const [selectedYear, setselectedYear] = useState(null);
	const [selectedGroup, setSelectedGroup] = useState(null);
	const [faculties, setFaculties] = useState([]);
	const [specializations, setSpecializations] = useState([]);
	const [groups, setGroups] = useState([]);

	const years = [
		{ key: "1", value: "1" },
		{ key: "2", value: "2" },
		{ key: "3", value: "3" },
	];

	useEffect(() => {
		fetchFaculties();
	}, []);

	const fetchFaculties = async () => {
		try {
			const data = await apiProxy.get("/faculties");
			const formattedFaculties = data.map((faculty) => ({ key: faculty.id.toString(), value: faculty.name }));
			setFaculties(formattedFaculties);
		} catch (error) {
			console.error("Error fetching faculties:", error);
		}
	};

	const fetchSpecializations = async () => {
		try {
			const data = await apiProxy.get(`/specialisations/filter?faculty_id=${selectedFaculty}`);
			const formattedSpecializations = data.map((specialization) => ({
				key: specialization.id.toString(),
				value: specialization.name,
			}));
			setSpecializations(formattedSpecializations);
		} catch (error) {
			console.error("Error fetching specializations:", error);
		}
	};

	const fetchGroups = async () => {
		try {
			const data = await apiProxy.get(`/groups/filter?specialisationId=${selectedSpecialization}&year=${selectedYear}`);
			const formattedGroups = data.map((group) => ({ key: group.id.toString(), value: group.groupNumber }));
			setGroups(formattedGroups);
		} catch (error) {
			console.error("Error fetching groups:", error);
		}
	};

	const populateWeeks = async () => {
		try {
			const data = await apiProxy.get(
				`/courses/filter?groupId=${selectedGroup}&specialisationId=${selectedSpecialization}&year=${selectedYear}`
			);
			let week1Data = [];
			let week2Data = [];
			data.forEach((course) => {
				if (course.frequency === "sapt. 1") {
					week1Data.push(course);
				} else if (course.frequency === "sapt. 2") {
					week2Data.push(course);
				} else {
					week1Data.push(course);
					week2Data.push(course);
				}
			});
			week1Data.sort(compareData);
			week2Data.sort(compareData);

			saveSchedule(week1Data, week2Data);
			navigation.navigate("Acasa");
		} catch (error) {
			console.error("Error fetching courses:", error);
		}
	};

	return (
		<View style={theme === "dark" ? darkStyle.container : lightStyle.container}>
			<StatusBar style="auto" />
			<View style={theme === "dark" ? darkStyle.alldropdowns : lightStyle.alldropdowns}>
				{FacultyDropdown()}
				{showSpecializationDropdown && SpecializationDropdown()}
				{showYearDropdown && YearDropdown()}
				{showGroupDropdown && GroupDropdown()}
				{showSubmitOptionsButton && SubmitButton()}
			</View>
		</View>
	);

	function FacultyDropdown() {
		return (
			<SelectList
				boxStyles={dropdownStyles[theme].box}
				dropdownStyles={dropdownStyles[theme].dropdown}
				inputStyles={dropdownStyles[theme].text}
				dropdownTextStyles={dropdownStyles[theme].text}
				placeholder={"Selecteaza facultatea"}
				data={faculties}
				save="id"
				setSelected={setSelectedFaculty}
				onSelect={() => {
					fetchSpecializations();
					setShowSpecializationDropdown(true);
				}}
			/>
		);
	}

	function SpecializationDropdown() {
		return (
			<SelectList
				boxStyles={dropdownStyles[theme].box}
				dropdownStyles={dropdownStyles[theme].dropdown}
				inputStyles={dropdownStyles[theme].text}
				dropdownTextStyles={dropdownStyles[theme].text}
				placeholder={"Selecteaza specializarea"}
				data={specializations}
				save="id"
				onSelect={() => {
					setshowYearDropdown(true);
					selectedYear && fetchGroups();
				}}
				setSelected={setSelectedSpecialization}
			/>
		);
	}

	function YearDropdown() {
		return (
			<SelectList
				boxStyles={dropdownStyles[theme].box}
				dropdownStyles={dropdownStyles[theme].dropdown}
				inputStyles={dropdownStyles[theme].text}
				dropdownTextStyles={dropdownStyles[theme].text}
				placeholder={"Selecteaza anul"}
				data={years}
				save="id"
				onSelect={() => {
					fetchGroups();
					setShowGroupDropdown(true);
				}}
				setSelected={setselectedYear}
			/>
		);
	}

	function GroupDropdown() {
		return (
			<SelectList
				boxStyles={dropdownStyles[theme].box}
				dropdownStyles={dropdownStyles[theme].dropdown}
				inputStyles={dropdownStyles[theme].text}
				dropdownTextStyles={dropdownStyles[theme].text}
				placeholder={"Selecteaza grupa"}
				data={groups}
				save="value"
				onSelect={() => setshowSubmitOptionsButton(true)}
				setSelected={setSelectedGroup}
			/>
		);
	}

	function SubmitButton() {
		return <Button title="Submit" onPress={populateWeeks} />;
	}
};

export default ChoosePage;
