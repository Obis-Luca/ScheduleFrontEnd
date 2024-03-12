import { StatusBar } from 'expo-status-bar';
import styles from '../styles/ChoosePageStyle';
import React, { useState, useEffect } from 'react';
import { SelectList } from 'react-native-dropdown-select-list'
import { useColorScheme } from 'react-native';


import {
    View,
    Button,
    TouchableOpacity,
} from 'react-native';
import { Icon1 } from '../config/Icons';

const ChoosePage = ({ navigation }) => {

    const handleSubmit = () => {
        // Check if all options are selected
        if (selectedFaculty && selectedSpecialization && selectedGroup) {
            // Send data to the backend
            fetch('https://your-django-backend-url/api/submit-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    faculty: selectedFaculty,
                    specialization: selectedSpecialization,
                    group: selectedGroup,
                })
            })
                .then(response => {
                    if (response.ok) {
                        // Data successfully submitted
                        Alert.alert('Success', 'Data submitted successfully');
                    } else {
                        // Error in submitting data
                        Alert.alert('Error', 'Failed to submit data');
                    }
                })
                .catch(error => {
                    console.error('Error submitting data:', error);
                    Alert.alert('Error', 'Failed to submit data');
                });
        } else {
            // If any option is not selected, show an alert
            Alert.alert('Incomplete', 'Please select all options');
        }
    };


    const [showFacultyDropdown, setShowFacultyDropdown] = useState(true);
    const [showSpecializationDropdown, setShowSpecializationDropdown] = useState(false);
    const [showGroupDropdown, setShowGroupDropdown] = useState(false);
    const [showSemigroupDropdown, setShowSemigroupDropdown] = useState(false);
    const [showSubmitOptionsButton, setshowSubmitOptionsButton] = useState(false);

    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [selectedSpecialization, setSelectedSpecialization] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);

    const [faculties, setFaculties] = useState([]);
    const [specializations, setSpecializations] = useState([]);
    const [groups, setGroups] = useState([]);


    // const theme = useColorScheme();
    // const isDarkTheme = theme === 'dark';

    useEffect(() => {
        fetch(`http://192.168.19.122:8000/api/faculties/`)
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
        fetch(`http://192.168.19.122:8000/api/specialisation_filter/?faculty_id=${selectedFaculty}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                // console.log(data)
                const formattedSpecializations = data.map(specialization => ({ key: specialization.id.toString(), value: specialization.name }));
                setSpecializations(formattedSpecializations);
            })
            .catch(error => {
                console.error('Error fetching specializations:', error);
            });
    }



    const fetchGroups = (groupID) => {
        fetch(`http://192.168.19.122:8000/api/groups_filter/?specialisation_id=${selectedSpecialization}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
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

            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => console.log("BUGUGU")}>
                    <Icon1 />
                </TouchableOpacity>
            </View>

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
                            fetchGroups()

                            setShowGroupDropdown(true)
                        }}
                        setSelected={setSelectedSpecialization}
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
                    <Button title="Submit" onPress={handleSubmit()} />
                    )}
                </View>
        </View>
    );

};
export default ChoosePage;
