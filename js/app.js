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
    const name = employees[index].name;
    const email = employees[index].email;
    const phone = employees[index].phone;
    const city = employees[index].location.city;
    const street = employees[index].location.street;
    const state = employees[index].location.state;
    const postcode = employees[index].location.postcode;
    const dob = new Date(employees[index].dob.date);
    const picture = employees[index].picture;

    const modalHTML = `
        <div class="modal-html" modal-index="${index}"> 
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

const next = document.querySelector('.modal-next');
const previous = document.querySelector('.modal-previous');

next.addEventListener('click', e => {
    const modalIndex = parseInt(document.querySelector('.modal-html').getAttribute('modal-index'));
    const modalAdd = modalIndex + 1;
    const index = modalAdd.toString();
    const modalNumber = parseInt(document.querySelector('.modal-html').getAttribute('modal-index'))
    if (modalNumber < 11) {
        displayModal(index);
    }
})


previous.addEventListener('click', e => {
    const modalIndex = parseInt(document.querySelector('.modal-html').getAttribute('modal-index'));
    const modalAdd = modalIndex - 1;
    const index = modalAdd.toString();
    const modalNumber = parseInt(document.querySelector('.modal-html').getAttribute('modal-index'))
    if (modalNumber > 0) {
        displayModal(index);
    }
})