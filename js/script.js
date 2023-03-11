'use strict';

const lengthNumber = document.querySelector('.password__character-length');
const copyButton = document.querySelector('.password__copy-btn');

const checkBoxes = document.querySelectorAll('.password__checkbox');
const slider = document.querySelector('.password__character-slider');
const upperCaseCheckBox = document.querySelector('#password__checkbox--uppercase');
const lowerCaseCheckBox = document.querySelector('#password__checkbox--lowercase');
const includeNumbersCheckBox = document.querySelector('#password__checkbox--numbers');
const includeSymbolsCheckBox = document.querySelector('#password__checkbox--symbols');

const generatedPassword = document.querySelector('.password__value');
const generateButton = document.querySelector('.password__btn-generate');

const barsElement = document.querySelectorAll('.password__strength-bar');
const barText = document.querySelector('.password__strength-text');
const errorMessage = document.querySelector('.password__error-message');

// Initially
let sliderValue = 10;
let modifiedString = '';

generatedPassword.value = 'PTx1f5DaFX';

const digits = '0123456789';
const capitalLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const smallLetters = 'abcdefghijklmnopqrstuvwxyz';
const symbols = "!@#$%^&*(){}[]=<>/,."

let includeUpperCaseLetter = false;
let includeLowerCaseLetter = false;
let includeNumbers = false;
let includeSymbols = false;

let keysArray = [includeNumbers, includeLowerCaseLetter, includeUpperCaseLetter, includeSymbols];
let valuesArray = [digits, smallLetters, capitalLetters, symbols];


// Slider
slider.addEventListener('input', () => {
    lengthNumber.textContent = slider.value;
    sliderValue = slider.value;
})


// Password Strength
function displayPasswordStrength() {
    let strength = 0;
    for (const checkBox of checkBoxes) {
        if (checkBox.checked) {
            strength = strength + 1;
        }
    }

    function updateBarColor() {
        barsElement.forEach((bar, index) => {
            if (index < strength) {
                bar.classList.add('bar-active');
            } else {
                bar.classList.remove('bar-active');
            }
        })
    }

    if (strength === 0) {
        errorMessage.classList.remove('hidden');
    } else {
        errorMessage.classList.add('hidden');
        if (strength === 1) {
            barText.textContent = 'Too Weak!';
            updateBarColor();
        } else if (strength === 2) {
            barText.textContent = 'Weak';
            updateBarColor();
        } else if (strength === 3) {
            barText.textContent = 'Medium';
            updateBarColor();
        } else if (strength === 4) {
            barText.textContent = 'Strong';
            updateBarColor();
        }
    }
}


// Checkboxes
function userInputInformation() {
    includeUpperCaseLetter = upperCaseCheckBox.checked;
    includeLowerCaseLetter = lowerCaseCheckBox.checked;
    includeNumbers = includeNumbersCheckBox.checked;
    includeSymbols = includeSymbolsCheckBox.checked;
    keysArray = [includeNumbers, includeLowerCaseLetter, includeUpperCaseLetter, includeSymbols]
}

// Password Generator
function generatePassword() {
    modifiedString = '';
    userInputInformation();
    for (let i = 0; i < keysArray.length; i++) {
        if (keysArray[i]) {
            modifiedString = modifiedString + valuesArray[i];
        }
    }

    let password = '';
    for (let i = 0; i < sliderValue; i++) {
        let random = modifiedString.charAt(Math.random() * (modifiedString.length - 1));
        password = password + random;
    }
    displayPasswordStrength();
    generatedPassword.value = password;
}

generateButton.addEventListener('click', generatePassword);


// Copy to clipboard
const copiedText = document.querySelector(".password__copy-text");

copyButton.addEventListener("click", copyToClipboard);

function copyToClipboard() {
    let copyContent = generatedPassword.value;
    navigator.clipboard.writeText(copyContent).then(copiedText.classList.remove("hidden"));
    setTimeout(() => {
        copiedText.classList.add("hidden");
    }, 4000);
}

