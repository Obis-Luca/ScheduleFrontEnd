import { StatusBar } from 'expo-status-bar';
import {darkStyle, lightStyle, boxStyles} from '../styles/ChoosePageStyle';
import React, { useState, useEffect } from 'react';
import { SelectList } from 'react-native-dropdown-select-list'
import Animated, {FadeIn, FadeInDown} from 'react-native-reanimated';
import {View, Button, TouchableOpacity, ImageBackground, Text} from 'react-native';
import { Icon1 } from '../config/Icons';
import { useTheme } from '../config/ThemeContext';
import {useNavigation} from "@react-navigation/native";
import { useTranslation } from 'react-i18next';


function compareData(a, b) {

    const dayIndexMap = {
        "Luni": 1,
        "Marti": 2,
        "Miercuri": 3,
        "Joi": 4,
        "Vineri": 5
    };

    const indexDayA = dayIndexMap[a.course_day];
    const indexDayB = dayIndexMap[b.course_day];
    
    if (indexDayA !== indexDayB) 
        return indexDayA - indexDayB;
    
    const [startHourA, endHourA] = a.course_hour.split('-').map(hour => parseInt(hour));
    const [startHourB, endHourB] = b.course_hour.split('-').map(hour => parseInt(hour));

    if (startHourA !== startHourB) 
        return startHourA - startHourB;
    else 
        return endHourA - endHourB;
    
}

