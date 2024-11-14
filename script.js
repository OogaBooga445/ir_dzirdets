function appendDisplay(value) {
    document.getElementById("display").value += value;
}

function calculate() {
    try {
        let expression = document.getElementById("display").value;
        let result = eval(expression);
        document.getElementById("display").value = result;
        addToHistory(expression + " = " + result);
    } catch (error) {
        document.getElementById("display").value = "Error";
    }
}

function clearDisplay() {
    document.getElementById("display").value = "";
}

function deleteLastCharacter() {
    let currentValue = document.getElementById("display").value;
    document.getElementById("display").value = currentValue.slice(0, -1);
}

function addToHistory(entry) {
    let historyList = document.getElementById("history-list");
    let historyEntry = document.createElement("div");
    historyEntry.className = "history-entry";
    historyEntry.innerHTML = `
        <span>${entry}</span>
        <button onclick="deleteHistoryEntry(this)">Delete</button>
    `;
    historyList.appendChild(historyEntry);
}

function deleteHistoryEntry(button) {
    button.parentElement.remove();
}

function clearHistory() {
    document.getElementById("history-list").innerHTML = "";
}

function saveHistory() {
    const historyList = document.getElementById('history-list');
    const historyItems = [];
    const entries = historyList.getElementsByClassName('history-entry');
    for (let entry of entries) {
        const calculation = entry.querySelector('span').textContent;
        historyItems.push(calculation);
    }
    localStorage.setItem('calculatorHistory', JSON.stringify(historyItems));
}

function loadHistory() {
    const historyList = document.getElementById('history-list');
    const historyItems = JSON.parse(localStorage.getItem('calculatorHistory')) || [];
    historyList.innerHTML = '';
    historyItems.forEach(item => {
        const historyEntry = document.createElement('div');
        historyEntry.classList.add('history-entry');
        historyEntry.innerHTML = `<span>${item}</span><button onclick="deleteHistoryEntry(this)">Delete</button>`;
        historyList.appendChild(historyEntry);
    });
}

function deleteHistoryEntry(button) {
    const historyEntry = button.parentElement;
    historyEntry.remove();
    saveHistory();
}

function clearHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    localStorage.removeItem('calculatorHistory');
}

window.onload = loadHistory;

function addToHistory(calculation) {
    const historyList = document.getElementById('history-list');
    const historyEntry = document.createElement('div');
    historyEntry.classList.add('history-entry');
    historyEntry.innerHTML = `<span>${calculation}</span><button onclick="deleteHistoryEntry(this)">Delete</button>`;
    historyList.appendChild(historyEntry);
    saveHistory();
}

let displayValue = "";

function appendNumber(number) {
    displayValue += number;
    document.getElementById('display').value = displayValue;
}

function clearDisplay() {
    displayValue = "";
    document.getElementById('display').value = displayValue;
}

function calculateResult() {
    try {
        const result = eval(displayValue);
        addToHistory(`${displayValue} = ${result}`);
        displayValue = result.toString();
        document.getElementById('display').value = displayValue;
    } catch (e) {
        displayValue = "Error";
        document.getElementById('display').value = displayValue;
    }
}
