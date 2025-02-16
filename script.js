let startTime;
let endTime;
let isTyping = false;
let correctChars = 0;
let totalChars = 0;

const textList = [
    "Typing speed test helps you to practice your typing speed and accuracy.",
    "Learning to type faster can help you be more efficient in your work and studies.",
    "A typing test is a great way to monitor your typing skills over time.",
    "Improve your typing speed and precision with regular practice.",
    "Typing accurately and quickly is a valuable skill in many professional fields."
];

const textToTypeElement = document.getElementById("text-to-type");
const userInput = document.getElementById("user-input");
const timeElement = document.getElementById("time");
const speedElement = document.getElementById("speed");
const accuracyElement = document.getElementById("accuracy");

function getRandomText() {
    const randomIndex = Math.floor(Math.random() * textList.length);
    return textList[randomIndex];
}

function checkTyping() {
    const typedText = userInput.value;

    if (!isTyping) {
        startTime = new Date();
        isTyping = true;
    }

    totalChars = typedText.length;

    // Count correct characters
    correctChars = 0;
    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === textToTypeElement.innerText[i]) {
            correctChars++;
        }
    }

    // Display accuracy and typing speed
    const accuracy = (correctChars / totalChars) * 100;
    const timeTaken = (new Date() - startTime) / 1000;
    const speed = (totalChars / 5) / (timeTaken / 60);

    timeElement.textContent = timeTaken.toFixed(2);
    speedElement.textContent = speed.toFixed(2);
    accuracyElement.textContent = accuracy.toFixed(2);

    if (typedText === textToTypeElement.innerText) {
        endTime = new Date();
        isTyping = false;
        alert("Congratulations! You've completed the typing test.");
        
        // Change text after completion
        textToTypeElement.innerText = getRandomText();
        userInput.value = ''; // Clear user input
    }
}

function resetTest() {
    userInput.value = '';
    correctChars = 0;
    totalChars = 0;
    timeElement.textContent = '0';
    speedElement.textContent = '0';
    accuracyElement.textContent = '0';
    isTyping = false;

    // Reset the text to the first item in the text list
    textToTypeElement.innerText = getRandomText();
}
