import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { lightStyle, darkStyle, modalstyles } from "../../styles/HomePageStyles";

const truncateCourseName = (name) => {
  return name.length > 20 ? name.substring(0, 15) + '...' : name;
};

const CourseItem = ({ item, expandedItem, toggleItem, theme, handleOpenMaps }) => (
  <TouchableOpacity onPress={() => toggleItem(item)}>
    <View style={theme === "dark" ? darkStyle.itemContainer : lightStyle.itemContainer}>
      <View style={theme === "dark" ? darkStyle.itemHeader : lightStyle.itemHeader}>
        <Text style={theme === "dark" ? darkStyle.title : lightStyle.title}>
          {expandedItem === item ? item.courseName : truncateCourseName(item.courseName)}
        </Text>
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
          <Text style={{ color: theme === "dark" ? "#FFFFFF" : "#000000" }}>{item.courseType}</Text>
          <TouchableOpacity onPress={handleOpenMaps} style={{ flexDirection: "row" }}>
            <Text style={{ color: theme === "dark" ? "#FFFFFF" : "#000000" }}>{item.room}</Text>
            <Icon name="map-pin" style={modalstyles.icon} />
          </TouchableOpacity>
          <Text style={{ color: theme === "dark" ? "#FFFFFF" : "#000000" }}>{item.professor}</Text>
        </View>
      )}
    </View>
  </TouchableOpacity>
);

export default CourseItem;