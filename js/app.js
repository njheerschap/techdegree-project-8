// Variables

let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector('.grid-container');
const card = document.querySelector('.card');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');
const searchBar = document.querySelector('#search-bar')

// Fetch API

fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err));


// Display Employees

function displayEmployees(employeeData) {
    employees = employeeData;

    let employeeHTML = '';

    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;
        employeeHTML += `
            <div class="card" data-index="${index}">
                <img src="${picture.large}" alt="" class="avatar">
                <div class="text-container">
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${city}</p>
                </div>
            </div>
        `
    })
    gridContainer.innerHTML = employeeHTML;
}

// Display Modal with additional Employee Info 

function displayModal(index) {
    console.log(employees[index])
    let name = employees[index].name;
    let email = employees[index].email;
    let phone = employees[index].phone;
    let city = employees[index].location.city;
    let street = employees[index].location.street;
    let state = employees[index].location.state;
    let postcode = employees[index].location.postcode;
    let dob = new Date(employees[index].dob.date);
    let picture = employees[index].picture;

    const modalHTML = `
        <img src="${picture.large}" alt="" class="modal-avatar">
        <div class="text-container">
            <h2 class="name modal-name">${name.first} ${name.last}</h2>
            <p class="email modal-email">${email}</p>
            <p class="address modal-address">${city}</p>
            <hr>
            <p class="phone">${phone}</p>
            <p class="address modal-address">${street.number} ${street.name}, ${state} ${postcode}</p>
            <p class="dob">Birthday: ${dob.getMonth()}/${dob.getDay()}/${dob.getFullYear()}</p>
        </div>
    `
    overlay.classList.remove('hidden');
    modalContainer.innerHTML = modalHTML;

}

gridContainer.addEventListener('click', e => {
    if(e.target !== gridContainer) {

        const card = e.target.closest('.card');
        const index = card.getAttribute('data-index');

        displayModal(index);
    }
});

// Close Modal 

modalClose.addEventListener('click', () => {
    overlay.classList += ' hidden';
})

// Employee Search 

searchBar.addEventListener('keyup', e => {
    const userInput = e.target.value.toLowerCase();
    const employeesToSearch = document.querySelectorAll('.name');
    employeesToSearch.forEach((current) => {
        const employeeCard = current.parentNode.parentNode
        if(current.textContent.toLocaleLowerCase().indexOf(userInput) === -1) {
            employeeCard.style.display='none';
            modalContainer.style.display = '';
        } else {
            employeeCard.style.display = '';
        }
    })
    
})