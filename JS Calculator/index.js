// Get the display element
const display = document.getElementById("display");
// Initialize history and memory variables
let history = [];
let memory = 0;
// Function to append input to the display
function appendToDisplay(input){
    if (isValidInput(input)) {
        display.value += input;
    }
}
// Function to validate input
function isValidInput(input) {
    const lastChar = display.value.slice(-1); // Get the last character in the display
    // Check if the input is a number, decimal point, or valid operator
    if (/[\d.]/.test(input) || (['+', '-', '*', '/'].includes(input) && !['+', '-', '*', '/'].includes(lastChar))) {
        return true;
    } else {
        return false;
    }
}
// Function to clear the display
function clearDisplay(){
    display.value = "";
}
// Function to perform calculation
function calculate(){
    try{
        const result = eval(display.value); // Evaluate the expression
        // Display the result with 3 decimal places if it's not an integer
        display.value = Number.isInteger(result) ? result : result.toFixed(3);
        addToHistory(display.value); // Add to history after calculation
    }
    catch(error){
        display.value = "Error"; // Display error message if calculation fails
    }
}
// Function to add result to history
function addToHistory(result) {
    history.push(result); // Push the result to the history array
    updateHistory(); // Update the history display
}
// Function to update history display
function updateHistory() {
    const historyElement = document.getElementById('history');
    historyElement.innerHTML = ''; // Clear previous history
    history.forEach((item, index) => {
        // Create a new div element for each history item
        const historyItem = document.createElement('div');
        historyItem.textContent = `Calculation ${index + 1}: ${item}`; // Set the text content
        historyElement.appendChild(historyItem); // Append the history item to the history display
    });
}
// Function to store value in memory
function storeMemory() {
    memory = parseFloat(display.value) || 0; // Parse the display value as a float, default to 0 if invalid
}
// Function to recall value from memory
function recallMemory() {
    display.value = memory.toString(); // Set the display value to the memory value as a string
}