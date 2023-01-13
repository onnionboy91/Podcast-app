import {Question} from './question';
import './styles.css';
import { createModal, isValid } from './utils';
import { getAuthForm } from './auth';
import { authWithEmailAndPassword } from './auth';

const form = document.getElementById('form');
const modalBtn = document.getElementById('modal-btn');
const input = form.querySelector('#question-input');
const submitBtn = form.querySelector('#submit');


window.addEventListener('load', Question.renderList);
form.addEventListener('submit', submitFormHandler);
modalBtn.addEventListener('click', openModal);
input.addEventListener('input', () => {
    submitBtn.dislabed = !isValid(input.value);
});

function submitFormHandler(event) {
    event.preventDefault();

    if(isValid(input.value)) {
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON()
        };

        submitBtn.disabled = true;
        //Async request to server to save question
        Question.create(question).then( () => {
            input.value = '';
            input.className = '';
            submitBtn.disabled = false;
        });  
    }
}

function openModal() {
    createModal('Авторизация', getAuthForm())
    document.getElementById('auth-form').addEventListener('submit', authFormHandler, {once: true})
}

function authFormHandler(event) {
    event.preventDefault();

    const email = event.target.querySelector('#email').value;
    const password = event.target.querySelector('#password').value;

    authWithEmailAndPassword(email, password)
       .then(Question.fetch)
}