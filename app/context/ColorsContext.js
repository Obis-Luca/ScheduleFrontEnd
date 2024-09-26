import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "react-native-paper";
import { colors } from "../constants/colors";

const ColorsContext = createContext();

export const ColorsProvider = ({ children }) => {
	const {theme} = useTheme();

	const [course, setCourse] = useState(null);
	const [seminar, setSeminar] = useState(null);
	const [lab, setLab] = useState(null);

	const setColors = (type, color) => {
		switch (type) {
			case "course":
				setCourse(color);
				AsyncStorage.setItem("course", color);
				break;
			case "seminar":
				setSeminar(color);
				AsyncStorage.setItem("seminar", color);
				break;
			case "lab":
				setLab(color);
				AsyncStorage.setItem("lab", color);
				break;
			default:
				break;
		}
	}

	useEffect(() => {
		AsyncStorage.getItem("course").then((color) => {
			if (color) {
				setCourse(color);
			}
		});
		AsyncStorage.getItem("seminar").then((color) => {
			if (color) {
				setSeminar(color);
			}
		});
		AsyncStorage.getItem("lab").then((color) => {
			if (color) {
				setLab(color);
			}
		});
	});

	return (
		<ColorsContext.Provider value={{ course, seminar, lab, setColors }}>
			{children}
		</ColorsContext.Provider>
	);
};

export const useColors = () => useContext(ColorsContext);

