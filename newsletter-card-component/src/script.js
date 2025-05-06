// variables
let input_modified = false;

// handlers
const input = document.querySelector('input');
const checkbox = document.querySelector('.checkbox');
const button = document.querySelector('.main-button');
const dialog = document.querySelector("dialog");

// events
checkbox.addEventListener('click', checkboxClick);
input.addEventListener('focus', inputGetFocus);
input.addEventListener('blur', inputLostFocus);
input.addEventListener('input', inputModified);
button.addEventListener('click', buttonClick);

//functions
function checkboxClick(){
    checkbox.classList.toggle('checked');
}

function inputGetFocus(){
    if (!input_modified) {
        input.placeholder = '';
        input_modified = true;
    }
}

function inputLostFocus(){
    if (input.placeholder === '') {
        input.placeholder = 'Enter your email address';
        input_modified = false;
    }
}

function inputModified(){

    if (input.value === '') {
        input.classList.remove('invalid');
        input.classList.remove('valid');
    }else if (!emailValidity(input.value)) {
        input.classList.remove('valid');
        input.classList.add('invalid');
    } else {
        input.classList.remove('invalid');
        input.classList.add('valid');
    }
}

function buttonClick(){
    if(!checkbox.classList.contains('checked')) {
        alert('Please agree the terms and conditions before subscribing');
        return;
    }
    if(!emailValidity(input.value)) {
        alert('Please enter a valid email address');
        return;   
    }
    document.querySelector('.enterthemail').textContent = `Your email: ${input.value}`;
    dialog.showModal();
}

function emailValidity(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}