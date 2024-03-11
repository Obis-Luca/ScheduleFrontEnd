import { StatusBar } from 'expo-status-bar';
import styles from '../styles/ChoosePageStyle';
import React, { useState, useEffect } from 'react';
import {
    View,
    Button,
    TouchableOpacity,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Icon1 } from '../config/Icons';

const ChoosePage = ({ navigation }) => {

    const handleSubmit = () => {
        // Check if all options are selected
        if (selectedFaculty && selectedSpecialization && selectedGroup && selectedSemigroup) {
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
                    semigroup: selectedSemigroup
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



    const [showFacultyDropdown, setShowFacultyDropdown] = useState(false);
    const [showSpecializationDropdown, setShowSpecializationDropdown] = useState(false);
    const [showGroupDropdown, setShowGroupDropdown] = useState(false);
    const [showSemigroupDropdown, setShowSemigroupDropdown] = useState(false);
    const [showSubmitOptionsButton, setshowSubmitOptionsButton] = useState(false);

    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [selectedSpecialization, setSelectedSpecialization] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [selectedSemigroup, setSelectedSemigroup] = useState(null);

    const [faculties, setFaculties] = useState([]);
    const [specializations, setSpecializations] = useState([]);
    const [groups, setGroups] = useState([]);
    const [semigroups, setSemigroups] = useState([]);

    useEffect(() => {
        // Fetch faculties data from Django backend
        fetch('https://your-django-backend-url/api/faculties/')
            .then(response => response.json())
            .then(data => {
                // Update state with fetched faculties
                setFaculties(data);
            })
            .catch(error => {
                console.error('Error fetching faculties:', error);
            });
    }, []);

    useEffect(() => {
        // Fetch specializations data from Django backend
        if (selectedFaculty) {
            fetch(`https://your-django-backend-url/api/specializations/?faculty=${selectedFaculty}`)
                .then(response => response.json())
                .then(data => {
                    // Update state with fetched specializations
                    setSpecializations(data);
                })
                .catch(error => {
                    console.error('Error fetching specializations:', error);
                });
        }
    }, [selectedFaculty]);

    useEffect(() => {
        // Fetch groups data from Django backend
        if (selectedSpecialization) {
            fetch(`https://your-django-backend-url/api/groups/?specialization=${selectedSpecialization}`)
                .then(response => response.json())
                .then(data => {
                    // Update state with fetched groups
                    setGroups(data);
                })
                .catch(error => {
                    console.error('Error fetching groups:', error);
                });
        }
    }, [selectedSpecialization]);

    useEffect(() => {
        // Fetch semigroups data from Django backend
        if (selectedGroup) {
            fetch(`https://your-django-backend-url/api/semigroups/?group=${selectedGroup}`)
                .then(response => response.json())
                .then(data => {
                    // Update state with fetched semigroups
                    setSemigroups(data);
                })
                .catch(error => {
                    console.error('Error fetching semigroups:', error);
                });
        }
    }, [selectedGroup]);


    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => console.log("BUGUGU")}>
                    <Icon1 />
                </TouchableOpacity>
            </View>

            <View style={styles.buttonsContainer}>
                <Button title="Semestru" onPress={() => setShowFacultyDropdown(true)} />

            <View style={styles.alldropdowns}>

                {showFacultyDropdown && (
                    <DropDownPicker style={styles.dropdownButton}
                        items={faculties.map(faculty => ({ label: faculty.name, value: faculty.id }))}
                        onChangeItem={item => {
                            setSelectedFaculty(item.value);
                            setShowSpecializationDropdown(true);
                        }}
                        placeholder="Select Faculty"
                    />
                )}

                {showSpecializationDropdown && (
                    <DropDownPicker style={styles.dropdownButton}
                        items={specializations.map(specialization => ({ label: specialization.name, value: specialization.id }))}
                        onChangeItem={item => {
                            setSelectedSpecialization(item.value);
                            setShowGroupDropdown(true);
                        }}
                        placeholder="Select Specialization"
                    />
                )}

                {showGroupDropdown && (
                    <DropDownPicker style={styles.dropdownButton}
                        items={groups.map(group => ({ label: group.name, value: group.id }))}
                        onChangeItem={item => {
                            setSelectedGroup(item.value);
                            setShowSemigroupDropdown(true);
                        }}
                        placeholder="Select Group"
                    />
                )}

                {showSemigroupDropdown && (
                    <DropDownPicker style={styles.dropdownButton}
                        items={semigroups.map(semigroup => ({ label: semigroup.name, value: semigroup.id }))}
                        onChangeItem={item =>{
                            setSelectedSemigroup(item.value)
                            setShowSemigroupDropdown(true);
                    }}

                        placeholder="Select Semigroup"
                    />
                )}

            </View>
                {showSubmitOptionsButton &&(
                    <Button title="Submit" onPress={handleSubmit} />
                    )}
            </View>
        </View>
    );
};
export default ChoosePage;
