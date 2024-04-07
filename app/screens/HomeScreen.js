import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Button,
    SectionList,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal,
    Linking,
    StyleSheet,
    Image
} from 'react-native';
import { lightStyle,darkStyle,middleButton,modalstyles } from '../styles/HomePageStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../config/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import Animated, {FadeInDown} from "react-native-reanimated";
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const HomeScreen = ({ DataWeek1, DataWeek2 }) => {
    const navigation = useNavigation();
    const { theme, toggleSwitch } = useTheme();
    const [weekShown, setweekShown] = useState(false);
    const [expandedItem, setExpandedItem] = useState(null);
    const [dataToShow, setDataToShow] = useState([]);
    const [confirmDelete, setConfirmDelete] = useState(false); // New state for confirmation
    const [itemToRemove, setItemToRemove] = useState(null); // New state to store item to remove
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { t } = useTranslation(); // Access t function for translation
    // const [endModalVisible, setEndModalVisible] = useState(false);


    const handleRemoveCourse = (item) => {
        if (confirmDelete && item === itemToRemove) {
            const updatedDataToShow = dataToShow.map(section => ({
                ...section,
                data: section.data.filter(i => i !== item)
            }));

            // Update the state with the filtered data
            setDataToShow(updatedDataToShow);

            // Close the expanded item if it's the item being removed
            if (expandedItem === itemToRemove) {
                setExpandedItem(null);
            }

            // Reset states
            setConfirmDelete(false);
            setItemToRemove(null);
        } else {
            // Show confirmation icons for this item
            setItemToRemove(item);
            setConfirmDelete(true);
        }
    };

    const handleOpenMaps = () => {
        const location = 'Universitatea+Babeș-Bolyai+din+Cluj-Napoca'; // Replace with your location
    
        Linking.canOpenURL(`https://maps.apple.com/?q=${location}`).then(supported => {
            if (!supported) {
              console.log('Maps app is not available.');
            } else {
                console.log('Maps app available');
              setIsModalVisible(true);
            }
          });
        };
      
        const handleModalConfirm = () => {
          setIsModalVisible(false);
          const location = 'Universitatea+Babeș-Bolyai+din+Cluj-Napoca'; // Replace with your location
          Linking.openURL(`https://maps.apple.com/?q=${location}`);
        };
      
        const handleModalCancel = () => {
          setIsModalVisible(false);
        };FadeInDown
      
          


    useEffect(() => {
        const formatDataForSectionList = (data) => {
            const groupedByDay = data.reduce((groups, item) => {
                const day = t(item.course_day);
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
        
        <View style={{ flex: 1, backgroundColor: theme === 'dark' ?  '#000000': '#FFFFFF'}}>
        {DataWeek1.length === 0 ? (
            <>
                <Animated.View entering = {FadeInDown.duration(800).springify()}>
                    <Image
                        style={{ width: 170, height: 170, alignSelf: 'center' , marginTop: 220, justifyContent: "center"}}
                        source={theme === 'dark' ?  require('../images/calendar-svgrepo-com2.png') : require('../images/calendar-svgrepo-com.png')        }
                    />
                    <Text style={{color:  theme === 'dark' ?  '#FFFFFF': '#000000', textAlign: "center",alignItems: "center", marginTop: 20, fontSize: 20, fontWeight: "bold"}}>{t("mesajHomeScreen")}</Text>
                </Animated.View>
                <TouchableOpacity
                    style={theme === 'dark' ? darkStyle.addButton : lightStyle.addButton}
                    onPress={() => navigation.navigate(t('Choose Schedule'))}                >
                    <Icon name="plus" size={24} color="#fff" />
                </TouchableOpacity>
            </>
        ) : (
        <View style={{ flex: 1 }}>
            <View style={theme === 'dark' ? darkStyle.buttonContainer : lightStyle.buttonContainer}><Button title={weekShown ? t("Week 1") : t("Week 2")} onPress={toggleWeeks} /></View>
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
                                    <Text style={theme === 'dark' ? darkStyle.title : lightStyle.title}>{t(item.course_name)}</Text>

                                    <View style={theme === 'dark' ? darkStyle.div_for_hour_and_dropdownArrow : lightStyle.div_for_hour_and_dropdownArrow}>
                                        <Text style={theme === 'dark' ? darkStyle.hour : lightStyle.hour}>{item.course_hour}</Text>
                                        <Icon name={expandedItem === item ? "angle-up" : "angle-down"} size={20} style={{ marginLeft: 10,color: theme === 'dark' ? '#FFFFFF' :'#000000', }} />
                                    </View>

                                    {/* Conditional rendering of confirmation icons */}
                                    {confirmDelete && (
                                        <View style={{ flexDirection: 'row' }}>
                                            <TouchableOpacity onPress={() => handleRemoveCourse(item)}>
                                                <Icon name="check" size={20} color="green" style={{ marginLeft: 10 }}/>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => setConfirmDelete(false)}>
                                                <Icon name="times" size={20} color="red" style={{ marginLeft: 10 }}/>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    {!confirmDelete && (
                                        <TouchableOpacity onPress={() => handleRemoveCourse(item)}>
                                            <Icon name="times" size={20}  style={{ marginLeft: 10,color: theme === 'dark' ? '#FFFFFF' :'#8f8f8f',  }}/>
                                        </TouchableOpacity>
                                    )}

                                    </View> 
                                {expandedItem === item && (
                                    <View style={theme === 'dark' ? darkStyle.dropdown : lightStyle.dropdown}>
                                        <Text style={{color: theme === 'dark' ? '#FFFFFF' :'#000000',}}>{t(item.course_type)}</Text>
                                        <View>
                                        <TouchableOpacity onPress={() => setIsModalVisible(true)} style={{ flexDirection: 'row' }}>
                                            <Text style={{color: theme === 'dark' ? '#FFFFFF' :'#000000',}}>{item.room}</Text>
                                            <Icon name="map-pin" style={modalstyles.icon} />
                                        </TouchableOpacity>
                                        <Modal
                                            animationType="slide"
                                            transparent={true}
                                            visible={isModalVisible}
                                            onRequestClose={() => setIsModalVisible(false)}
                                        >
                                            <View style={modalstyles.centeredView}>
                                            <View style={modalstyles.modalView}>
                                                <Text style={modalstyles.modalText}>Do you want to open Maps to view the location?</Text>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                                                <TouchableOpacity style={{ ...modalstyles.button, backgroundColor: '#2196F3' }} onPress={handleModalConfirm}>
                                                    <Text style={modalstyles.textStyle}>Open</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{ ...modalstyles.button, backgroundColor: '#FF0000' }} onPress={handleModalCancel}>
                                                    <Text style={modalstyles.textStyle}>Cancel</Text>
                                                </TouchableOpacity>
                                                </View>
                                            </View>
                                            </View>
                                        </Modal>
                                        </View>
                                        <Text style={{color: theme === 'dark' ? '#FFFFFF' :'#000000',}}>{item.professor}</Text>
                                    </View>
                                )}
                                
                                
                            </View>
                        </TouchableOpacity>
                    )}

                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={theme === 'dark' ? darkStyle.dayHeader : lightStyle.dayHeader}>{title}</Text>
                    )}
                    // onEndReached={() => setEndModalVisible(true)} // Add this line
                    // onBackdropPress={() => setEndModalVisible(false)}

                />

            </View>

            <TouchableOpacity style={theme === 'dark' ? darkStyle.addButton : lightStyle.addButton} onPress={addHour}><Icon name="plus" size={24} color="#fff" /></TouchableOpacity>
        </View>
        )}
        </View>
    );
};

export default HomeScreen;
