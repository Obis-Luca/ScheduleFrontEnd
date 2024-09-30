import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { useTranslation } from 'react-i18next';
import { View, TouchableOpacity, Text } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useSchedule } from "../context/ScheduleContext";
import { useNavigation } from "@react-navigation/native";
import { compareData } from "../utils/utils";
import { apiProxy } from "../utils/apiProxy";
import { darkStyle, lightStyle, dropdownStyles, buttonStyles } from "../styles/ChoosePageStyle";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../constants/colors";


const ChoosePage = () => {
	const { saveSchedule } = useSchedule();
	const { theme } = useTheme();
	const navigation = useNavigation();

    const { t, i18n } = useTranslation();

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
        }
        else {
        setShowYearDropdown(false);  
        }
    }, [selectedSpecialization]);

    useEffect(() => {
        if (selectedYear) {
            setShowGroupDropdown(true);
        }
        else setShowGroupDropdown(false);
    }, [selectedYear]);

    useEffect(() => {
        if (selectedGroup) {
            setShowSubmitOptionsButton(true);
        }
        else
        {
            setShowSubmitOptionsButton(false);
        }
    }, [selectedGroup]);

    const formattedFaculties = [
        { key: "1", value: "Facultatea de Matematica si Informatica" }
    ];

    const formattedSpecializations = [
        { key: "1", value: "Matematica Romana" },
        { key: "2", value: "Informatica Romana" },
        { key: "3", value: "Matematica Informatica Romana" },
        { key: "4", value: "Matematica Informatica Engleza" },
        { key: "5", value: "Matematica Maghiara" },
        { key: "6", value: "Informatica Maghiara" },
        { key: "7", value: "Matematica Informatica Maghiara" },
        { key: "8", value: "Ingineria informatiei Maghiara" },
        { key: "9", value: "Informatica Germana" },
        { key: "10", value: "Informatica Engleza" },
        { key: "11", value: "Inteligenta Artificiala Engleza" },
        { key: "12", value: "Ingineria informatiei Engleza" },
        { key: "13", value: "Psihologie" }
      ];
      

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

    const renderSearchIcon = () => {
		return (
			<Icon
			name="search"
			size={18}
			paddingRight={5}
			color={theme === "dark" ? colors.darkText : colors.lightText}
			/>
		);
	}

	const renderArrowIcon = () => {
		return (
			<Icon
			name="angle-down"
			size={18}
			paddingLeft={5}
			color={theme === "dark" ? colors.darkText : colors.lightText}
			/>
		);
	}

	const renderCloseIcon = () => {
		return (
			<Icon
			name="times"
			size={18}
			paddingLeft={5}
			color={theme === "dark" ? colors.darkText : colors.lightText}
			/>
		);
	}


    function generateExistentYears(specialisation) {
        const year1Specialisations = ['INGINERIA INFORMATIEI MAGHIARA', 'INTELIGENTA ARTIFICIALA ENGLEZA', 'INGINERIA INFORMATIEI ENGLEZA', 'PSIHOLOGIE'];
        
        let currentYears = [];

        if(year1Specialisations.includes(specialisation.toUpperCase())) {
            currentYears = [
                { key: "1", value: "   1   " },
            ];
        } else {
            currentYears = [
                { key: "1", value: "   1   " },
                { key: "2", value: "   2   " },
                { key: "3", value: "   3   " },
            ];
        }
        setYears(currentYears);
    }

    const fetchFaculties = () => {
        // try {
        //     const data = await apiProxy.get("/faculties");
        //     const formattedFaculties = data.map((faculty) => ({ key: faculty.id.toString(), value: faculty.name }));
        //     setFaculties(formattedFaculties);
        //     console.log(formattedFaculties);
        // } catch (error) {
        //     console.error("Error fetching faculties:", error);
        // }
        setFaculties(formattedFaculties);
    };

    const fetchSpecializations = () => {
        // try {
        //     const data = await apiProxy.get(`/specialisations/filter?faculty_id=${selectedFaculty}`);
        //     const formattedSpecializations = data.map((specialization) => ({ key: specialization.id.toString(), value: specialization.name }));
        //     setSpecializations(formattedSpecializations);
        //     console.log(formattedSpecializations);
        // } catch (error) {
        //     console.error("Error fetching specializations:", error);
        // }
        setSpecializations(formattedSpecializations);
    };

    const fetchGroups = async () => {
        try {
            const data = await apiProxy.get(`/groups/filter?specialisationId=${selectedSpecialization}&year=${selectedYear}`);
            const formattedGroups = data.map((group) => ({ key: group.id.toString(), value: group.groupNumber }));

            const sortedGroups = formattedGroups.sort((a, b) => {
                const [aFirst, aSecond] = a.value.split('/').map(Number); 
                const [bFirst, bSecond] = b.value.split('/').map(Number);
                
                if (aFirst !== bFirst) {
                    return aFirst - bFirst; 
                }
                return aSecond - bSecond; 
            });

            setGroups(sortedGroups);
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
			navigation.navigate(t('home_page.top_title'));
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
    
        
        const translatedFaculties = faculties.map(faculty => ({
            key: faculty.key, 
            value: t(`faculties.${faculty.value}`) 
        }));
    
        return (
            <SelectList
                boxStyles={dropdownStyles[theme].box}
                dropdownStyles={{ ...dropdownStyles[theme].dropdown, height: dropdownHeight }}
                inputStyles={dropdownStyles[theme].text}
                dropdownTextStyles={dropdownStyles[theme].text}
                placeholder={t('choose_page.select_faculty')} 
                data={translatedFaculties} 
                selected={selectedFaculty}
                save="key"
                setSelected={setSelectedFaculty}

                searchicon={renderSearchIcon()}
                arrowicon={renderArrowIcon()}
                closeicon={renderCloseIcon()}
                
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
    
       
        const translatedSpecializations = specializations.map(specialization => ({
            key: specialization.key, 
            value: t(`specializations.${specialization.value}`) 
        }));
    
        return (
            <SelectList
                boxStyles={dropdownStyles[theme].box}
                dropdownStyles={dropdownStyles[theme].dropdown}
                inputStyles={dropdownStyles[theme].text}
                dropdownTextStyles={dropdownStyles[theme].text}
                placeholder={t('choose_page.select_specialisation')} 
                maxHeight={dropdownHeight}
                data={translatedSpecializations}
                save="key"
                selected={selectedSpecialization}

                searchicon={renderSearchIcon()}
                arrowicon={renderArrowIcon()}
                closeicon={renderCloseIcon()}

                onSelect={() => {
                    resetYearDropdown();
                    setShowYearDropdown(true);
                }}
                setSelected={(selectedId) => {
                    setSelectedSpecialization(selectedId); 
                    const selected = specializations.find(item => item.key === selectedId);
                    if (selected) {
                        setSpecializationName(selected.value);
                    }
                }}
                defaultOption={{ key: "", value: t('choose_page.select_specialisation') }}
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
                placeholder={t('choose_page.select_year')}
                data={years}
                save="key"
                selected={selectedYear}

      				searchicon={renderSearchIcon()}
              arrowicon={renderArrowIcon()}
              closeicon={renderCloseIcon()}

                onSelect={() => {
                    resetGroupDropdown();   
                    fetchGroups();
                }}
                setSelected={(key) => {
                    setSelectedYear(key);
                }}
                defaultOption={{ key: "", value: t('choose_page.select_year') }} 
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
                placeholder={t('choose_page.select_group')}
                maxHeight={dropdownHeight}
                data={groups}
                selected={selectedGroup}
                save="value"
                setSelected={setSelectedGroup}
                defaultOption={{ key: "", value: t('choose_page.select_group') }} 
                
                searchicon={renderSearchIcon()}
                arrowicon={renderArrowIcon()}
                closeicon={renderCloseIcon()}
            />
        );
    }

    function SubmitButton() {
        return (
            <TouchableOpacity style={buttonStyles.button} onPress={populateWeeks}>
                <Text style={buttonStyles.buttonText}>{t('choose_page.top_title')}</Text>
            </TouchableOpacity>
        );
    }
};

export default ChoosePage;
