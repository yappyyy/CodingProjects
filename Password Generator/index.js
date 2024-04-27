function generatePassword(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols){
    
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+-=";

    let allowedChars = "";
    let password = "";

    allowedChars += includeLowercase ? lowercaseChars : "";
    allowedChars += includeUppercase ? uppercaseChars : "";
    allowedChars += includeNumbers ? numberChars : "";
    allowedChars += includeSymbols ? symbolChars : "";

    if(length <= 0){
        return '(password length must be at least 1)'
    }
    if(allowedChars.length === 0){
        return `(At least 1 set of character needs to be selected)`;
    }
    for(let i = 0; i < length; i++){
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
    }

    return password;
}

// Function to estimate password strength
function estimatePasswordStrength(password) {
    const length = password.length;
    let complexity = 0;

    // Increase complexity based on length and included character types
    complexity += length * 4; // Assign a score of 4 per character
    if (/[a-z]/.test(password)) complexity += 2; // Include lowercase letters
    if (/[A-Z]/.test(password)) complexity += 2; // Include uppercase letters
    if (/\d/.test(password)) complexity += 2; // Include numbers
    if (/[^a-zA-Z0-9]/.test(password)) complexity += 4; // Include symbols

    console.log('Length:', length);
    console.log('Complexity:', complexity); // Add this line for debugging

    return complexity;
}


function estimateCrackingTime(strength) {
    // Define the average time required to crack a password of given strength
    // These are rough estimates and can be adjusted based on more accurate data
    const averageTimePerGuess = 0.00000000001; // 1 guess per 10 nanoseconds

    let guesses = 10 ** strength; // Number of possible guesses based on password strength

    let seconds = guesses * averageTimePerGuess;

    console.log('Strength:', strength);
    console.log('Initial Guesses:', guesses); // Add this line for debugging

    const units = ['second', 'minute', 'hour', 'day', 'year'];
    let unitIndex = 0;

    while (seconds >= 60 && unitIndex < units.length - 1) {
        seconds /= 60;
        unitIndex++;
    }

    const roundedTime = Math.round(seconds);
    const selectedUnit = units[unitIndex];

    // Adjust the output based on the selected unit and pluralize if necessary
    const formattedTime = `${roundedTime} ${selectedUnit}${roundedTime !== 1 ? 's' : ''}`;

    console.log('Formatted Time:', formattedTime); // Add this line for debugging

    return formattedTime;
}

function updateGeneratedPassword() {
    const passwordLengthElement = document.getElementById('length');
    const passwordLength = parseInt(passwordLengthElement.value, 10); // Parse the input value as an integer

    // Ensure passwordLength is a valid number greater than 0
    if (!passwordLength || isNaN(passwordLength) || passwordLength <= 0) {
        const passwordTextArea = document.getElementById('generatedPassword');
        passwordTextArea.value = 'Invalid password length. Please enter a valid number greater than 0.';
        return; // Exit the function if the password length is invalid
    }

    const includeLowercase = document.getElementById('lowercase').checked;
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSymbols = document.getElementById('symbols').checked;

    const generatedPassword = generatePassword(passwordLength, includeLowercase, includeUppercase, includeNumbers, includeSymbols);
    const strength = estimatePasswordStrength(generatedPassword);
    const crackingTime = estimateCrackingTime(strength);

    const passwordTextArea = document.getElementById('generatedPassword');
    passwordTextArea.value = `Generated Password: ${generatedPassword}\nEstimated Cracking Time: ${crackingTime}`;
}

// Add event listener to the "Generate Password" button
document.getElementById('generateBtn').addEventListener('click', updateGeneratedPassword);

// Function to toggle dark mode
function toggleDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const slider = document.querySelector('.slider'); // Select the slider element

    if (darkModeToggle.checked) {
        body.classList.add('dark-mode');
        slider.style.backgroundColor = '#2196F3'; // Change slider color in dark mode
    } else {
        body.classList.remove('dark-mode');
        slider.style.backgroundColor = '#ccc'; // Change slider color in light mode
    }
}

// Add event listener to dark mode toggle switch
document.getElementById('darkModeToggle').addEventListener('change', toggleDarkMode);