const ChoosePage = ({ setDataWeek1, setDataWeek2 }) => {
    const [lastOpenedDropdown, setLastOpenedDropdown] = useState(null);

    const { t, i18n } = useTranslation();
    const ipAddress = '192.168.182.122:8000';
    const { theme } = useTheme();
    const navigation = useNavigation();

    
    const [showFacultyDropdown, setShowFacultyDropdown] = useState(true);
    const [showSpecializationDropdown, setShowSpecializationDropdown] = useState(false);
    const [showGroupDropdown, setShowGroupDropdown] = useState(false);
    const [showYearDropdown, setshowYearDropdown] = useState(false);
    const [showSubmitOptionsButton, setshowSubmitOptionsButton] = useState(false);
    const years = [
        {key:'1', value:'1',},
        {key:'2', value:'2'},
        {key:'3', value:'3'},
    ]

    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [selectedSpecialization, setSelectedSpecialization] = useState(null);
    const [selectedYear, setselectedYear] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [faculties, setFaculties] = useState([]);
    const [specializations, setSpecializations] = useState([]);
    const [groups, setGroups] = useState([]);

    const populateWeeks = (group_id,specialization_id, year) => {
        fetch(`http://${ipAddress}/api/courses_filter/?group_id=${group_id}&specialisation_id=${specialization_id}&year=${year}`)
            .then(response => response.json())
            .then(data => {
                let week1Data = [];
                let week2Data = [];
                data.forEach(course => {
                    if (course.freq === "sapt. 1") {
                        week1Data.push(course);
                    }
                    else if (course.freq === "sapt. 2") {
                        week2Data.push(course);
                    }
                    else
                    {
                        week1Data.push(course);
                        week2Data.push(course);
                    }

                week1Data.sort(compareData);
                week2Data.sort(compareData);

                });
                if (week1Data) {
                    setDataWeek1(week1Data);
                }
                if (week2Data) {
                    setDataWeek2(week2Data);
                }
                navigation.navigate(t('Home'));
            })
            .catch(error => {
                console.error('Error fetching faculties:', error);
            });
    }
    useEffect(() => {
        fetch(`http://${ipAddress}/api/faculties/`)

            .then(response => response.json())
            .then(data => {
                const formattedFaculties = data.map(faculty => ({ key: faculty.id.toString(), value: t(faculty.name) }));
                setFaculties(formattedFaculties);
            })
            .catch(error => {
                console.error('Error fetching faculties:', error);
            });
    }, []);


    const fetchSpecializations = (facultyId) => {
        
        fetch(`http://${ipAddress}/api/specialisation_filter/?faculty_id=${selectedFaculty}`)
            .then(response => response.json())
            .then(data => {

                const formattedSpecializations = data.map(specialization => ({ key: specialization.id.toString(), value: t(specialization.name) }));
                setSpecializations(formattedSpecializations);
            })
            .catch(error => {
                console.error('Error fetching specializations:', error);
            });
    }


    const fetchGroups = (groupID) => {
        fetch(`http://${ipAddress}/api/groups_filter/?specialisation_id=${selectedSpecialization}&year=${selectedYear}`)
            .then(response => response.json())
            .then(data => {
                const formattedGroups = data.map(group => ({ key: group.id.toString(), value: group.nr }));
                setGroups(formattedGroups);
            })
            .catch(error => {
                console.error('Error fetching specializations:', error);
            });
    }


    return (
        <View style={theme === 'dark' ? darkStyle.container : lightStyle.container}>
            <StatusBar style="auto" />
            {/*<TouchableOpacity*/}
            {/*    style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}*/}
            {/*    onPress={() => {*/}
            {/*        if (lastOpenedDropdown === 'group') {*/}
            {/*            setShowGroupDropdown(false);*/}
            {/*            setLastOpenedDropdown('year');*/}
            {/*        } else if (lastOpenedDropdown === 'year') {*/}
            {/*            setshowYearDropdown(false);*/}
            {/*            setLastOpenedDropdown('specialization');*/}
            {/*        } else if (lastOpenedDropdown === 'specialization') {*/}
            {/*            setShowSpecializationDropdown(false);*/}
            {/*            setLastOpenedDropdown('faculty');*/}
            {/*        } else if (lastOpenedDropdown === 'faculty') {*/}
            {/*            setShowFacultyDropdown(false);*/}
            {/*            setLastOpenedDropdown(null);*/}
            {/*        }*/}
            {/*    }}*/}
            {/*    activeOpacity={1} // Keep the opacity the same when pressed*/}
            {/*/>*/}




            <View style={theme === 'dark' ? darkStyle.alldropdowns :lightStyle.alldropdowns}>
                {showFacultyDropdown && (
                        <SelectList
                            boxStyles={{
                                marginTop: 20,
                                marginBottom: 10,
                                padding: 10,
                                borderRadius: 25,
                                backgroundColor: theme === 'dark' ? '#012A4A' :'#A9D6E5',
                                shadowColor: '#000',
                                shadowOffset: { width: 3, height: 2 },
                                shadowOpacity: 0.3,
                                shadowRadius: 2,
                                elevation: 5,
                            }}
                            dropdownStyles={{
                                backgroundColor: theme === 'dark' ? '#012A4A' :'#A9D6E5',
                            }}

                            inputStyles={{
                                color: theme === 'dark' ? '#FFFFFF' :'#000000',
                            }}
                            dropdownTextStyles={{
                                color: theme === 'dark' ? '#FFFFFF' :'#000000',
                            }}
                            placeholder={t("Selecteaza facultatea")}
                            data={faculties}
                            save="id"
                            setSelected={setSelectedFaculty}

                            onSelect={() => {
                                fetchSpecializations(selectedFaculty)
                                setShowSpecializationDropdown(true)
                                setLastOpenedDropdown('faculty'); // Set last opened dropdown

                            }}
                        />
                )}

                {showSpecializationDropdown && (
                    <SelectList
                        boxStyles={{
                            marginTop: 20,
                            marginBottom: 10,
                            padding: 10,
                            borderRadius: 25,
                            backgroundColor: theme === 'dark' ? '#012A4A' :'#A9D6E5',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.3,
                            shadowRadius: 2,
                            elevation: 5,
                        }}
                        dropdownStyles={{
                            backgroundColor: theme === 'dark' ? '#012A4A' :'#A9D6E5',
                        }}
                        inputStyles={{
                            color: theme === 'dark' ? '#FFFFFF' :'#000000',
                        }}
                        dropdownTextStyles={{
                            color: theme === 'dark' ? '#FFFFFF' :'#000000',
                        }}
                        placeholder={t("Selecteaza specializarea")}
                        data={specializations}
                        save="id"
                        onSelect={() => {
                            setshowYearDropdown(true)
                            setLastOpenedDropdown('specialization'); // Set last opened dropdown

                        }}
                        setSelected={setSelectedSpecialization}
                    />
                )}

                {showYearDropdown && (
                    <SelectList
                        boxStyles={{
                            marginTop: 20,
                            marginBottom: 10,
                            padding: 10,
                            borderRadius: 25,
                            backgroundColor: theme === 'dark' ? '#012A4A' :'#A9D6E5',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.3,
                            shadowRadius: 2,
                            elevation: 5,
                        }}
                        dropdownStyles={{
                            backgroundColor: theme === 'dark' ? '#012A4A' :'#A9D6E5',
                        }}
                        inputStyles={{
                            color: theme === 'dark' ? '#FFFFFF' :'#000000',
                        }}
                        dropdownTextStyles={{
                            color: theme === 'dark' ? '#FFFFFF' :'#000000',
                        }}
                        placeholder={t("Selecteaza anul")}
                        data={years}
                        save="id"
                        onSelect={() => {
                            fetchGroups()
                            setShowGroupDropdown(true)
                            setLastOpenedDropdown('year'); // Set last opened dropdown

                        }}
                        setSelected={setselectedYear}
                    />
                )}


                {showGroupDropdown && (
                    <SelectList
                        boxStyles={{
                            marginTop: 20,
                            marginBottom: 10,
                            padding: 10,
                            borderRadius: 25,
                            backgroundColor: theme === 'dark' ? '#012A4A' :'#A9D6E5',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.3,
                            shadowRadius: 2,
                            elevation: 5,

                            
                        }}
                        dropdownStyles={{
                            backgroundColor: theme === 'dark' ? '#012A4A' :'#A9D6E5',
                        }}
                        
                        inputStyles={{
                            color: theme === 'dark' ? '#FFFFFF' :'#000000',
                        }}
                        dropdownTextStyles={{
                            color: theme === 'dark' ? '#FFFFFF' :'#000000',

                        }}
                        placeholder={t("Selecteaza grupa")}
                        data={groups}
                        save="value"
                        onSelect={() => {
                            setshowSubmitOptionsButton(true)
                            setLastOpenedDropdown('group'); // Set last opened dropdown

                        }}
                        setSelected={setSelectedGroup}
                    />
                )}


                {showSubmitOptionsButton &&(

                    <TouchableOpacity
                        style={{marginTop: 20,height: 40, width: 100, borderColor: 'gray', borderWidth: 1, borderRadius: 10, backgroundColor: '#315E44', justifyContent: 'center', alignItems: 'center'}}
                        onPress={() => populateWeeks(selectedGroup, selectedSpecialization, selectedYear)}
                    >
                        <Text style={{color:theme === 'dark' ? '#FFFFFF' :'#000000', textAlign: "center"}}>{t("AddButtonChoosePage")}</Text>
                    </TouchableOpacity>
                )}
                </View>
        </View>
    );

};
export default ChoosePage;

