// global variables
let calculate = '';
let draggedElement;
let draggedElementParent;
let currentElement;

//dom element
const resultField = document.querySelector('.result');
const startBtn = document.querySelector('.start');
const numberButtons = document.querySelectorAll('.number-container');
const specialButtons = document.querySelectorAll('.special-container');
const equelButton = document.querySelector('.equel');
const acButton = document.querySelector('.ac');

//shuffle numbers
function shuffleCalculator() {
    let numbersArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let i = 0;
    while (numbersArray.length != 0) {
        // randomize button container numbers
        const randomNumber = Math.floor(Math.random() * numbersArray.length);
        const randomizedNumber = numbersArray.splice(randomNumber, 1);
        numberButtons[i].attributes[1].value = randomizedNumber;
        i += 1;
    }
}

function checkIfWon() {
    const currentButtonContainer = [];
    const currentButtonValue = [];
    
    for (let i = 0; i < 10; i += 1) {
        currentButtonContainer.push(numberButtons[i].attributes[1].value);
        currentButtonValue.push(numberButtons[i].children[0].innerText);
    }

    if(JSON.stringify(currentButtonContainer) === JSON.stringify(currentButtonValue) ) {
        for(button of numberButtons) {
            button.children[0].classList.remove('flash');                
            button.children[0].classList.add('won');                
        }
    }
    console.log('inner value', currentButtonContainer);
    console.log('button value', currentButtonValue);
}

//number buttons event listeners
for (const button of numberButtons ) {
    button.addEventListener('click', (event) => {        
        if(resultField.innerText === '0') {
            resultField.innerText = '';
        }
        resultField.innerText += event.target.innerText;
        calculate += event.target.parentElement.attributes[1].value;
        button.classList.add('disable');
        console.log(calculate);
    })
}

//special buttons event listeners
for (const special of specialButtons) {
    special.addEventListener('click', (event) => {
        if(calculate === '') {
            return
        }
        special.classList.add('disable');
        calculate += event.target.parentElement.attributes[1].value;
        resultField.innerText += event.target.parentElement.attributes[1].value;

        // console.log(calculate);
    })
}

equelButton.addEventListener('click', () => {
    const result = eval(calculate) || '0';
    resultField.innerText = result;
    for (const button of numberButtons ) {
        button.classList.remove('disable');
    }
    for (const special of specialButtons ) {
        special.classList.remove('disable');
    }
})

acButton.addEventListener('click', () => {
    resultField.innerText = '0';
    calculate = '';
    for (const button of numberButtons ) {
        button.classList.remove('disable');
    }
    for (const special of specialButtons ) {
        special.classList.remove('disable');
    }
})

startBtn.addEventListener('click', (event) => {
    // array to reset button numbers to initial locations
    let intialNumbersArray = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
    let i = 0;
    for(button of numberButtons) {
        button.children[0].classList.add('flash');   
        //reactivate flash animation on button
        let oldButton = button.children[0];
        let newButton = button.children[0].cloneNode(true);
        button.replaceChild(newButton, oldButton);
        // set button to intial state
        button.children[0].classList.remove('won');   
        button.classList.remove('disable')  
        button.children[0].innerText = intialNumbersArray[i];
        i += 1;
    }
    resultField.innerText = '0';
    calculate = '';
    shuffleCalculator();
})

//drag and drop functionality
for(const button of numberButtons) {
    button.addEventListener('dragstart', () => {
        draggedElement = event.target;
        draggedElementParent = event.target.parentElement;
    })

    button.addEventListener('dragenter', (event) => {
        if(event.target.className === 'button flash') {
            event.target.style.opacity = .7;
        }
    })

    button.addEventListener('dragover', (event) => {
        event.preventDefault();
    })

    button.addEventListener('dragleave', (event) => {
        if(event.target.className === 'button flash') {
            event.target.style.opacity = '';
        }
    })

    button.addEventListener('drop', (event) => {
        event.preventDefault();
        if(event.target.parentElement.className === 'botton-container number-container') {
            currentElement = event.target;
            event.target.style.opacity = '';
            currentElement.parentElement.replaceChild(draggedElement, currentElement);
            draggedElementParent.appendChild(currentElement);
        }
        resultField.innerText = '0';
        calculate = '';
        checkIfWon()
    })
}