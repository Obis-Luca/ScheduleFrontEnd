import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { SelectList } from "react-native-dropdown-select-list";

import { View, Button, TouchableOpacity, Text } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useSchedule } from "../context/ScheduleContext";
import { useNavigation } from "@react-navigation/native";
import { compareData } from "../utils/utils";
import { apiProxy } from "../utils/apiProxy";
import { darkStyle, lightStyle, dropdownStyles, buttonStyles } from "../styles/ChoosePageStyle";

const ChoosePage = () => {
	const { saveSchedule } = useSchedule();
	const { theme } = useTheme();
	const navigation = useNavigation();

	const [showSpecializationDropdown, setShowSpecializationDropdown] = useState(false);
	const [showGroupDropdown, setShowGroupDropdown] = useState(false);
	const [showYearDropdown, setShowYearDropdown] = useState(false);
	const [showSubmitOptionsButton, setShowSubmitOptionsButton] = useState(false);

	const [selectedFaculty, setSelectedFaculty] = useState(null);
	const [specializationName, setSpecializationName] = useState("");
	const [selectedSpecialization, setSelectedSpecialization] = useState(null);
	const [selectedYear, setSelectedYear] = useState(null);
	const [selectedGroup, setSelectedGroup] = useState(null);
	const [faculties, setFaculties] = useState([]);
	const [specializations, setSpecializations] = useState([]);
	const [groups, setGroups] = useState([]);
	const [years, setYears] = useState([]);

	useEffect(() => {
		fetchFaculties();
	}, []);

	useEffect(() => {
		if (selectedSpecialization) {
			setShowYearDropdown(true);
			generateExistentYears(specializationName);
		} else {
			setShowYearDropdown(false);
		}
	}, [selectedSpecialization]);

	useEffect(() => {
		if (selectedYear) {
			setShowGroupDropdown(true);
		} else setShowGroupDropdown(false);
	}, [selectedYear]);

	useEffect(() => {
		if (selectedGroup) {
			setShowSubmitOptionsButton(true);
		} else {
			setShowSubmitOptionsButton(false);
		}
	}, [selectedGroup]);

	const resetYearDropdown = () => {
		setSelectedYear(null);
		setShowGroupDropdown(false);
		setGroups([]);
		setShowSubmitOptionsButton(false);
	};

	const resetGroupDropdown = () => {
		setSelectedGroup(null);
		setGroups([]);
		setShowSubmitOptionsButton(false);
	};

	function generateExistentYears(specialisation) {
		const year1Specialisations = [
			"INGINERIA INFORMATIEI MAGHIARA",
			"INTELIGENTA ARTIFICIALA ENGLEZA",
			"INGINERIA INFORMATIEI ENGLEZA",
			"PSIHOLOGIE",
		];

		let currentYears = [];

		if (year1Specialisations.includes(specialisation.toUpperCase())) {
			currentYears = [{ key: "1", value: "   1   " }];
		} else {
			currentYears = [
				{ key: "1", value: "   1   " },
				{ key: "2", value: "   2   " },
				{ key: "3", value: "   3   " },
			];
		}
		setYears(currentYears);
	}

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
			console.log(formattedSpecializations);
		} catch (error) {
			console.error("Error fetching specializations:", error);
		}
	};

	const fetchGroups = async () => {
		try {
			const data = await apiProxy.get(`/groups/filter?specialisationId=${selectedSpecialization}&year=${selectedYear}`);
			const formattedGroups = data.map((group) => ({ key: group.id.toString(), value: group.groupNumber }));
			setGroups(formattedGroups);
			console.log(formattedGroups);
			console.log(selectedSpecialization, selectedYear);
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
				if (course.frequency === "1") {
					week1Data.push(course);
				} else if (course.frequency === "2") {
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
		const itemHeight = 55;
		const dropdownHeight = faculties.length * itemHeight;

		return (
			<SelectList
				boxStyles={dropdownStyles[theme].box}
				dropdownStyles={{ ...dropdownStyles[theme].dropdown, height: dropdownHeight }}
				inputStyles={dropdownStyles[theme].text}
				dropdownTextStyles={dropdownStyles[theme].text}
				placeholder={"Selecteaza facultatea"}
				data={faculties}
				selected={selectedFaculty}
				save="key"
				setSelected={setSelectedFaculty}
				onSelect={() => {
					fetchSpecializations();
					setShowSpecializationDropdown(true);
				}}
			/>
		);
	}

	function SpecializationDropdown() {
		const itemHeight = 45;
		const dropdownHeight = Math.min(specializations.length * itemHeight, 200);

		return (
			<SelectList
				boxStyles={dropdownStyles[theme].box}
				dropdownStyles={dropdownStyles[theme].dropdown}
				inputStyles={dropdownStyles[theme].text}
				dropdownTextStyles={dropdownStyles[theme].text}
				placeholder={"Selecteaza specializarea"}
				maxHeight={dropdownHeight}
				data={specializations}
				save="key"
				selected={selectedSpecialization}
				onSelect={() => {
					resetYearDropdown();
					setShowYearDropdown(true);
				}}
				setSelected={(selectedId) => {
					setSelectedSpecialization(selectedId);
					const selected = specializations.find((item) => item.key === selectedId);
					if (selected) {
						setSpecializationName(selected.value);
					}
				}}
				defaultOption={{ key: "", value: "Selecteaza specializarea" }}
			/>
		);
	}

	function YearDropdown() {
		const itemHeight = 44;
		const dropdownHeight = years.length * itemHeight;

		return (
			<SelectList
				key={selectedYear === null ? "resetYear" : "originalYear"}
				boxStyles={dropdownStyles[theme].box}
				dropdownStyles={{ ...dropdownStyles[theme].dropdown, height: dropdownHeight }}
				inputStyles={dropdownStyles[theme].text}
				dropdownTextStyles={dropdownStyles[theme].text}
				placeholder={"Selecteaza anul"}
				data={years}
				save="key"
				selected={selectedYear}
				onSelect={() => {
					resetGroupDropdown();
					fetchGroups();
				}}
				setSelected={(key) => {
					setSelectedYear(key);
				}}
				defaultOption={{ key: "", value: "Selecteaza anul" }}
			/>
		);
	}

	function GroupDropdown() {
		const itemHeight = 45;
		const dropdownHeight = 200 > groups.length * itemHeight ? groups.length * itemHeight : 200;

		return (
			<SelectList
				key={selectedGroup === null ? "resetGroup" : "originaGroup"}
				boxStyles={dropdownStyles[theme].box}
				dropdownStyles={{ ...dropdownStyles[theme].dropdown, height: dropdownHeight }}
				inputStyles={dropdownStyles[theme].text}
				dropdownTextStyles={dropdownStyles[theme].text}
				placeholder={"Selecteaza grupa"}
				maxHeight={dropdownHeight}
				data={groups}
				selected={selectedGroup}
				save="value"
				setSelected={setSelectedGroup}
				defaultOption={{ key: "", value: "Selecteaza grupa" }}
			/>
		);
	}

	function SubmitButton() {
		return (
			<TouchableOpacity style={buttonStyles.button} onPress={populateWeeks}>
				<Text style={buttonStyles.buttonText}>Submit</Text>
			</TouchableOpacity>
		);
	}
};

export default ChoosePage;
