const visitForm = document.forms.visitForm;
const doctor = visitForm.doctor;
const form = document.forms.login;
const editForm = document.forms.editForm;
const editDoctor = editForm.doctor;

import { getToken } from "./authorization.js";
import { VisitCardiologist } from "./classes.js";
import { VisitDentist } from "./classes.js";
import { VisitTherapist } from "./classes.js";
import { Visit } from "./classes.js";

if (localStorage.getItem('token')) {
    viewCards();
} 

// get token
form.addEventListener('submit', (el) => {
    el.preventDefault(); 

    const loginBtn = document.querySelector('.header__btn-login');
    const createBtn = document.querySelector('.header__btn-create-visit');
    const noitems = document.querySelector('.main__items-text');
    const welcome = document.querySelector('.main__text-wrapper');
    const cardsWrapper = document.querySelector('.main__cards-wrapper');

    loginBtn.classList.add('d-none');
    createBtn.classList.remove('d-none');
    noitems.classList.remove('d-none');
    welcome.classList.add('d-none');
    cardsWrapper.classList.remove('d-none');

    async function login() {
        await getToken();
        await viewCards();
    }

    login();
   
})


// choose a doctor
doctor.addEventListener('change', () => {
    
    const cardiologist = document.querySelector('.cardiologist-options');
    const dentist = document.querySelector('.dentist-options');
    const therapist = document.querySelector('.therapist-options');

    switch(doctor.value) {
        case 'cardiologist':  
            cardiologist.classList.remove('d-none');
            dentist.classList.add('d-none');
            therapist.classList.remove('d-none');   
            break;

        case 'dentist':  
            dentist.classList.remove('d-none');
            cardiologist.classList.add('d-none');
            therapist.classList.add('d-none');   
            break;

        case 'therapist':  
            therapist.classList.remove('d-none');
            cardiologist.classList.add('d-none');
            dentist.classList.add('d-none');
            break;
        
        default:
            break;
    }    
})




// create card
async function createCard() {

    try {
        let response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                doctor: `${doctor.value}`,
                purpose: `${visitForm.purpose.value}`,
                description: `${visitForm.description.value}`,
                priority: `${visitForm.priority.value}`,
                name: `${visitForm.name.value}`,
                pressure: `${visitForm.pressure.value}`,
                bodyMassIndex: `${visitForm.bodyMassIndex.value}`,
                heart: `${visitForm.heart.value}`,
                age: `${visitForm.age.value}`,
                lastVisit: `${visitForm.lastVisit.value}`,
            })
        })    
        
        let card = await response.json(); 
        console.log(card);

        viewCards();
        
    } catch (err) {
        alert(err.message)
    }
}

visitForm.addEventListener('submit', (el) => {
    el.preventDefault(); 
    createCard();
    let modal = document.getElementById('create-visit');
    let modalInstance = bootstrap.Modal.getInstance(modal); // Отримати екземпляр модального окна
    modalInstance.hide();
    visitForm.reset(); 
})


// view all cards
async function viewCards() {

	let response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    let cards = await response.json(); 
    console.log(cards);

    

    const loginBtn = document.querySelector('.header__btn-login');
    const createBtn = document.querySelector('.header__btn-create-visit');
    const noitems = document.querySelector('.main__items-text');
    const welcome = document.querySelector('.main__text-wrapper');
    const cardsWrapper = document.querySelector('.main__cards-wrapper');

    loginBtn.classList.add('d-none');
    createBtn.classList.remove('d-none');
    noitems.classList.remove('d-none');
    welcome.classList.add('d-none');
    cardsWrapper.classList.remove('d-none');

    if (cards.length) {
        noitems.classList.add('d-none');
    }

    cardsWrapper.innerHTML = '';


    cards.forEach(card => {	

        if (card.doctor === 'cardiologist') {
            const visitCardiologist = new VisitCardiologist(card.doctor, card.purpose, card.description, card.priority, card.name, card.id, card.pressure, card.bodyMassIndex, card.heart, card.age );
            const cardElement = visitCardiologist.render();
            cardElement.setAttribute('data-id', card.id);
            cardsWrapper.append(cardElement);
        } else if (card.doctor === 'dentist') {
            const visitDentist = new VisitDentist(card.doctor, card.purpose, card.description, card.priority, card.name, card.id, card.lastVisit );
            const cardElement = visitDentist.render();
            cardElement.setAttribute('data-id', card.id);
            cardsWrapper.append(cardElement);
        } else if (card.doctor === 'therapist') {
            const visitTherapist = new VisitTherapist(card.doctor, card.purpose, card.description, card.priority, card.name, card.id, card.age );
            const cardElement = visitTherapist.render();
            cardElement.setAttribute('data-id', card.id);
            cardsWrapper.append(cardElement);
        } else {
            const visit = new Visit(card.doctor, card.purpose, card.description, card.priority, card.name, card.id);
            const cardElement = visit.render();
            cardElement.setAttribute('data-id', card.id);
            cardsWrapper.append(cardElement);
        }
        	       
	}); 
}


