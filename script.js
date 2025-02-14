let startTime;
let endTime;
let isTyping = false;
let correctChars = 0;
let totalChars = 0;

const textToType = document.getElementById("text-to-type").innerText;
const userInput = document.getElementById("user-input");
const timeElement = document.getElementById("time");
const speedElement = document.getElementById("speed");
const accuracyElement = document.getElementById("accuracy");

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
        if (typedText[i] === textToType[i]) {
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

    if (typedText === textToType) {
        endTime = new Date();
        isTyping = false;
        alert("Congratulations! You've completed the typing test.");
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
}
