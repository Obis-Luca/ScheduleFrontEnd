export function compareData(a, b) {
	const dayIndexMap = {
		Luni: 1,
		Marti: 2,
		Miercuri: 3,
		Joi: 4,
		Vineri: 5,
	};

	const indexDayA = dayIndexMap[a.courseDay];
	const indexDayB = dayIndexMap[b.courseDay];

	if (indexDayA !== indexDayB) return indexDayA - indexDayB;

	const [startHourA, endHourA] = a.courseHour.split("-").map((hour) => parseInt(hour));
	const [startHourB, endHourB] = b.courseHour.split("-").map((hour) => parseInt(hour));

	if (startHourA !== startHourB) return startHourA - startHourB;
	else return endHourA - endHourB;
}
