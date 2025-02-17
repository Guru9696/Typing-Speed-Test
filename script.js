let wordsEasy = ["apple", "cat", "dog", "ball", "desk", "table", "book", "pen", "lamp", "tree", "house", "flower", "car", "sky", "sun", "moon", "bird", "fish", "star", "cloud"];
let wordsMedium = ["banana", "computer", "elephant", "keyboard", "monitor", "science", "mountain", "country", "ocean", "guitar", "internet", "technology", "library", "giraffe", "pencil", "notebook", "mobile", "universe", "planet", "data"];
let wordsHard = ["unbelievable", "extraordinary", "phenomenon", "counterproductive", "consequence", "artificial", "intelligence", "engineering", "algorithm", "microprocessor", "mathematics", "superintendent", "philosophy", "exponential", "hydrodynamics", "cryptography", "philanthropy", "neuroscience", "subconscious", "nanotechnology"];

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
let incorrectCount = 0;
let totalCount = 0;
let mode = "lines"; // Default to lines mode
let wordTime = 3000; // Default time for word mode (3 seconds)

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

// Set difficulty level and adjust time for words mode
function setLevel(level) {
    if (level === "easy") {
        currentText = mode === "lines" ? linesEasy : wordsEasy;
        wordTime = 3000; // 3 seconds per word
    } else if (level === "medium") {
        currentText = mode === "lines" ? linesMedium : wordsMedium;
        wordTime = 4000; // 4 seconds per word
    } else if (level === "hard") {
        currentText = mode === "lines" ? linesHard : wordsHard;
        wordTime = 5000; // 5 seconds per word
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
        showWordForTime(); // Show word for 3-5 seconds based on difficulty
    }
}

// Show a word for the difficulty-specific time in "words" mode
function showWordForTime() {
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
            } else {
                incorrectCount++;
            }
            totalCount++;
            if (currentWordIndex < currentText.length - 1) {
                currentWordIndex++;
                showWordForTime();
            } else {
                endTest(); // End the test after 20 words
            }
        }, wordTime); // Word shown for the difficulty-based time (3-5 seconds)
    }
}

// Check typing in lines mode
let wordStatus = []; // Array to store the status of each word (correct/incorrect)

function checkTyping() {
    let typedText = userInput.value.trim();
    let currentLine = currentText[currentIndex];
    let wordsInLine = currentLine.split(" ");
    
    let currentWord = wordsInLine[currentWordIndex];

    // Check if the user has typed the word correctly
    if (typedText === currentWord) {
        // Mark the current word as correct (green)
        wordStatus[currentWordIndex] = "correct";  // Store status as 'correct'
        userInput.value = ""; // Clear the input field
        correctCount++; // Increase the correct count
        currentWordIndex++; // Move to the next word
    } else if (!currentWord.startsWith(typedText)) {
        // If the user typed the word incorrectly, highlight it red
        wordStatus[currentWordIndex] = "incorrect";  // Store status as 'incorrect'
    }

    // Update the display with correct and incorrect words
    let updatedLine = wordsInLine.map((word, index) => {
        if (wordStatus[index] === "correct") {
            return `<span style="color: green">${word}</span>`; // Correct word in green
        } else if (wordStatus[index] === "incorrect") {
            return `<span style="color: red">${word}</span>`; // Incorrect word in red
        } else {
            return word;  // No status yet, show word as is
        }
    }).join(" ");

    textToType.innerHTML = updatedLine; // Update the text with the new colors

    // If all words in the line are typed correctly, move to the next line
    if (currentWordIndex === wordsInLine.length) {
        currentIndex++; // Move to the next line
        if (currentIndex < currentText.length) {
            textToType.innerText = currentText[currentIndex]; // Show the next line
            currentWordIndex = 0; // Reset the word index for the new line
            wordStatus = []; // Clear the word status array for the new line
        } else {
            endTest(); // End the test if all lines are typed
        }
    }

    // Continuously calculate WPM and Accuracy
    updateStats();
}

function updateStats() {
    const timeElapsed = (Date.now() - startTime) / 1000; // Time in seconds
    const totalWordsTyped = correctCount + incorrectCount;
    const wpm = (totalWordsTyped / timeElapsed) * 60;
    const accuracy = (correctCount / totalWordsTyped) * 100;

    // Update WPM and accuracy in real-time
    document.getElementById('speed').innerText = wpm.toFixed(2) + " WPM";
    document.getElementById('accuracy').innerText = accuracy.toFixed(2) + "%";
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
    incorrectCount = 0;
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
