import {useEffect} from "react";

// export const handleSubmit = (group_id,specialization_id, year) => {
//
//   // Check if all options are selected
//     fetch(`http://192.168.1.7:8000/api/courses_filter/?group_id=${group_id}&specialisation_id=${specialization_id}&year=${year}`)
//         .then(response => response.json())
//         .then(data => {
//           populateWeeks(data);
//
//         })
//         .catch(error => {
//           console.error('Error fetching faculties:', error);
//         });
//
// };

let DataWeek1 = [];
let DataWeek2 = [];

export const populateWeeks = (group_id,specialization_id, year) => {

  fetch(`http://127.0.0.1:8000/api/courses_filter/?group_id=${group_id}&specialisation_id=${specialization_id}&year=${year}`)
      .then(response => response.json())
      .then(data => {
        data.forEach(course => {
          // If freq is empty or 'sapt. 1', add to DataWeek1
          if (course.freq === "1") {
            DataWeek1.push(course);
          }
          // If freq is empty or 'sapt. 2', add to DataWeek2
          else if (course.freq === "2") {
            DataWeek2.push(course);
          }
          else
          {
            DataWeek1.push(course);
            DataWeek2.push(course);
          }
        });
        return DataWeek1, DataWeek2;


      })
      .catch(error => {
        console.error('Error fetching faculties:', error);
      });

}


// export let DataWeek1 = [
//
//
// ];
//
// export let DataWeek2 = [
//
// ];
