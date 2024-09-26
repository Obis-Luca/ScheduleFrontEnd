import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { lightStyle, darkStyle, modalstyles } from "../../styles/HomePageStyles";

import { useTranslation } from 'react-i18next';
import { colors } from "../../constants/colors";
import { useColors } from "../../context/ColorsContext";


const truncateCourseName = (name) => {
  return name.length > 44 ? name.substring(0, 40) + ' ...' : name;
}

const CourseItem = ({ item, expandedItem, toggleItem, theme, handleOpenMaps }) => {
	
	const { t, i18n } = useTranslation();
  const { course, seminar, lab } = useColors();
  
  const getBackgroundColor = (courseType) => {
    
    switch(courseType) {
      case "Curs":
        return course;
      case "Seminar": 
        return seminar
      case "Laborator":
        return lab;
      default:
        return theme === "dark" ? colors.darkBackground : colors.lightBackground;
    }
  }
	
	return(
		<TouchableOpacity onPress={() => toggleItem(item)}>
			<View style={
        [theme === "dark" ? darkStyle.itemContainer : lightStyle.itemContainer, 
          { backgroundColor: getBackgroundColor(item.courseType) }]
}>
				<View style={theme === "dark" ? darkStyle.itemHeader : lightStyle.itemHeader}>
					<Text style={theme === "dark" ? darkStyle.title : lightStyle.title}>{
          expandedItem ? t(`course_names.${item.courseName}`) : truncateCourseName(t(`course_names.${item.courseName}`))
          }</Text>
					<View
						style={
							theme === "dark" ? darkStyle.div_for_hour_and_dropdownArrow : lightStyle.div_for_hour_and_dropdownArrow
						}>
						<Text style={theme === "dark" ? darkStyle.hour : lightStyle.hour}>{item.courseHour}</Text>
						<Icon
							name={expandedItem === item ? "angle-up" : "angle-down"}
							size={20}
							style={{ marginLeft: 10, color: "#4A90E2" }}
						/>
					</View>
				</View>
				{expandedItem === item && (
					<View style={theme === "dark" ? darkStyle.dropdown : lightStyle.dropdown}>
						<Text style={{ color: theme === "dark" ? "#FFFFFF" : "#000000" }}>{t(`home_page.${item.courseType}`)}</Text>
						<TouchableOpacity onPress={handleOpenMaps} style={{ flexDirection: "row" }}>
							<Text style={{ color: theme === "dark" ? "#FFFFFF" : "#000000" }}>{item.room}</Text>
							<Icon name="map-pin" style={modalstyles.icon} />
						</TouchableOpacity>
						<Text style={{ color: theme === "dark" ? "#FFFFFF" : "#000000" }}>{item.professor}</Text>
					</View>
				)}
			</View>
		</TouchableOpacity>
	
	)
};

export default CourseItem;