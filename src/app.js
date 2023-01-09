import {Question} from './question';
import './styles.css';
import { isValid } from './utils';

const form = document.getElementById('form');
const input = form.querySelector('#question-input');
const submitBtn = form.querySelector('#submit');

form.addEventListener('submit', submitFormHandler);
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