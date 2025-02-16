let wordsEasy = ["apple", "cat", "dog"];
let wordsMedium = ["banana", "computer", "elephant"];
let wordsHard = ["unbelievable", "extraordinary", "phenomenon"];

let linesEasy = [
    "The cat sat on the mat and played with the ball of yarn.",
    "I like to go to the park and walk around the trees.",
    "She has a dog and a cat and loves them very much."
];

let linesMedium = [
    "The quick brown fox jumped over the lazy dog near the river.",
    "Technology is advancing rapidly, making life easier in many ways.",
    "We are learning new things every day, and that helps us grow."
];

let linesHard = [
    "Artificial intelligence and machine learning are transforming industries globally, and have the potential to revolutionize technology.",
    "Quantum computing holds the promise of solving complex problems much faster than traditional computers can handle.",
    "Understanding the nature of space, time, and gravity has been one of the greatest achievements in modern physics."
];

let currentText = [];
let currentIndex = 0;
let currentWordIndex = 0;
let startTime, endTime;
let correctCount = 0;
let totalCount = 0;
let mode = "lines"; // Default to lines mode

const userInput = document.getElementById('user-input');
const textToType = document.getElementById('text-to-type');
const results = document.getElementById('results');
const testModeSelect = document.getElementById('test-mode');
const difficultySelect = document.getElementById('difficulty');

// Event listener to change test mode (lines or words)
testModeSelect.addEventListener('change', () => {
    mode = testModeSelect.value;
    resetTest();
});

// Event listener to change difficulty level
difficultySelect.addEventListener('change', () => {
    resetTest();
});

// Set difficulty level
function setLevel(level) {
    if (level === "easy") {
        currentText = mode === "lines" ? linesEasy : wordsEasy;
    } else if (level === "medium") {
        currentText = mode === "lines" ? linesMedium : wordsMedium;
    } else if (level === "hard") {
        currentText = mode === "lines" ? linesHard : wordsHard;
    }
    currentIndex = 0;
    textToType.innerText = currentText[currentIndex];
}

// Start the typing test
function startTest() {
    startTime = Date.now();
    if (mode === "lines") {
        textToType.innerText = currentText[currentIndex];
    } else {
        showWordFor3Seconds();
    }
}

// Show a word for 3 seconds in "words" mode
function showWordFor3Seconds() {
    if (currentWordIndex < currentText.length) {
        textToType.innerText = currentText[currentWordIndex]; // Show word
        userInput.value = ""; // Clear the input field
        userInput.disabled = false; // Enable typing

        startTime = Date.now(); // Start the timer when word is displayed

        setTimeout(() => {
            endTime = Date.now();
            const timeTaken = (endTime - startTime) / 1000;
            if (userInput.value.trim() === currentText[currentWordIndex]) {
                correctCount++;
            }
            totalCount++;
            if (currentWordIndex < currentText.length - 1) {
                currentWordIndex++;
                showWordFor3Seconds();
            } else {
                endTest(); // End the test after 20 words
            }
        }, 3000); // Word shown for 3 seconds
    }
}

// Check typing in lines mode
function checkTyping() {
    let typedText = userInput.value.trim();

    if (mode === "lines") {
        if (typedText === currentText[currentIndex]) {
            textToType.style.opacity = "0.3"; // Reduce opacity when line is correct
            correctCount++;
            currentIndex++;
            if (currentIndex < currentText.length) {
                textToType.innerText = currentText[currentIndex];
            } else {
                endTest();
            }
            userInput.value = ""; // Clear the input field
        } else if (!currentText[currentIndex].startsWith(typedText)) {
            textToType.style.color = "red"; // Highlight in red if incorrect
        } else {
            textToType.style.color = "black"; // Reset color
        }
    }
}

// Calculate accuracy and WPM when the test ends
function endTest() {
    const timeTaken = (endTime - startTime) / 1000;
    const wpm = (totalCount / timeTaken) * 60;
    const accuracy = (correctCount / totalCount) * 100;

    document.getElementById('time').innerText = timeTaken.toFixed(2) + " seconds";
    document.getElementById('speed').innerText = wpm.toFixed(2) + " WPM";
    document.getElementById('accuracy').innerText = accuracy.toFixed(2) + "%";
    results.style.display = "block";
    userInput.disabled = true;
}

// Reset the test and prepare for a new one
function resetTest() {
    setLevel(difficultySelect.value); // Set the difficulty
    correctCount = 0;
    totalCount = 0;
    currentWordIndex = 0;
    currentIndex = 0;
    userInput.value = "";
    textToType.innerText = currentText[currentIndex];
    textToType.style.opacity = "1"; // Reset opacity
    textToType.style.color = "black"; // Reset color
    results.style.display = "none";
    startTest();
}

// Initialize the game when the page loads
window.onload = () => {
    setLevel(difficultySelect.value);  // Set initial level
    startTest();
};
