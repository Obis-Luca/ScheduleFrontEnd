import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ScheduleContext = createContext();

export const ScheduleProvider = ({ children }) => {
	const [asyncStorageWeek1Schedule, saveWeek1Schedule] = useState([]);
	const [asyncStorageWeek2Schedule, saveWeek2Schedule] = useState([]);
	const [hiddenCourses, setHiddenCourses] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const saveSchedule = async (schedule1, schedule2, hiddenCourses) => {
		try {
		
			const validSchedule1 = schedule1 || [];
			const validSchedule2 = schedule2 || [];
			const validHiddenCourses = hiddenCourses || [];

			saveWeek1Schedule(schedule1);
			saveWeek2Schedule(schedule2);
			setHiddenCourses(hiddenCourses);
		
			await AsyncStorage.setItem("week1Schedule", JSON.stringify(validSchedule1));
			await AsyncStorage.setItem("week2Schedule", JSON.stringify(validSchedule2));
			await AsyncStorage.setItem("hiddenCourses", JSON.stringify(validHiddenCourses));
		  
		} catch (error) {
		  console.error("Error saving schedule:", error);
		}
	  };

	useEffect(() => {
		const loadSchedule = async () => {
			try {
				const week1 = await AsyncStorage.getItem("week1Schedule");
				const week2 = await AsyncStorage.getItem("week2Schedule");
				const hidden = await AsyncStorage.getItem("hiddenCourses");

				saveWeek1Schedule(week1 ? JSON.parse(week1) : []);
				saveWeek2Schedule(week2 ? JSON.parse(week2) : []);
				setHiddenCourses(hidden ? JSON.parse(hidden) : []);
				
			} catch (error) {
				console.error("Error loading schedule:", error);
				saveWeek1Schedule([]);
				saveWeek2Schedule([]);
				setHiddenCourses([]);
			} finally {
				setIsLoading(false);
			}
		};
		loadSchedule();
	}, []);

	return (
		<ScheduleContext.Provider value={{ asyncStorageWeek1Schedule, asyncStorageWeek2Schedule, hiddenCourses, saveSchedule, isLoading }}>
			{children}
		</ScheduleContext.Provider>
	);
};

export const useSchedule = () => useContext(ScheduleContext);
