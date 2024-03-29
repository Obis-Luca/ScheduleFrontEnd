import { StatusBar } from 'expo-status-bar';
import styles from '../styles/ChoosePageStyle';
import React, { useState, useEffect } from 'react';
import { SelectList } from 'react-native-dropdown-select-list'
import { useColorScheme } from 'react-native';
import Animated, {FadeIn, FadeInDown} from 'react-native-reanimated';

import {
    View,
    Button,
    TouchableOpacity,
} from 'react-native';
import { Icon1 } from '../config/Icons';
import { useNavigation } from '@react-navigation/core';

const ChoosePage = ({ setDataWeek1, setDataWeek2 }) => {
    const populateWeeks = (group_id,specialization_id, year) => {
        fetch(`http://192.168.182.122:8000/api/courses_filter/?group_id=${group_id}&specialisation_id=${specialization_id}&year=${year}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let week1Data = [];
                let week2Data = [];
                data.forEach(course => {
                    if (course.freq === "sapt. 1") {
                        console.log(course);
                        week1Data.push(course);
                    }
                    else if (course.freq === "sapt. 2") {
                        console.log(course);

                        week2Data.push(course);
                    }
                    else
                    {
                        week1Data.push(course);
                        week2Data.push(course);
                    }
                });
                if (week1Data) {
                    setDataWeek1(week1Data);
                }
                if (week2Data) {
                    setDataWeek2(week2Data);
                }

            })
            .catch(error => {
                console.error('Error fetching faculties:', error);
            });
    }



    const [showFacultyDropdown, setShowFacultyDropdown] = useState(true);
    const [showSpecializationDropdown, setShowSpecializationDropdown] = useState(false);
    const [showGroupDropdown, setShowGroupDropdown] = useState(false);
    const [showSemigroupDropdown, setShowSemigroupDropdown] = useState(false);
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


    // const theme = useColorScheme();
    // const isDarkTheme = theme === 'dark';

    useEffect(() => {
        fetch(`http://192.168.182.122:8000/api/faculties/`)

            .then(response => response.json())
            .then(data => {
                const formattedFaculties = data.map(faculty => ({ key: faculty.id.toString(), value: faculty.name }));
                setFaculties(formattedFaculties);
            })
            .catch(error => {
                console.error('Error fetching faculties:', error);
            });
    }, []);


    const fetchSpecializations = (facultyId) => {
        console.log(facultyId)
        fetch(`http://192.168.182.122:8000/api/specialisation_filter/?faculty_id=${selectedFaculty}`)
            .then(response => response.json())
            .then(data => {

                const formattedSpecializations = data.map(specialization => ({ key: specialization.id.toString(), value: specialization.name }));
                setSpecializations(formattedSpecializations);
            })
            .catch(error => {
                console.error('Error fetching specializations:', error);
            });
    }



    const fetchGroups = (groupID) => {
        fetch(`http://192.168.182.122:8000/api/groups_filter/?specialisation_id=${selectedSpecialization}&year=${selectedYear}`)
            .then(response => response.json())
            .then(data => {
                console.log("muiu");
                const formattedGroups = data.map(group => ({ key: group.id.toString(), value: group.nr }));
                setGroups(formattedGroups);
            })
            .catch(error => {
                console.error('Error fetching specializations:', error);
            });
    }




    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Animated.View entering = {FadeInDown.duration(1000).springify()}>
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => console.log("BUGUGU")}>
                        <Icon1 />
                    </TouchableOpacity>
                </View>
            </Animated.View>


            <View style={styles.alldropdowns}>
                {showFacultyDropdown && (
                        <SelectList
                            boxStyles={{
                                marginTop: 20,
                                marginBottom: 10,
                                padding: 10,
                                borderRadius: 25,
                                backgroundColor: '#f0f0f0',
                                shadowColor: '#000',
                                shadowOffset: { width: 3, height: 2 },
                                shadowOpacity: 0.3,
                                shadowRadius: 2,
                                elevation: 5,
                            }}
                            placeholder={"Selecteaza facultatea"}
                            data={faculties}
                            save="id"
                            setSelected={setSelectedFaculty}

                            onSelect={() => {
                                // console.log(selectedFaculty)
                                fetchSpecializations(selectedFaculty)
                                setShowSpecializationDropdown(true)

                                // setFaculties()
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
                            backgroundColor: '#f0f0f0',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.3,
                            shadowRadius: 2,
                            elevation: 5,
                        }}
                        placeholder={"Selecteaza specializarea"}
                        data={specializations}
                        save="id"
                        onSelect={() => {
                            setshowYearDropdown(true)
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
                            backgroundColor: '#f0f0f0',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.3,
                            shadowRadius: 2,
                            elevation: 5,
                        }}
                        placeholder={"Selecteaza anul"}
                        data={years}
                        save="id"
                        onSelect={() => {
                            fetchGroups()
                            setShowGroupDropdown(true)
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
                            backgroundColor: '#f0f0f0',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.3,
                            shadowRadius: 2,
                            elevation: 5,
                        }}
                        placeholder={"Selecteaza grupa"}
                        data={groups}
                        save="value"
                        onSelect={() => setshowSubmitOptionsButton(true)}
                        setSelected={setSelectedGroup}

                    />

                )}


                {showSubmitOptionsButton &&(
                <Button title="Submit" onPress={() => populateWeeks(selectedGroup, selectedSpecialization, selectedYear)} />)}
                </View>
        </View>
    );

};
export default ChoosePage;
