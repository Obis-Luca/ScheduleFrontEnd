import React, { useState, useRef, useEffect } from 'react';
import { View, Button, SectionList, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { lightStyle,darkStyle } from '../styles/HomePageStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../config/ThemeContext';

const HomeScreen = ({ DataWeek1, DataWeek2 }) => {
    const { theme, toggleSwitch } = useTheme();
    const [weekShown, setweekShown] = useState(false);
    const [expandedItem, setExpandedItem] = useState(null);
    const [dataToShow, setDataToShow] = useState([]);

    useEffect(() => {
        const formatDataForSectionList = (data) => {
            const groupedByDay = data.reduce((groups, item) => {
                const day = item.course_day;
                if (!groups[day]) {
                    groups[day] = [];
                }
                groups[day].push(item);
                return groups;
            }, {});

            const sections = Object.keys(groupedByDay).map(day => ({
                title: day,
                data: groupedByDay[day]
            }));

            return sections;
        };

        setDataToShow(formatDataForSectionList(weekShown ? DataWeek2 : DataWeek1));
    }, [DataWeek1, DataWeek2, weekShown]);

    const toggleWeeks = () => {
        setweekShown(prevState => !prevState);
        setExpandedItem(null);
    };

    const toggleItem = (item) => {
        setExpandedItem(prevItem => (prevItem === item ? null : item));
    };

    const addHour = () => {
        console.log('Adding more hours...');
        setExpandedItem(null);
    };

    const sectionListRef = useRef(null);

    const handleOutsidePress = () => {
        setExpandedItem(null);
    };

    return (
        <View style={{ flex: 1 }}>

            <View style={theme === 'dark' ? darkStyle.buttonContainer : lightStyle.buttonContainer}><Button title={weekShown ? "Week 1" : "Week 2"} onPress={toggleWeeks} /></View>

            <View style={{ flex: 1 }}>
                <SectionList
                    ref={sectionListRef}
                    style={{ width: '100%' }}
                    sections={dataToShow}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => toggleItem(item)}>
                            <View style={theme === 'dark' ? darkStyle.itemContainer : lightStyle.itemContainer}>

                                <View style={theme === 'dark' ? darkStyle.itemHeader : lightStyle.itemHeader}>
                                    <Text style={theme === 'dark' ? darkStyle.title : lightStyle.title}>{item.course_name}</Text>

                                    <View style={theme === 'dark' ? darkStyle.div_for_hour_and_dropdownArrow : lightStyle.div_for_hour_and_dropdownArrow}>
                                        <Text style={theme === 'dark' ? darkStyle.title : lightStyle.title}>{item.course_hour}</Text>
                                        <Icon name={expandedItem === item ? "angle-up" : "angle-down"} size={20} color="#000" style={{ marginLeft: 10 }} />
                                    </View>
                                </View>

                                {expandedItem === item && (
                                    <View style={theme === 'dark' ? darkStyle.dropdown : lightStyle.dropdown}>
                                        <Text>{item.course_type}</Text>
                                        <Text>{item.room_details}</Text>
                                        <Text>{item.room}</Text>
                                        <Text>{item.professor}</Text>
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    )}

                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={theme === 'dark' ? darkStyle.dayHeader : lightStyle.dayHeader}>{title}</Text>
                    )}
                />
            </View>

            <TouchableOpacity style={theme === 'dark' ? darkStyle.addButton : lightStyle.addButton} onPress={addHour}><Icon name="plus" size={24} color="#fff" /></TouchableOpacity>

        </View>
    );
};

export default HomeScreen;