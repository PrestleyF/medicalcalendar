const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const dateElement = document.getElementById('date-element-id');

function addTask(){
  if(inputBox.value === ''){
    alert('Please write a task')
  }
  else {
    let li = document.createElement('li')
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value ='';
  saveData();
}

listContainer.addEventListener('click', function (e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle('checked');
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove()
        saveData();
    }
}, false) 


//storing data/ items in the local storage so when re refrehs a page it doesnt disappear after every refresh or closing of the html page. 

function saveData(){
  localStorage.setItem("data", listContainer.innerHTML);
}
// function showList(){
//     listContainer.innerHTML = localStorage.getItem("data");
// }
// showList();

function showList() {
  const urlParams = new URLSearchParams(window.location.search);
  const selectedDate = urlParams.get('date');
  if (selectedDate) {
      dateElement.innerText = selectedDate;
      const storedNotes = localStorage.getItem(selectedDate);
      if (storedNotes) {
          listContainer.innerHTML = storedNotes;
      } else {
          listContainer.innerHTML = ''; // Clear the list if no notes are found for the selected date
      }
  } else {
      dateElement.innerText = 'No Date Selected'; // Handle case when no date is selected
      listContainer.innerHTML = ''; // Clear the list if no date is selected
  }
}
