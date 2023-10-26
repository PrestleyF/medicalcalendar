const calendar = document.getElementById('calendar');
const monthEl = document.getElementById('month');
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();


const drawBlankCalendar = () =>{
    for(let i=0; i < 35; i++){
      const day = document.createElement('div')
      day.classList.add('day')

      const dayText = document.createElement('p')
      dayText.classList.add('day-text');
      dayText.innerText = days[i%7]; 

      const dayNumber = document.createElement('p')
      dayNumber.classList.add('day-number')

      const eventName = document.createElement('small')
      eventName.classList.add('event-name');

      day.appendChild(dayText);
      day.appendChild(dayNumber)    
      day.appendChild(eventName)
      console.log(day)
      calendar.appendChild(day);
    }
};

const updateCalendar = (month, year, events) => {
    const dayElements = document.querySelectorAll('.day');
    
    const theFirst = new Date(year, month, 1); //made changes, added (year, month, 1) here 19/10/23
    theFirst.setMonth(month);
    theFirst.setFullYear(year);

    const theFirstDayOfWeek = theFirst.getDay();
    const monthWithYear = `${year} - ${months[month]}`;

    monthEl.innerText = monthWithYear;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let dayCounter = 1;
    for(let i = 0; i < dayElements.length; i++){
        const day = dayElements[i];
        const dayNumber = day.querySelector('.day-number');

        if(i >= theFirstDayOfWeek && dayCounter <= daysInMonth){
            dayNumber.innerText = dayCounter;
            dayCounter++;
        } else {
            dayNumber.innerText = ''; // Clear day number if it's not in the current month
        }
    }
}


const previousMonth = () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11; // Reset to December when transitioning from January
        currentYear--; // Decrement the year when transitioning to the previous year
    }
    updateCalendar(currentMonth, currentYear);
}

const nextMonth = () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0; // Reset to January when currentMonth is 12 (December)
        currentYear++; // Increment the year when transitioning to the next year
    }
    updateCalendar(currentMonth, currentYear);
}

document.addEventListener('DOMContentLoaded', function(){
    const calendar = document.getElementById('calendar');
    calendar.addEventListener('click', function(event){
        const clickedDay = event.target;
        if(clickedDay.classList.contains('day-number')){
            const selectedDate = clickedDay.innerText;
            openNotesApp(selectedDate);
        }
    })
})

function openNotesApp(selectedDay){
    const notesAppUrl = `path/tp/notes-app?date=${selectedDay}`;
    window.open(notesAppUrl, '_blank');

}
drawBlankCalendar();
updateCalendar(currentMonth, currentYear);