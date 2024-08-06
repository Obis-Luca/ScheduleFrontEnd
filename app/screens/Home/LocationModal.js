import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { modalstyles } from "../../styles/HomePageStyles";

const LocationModal = ({ isVisible, onConfirm, onCancel }) => (
	<Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onCancel}>
		<View style={modalstyles.centeredView}>
			<View style={modalstyles.modalView}>
				<Text style={modalstyles.modalText}>Do you want to open Maps to view the location?</Text>
				<View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20 }}>
					<TouchableOpacity style={{ ...modalstyles.button, backgroundColor: "#2196F3" }} onPress={onConfirm}>
						<Text style={modalstyles.textStyle}>Open</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{ ...modalstyles.button, backgroundColor: "#FF0000" }} onPress={onCancel}>
						<Text style={modalstyles.textStyle}>Cancel</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	</Modal>
);

export default LocationModal;
