const display = document.getElementById("display");

let expression = "";

function updateDisplay() {
    display.textContent = expression || "0";
}

updateDisplay();

function pressed(value) {
    expression += value;
    updateDisplay();
}

function clearAll() {
    expression = "";
    updateDisplay();
}

function backspace() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

function calculate() {
    if (!expression) return;

    try {
        const result = eval(expression);
        expression = String(result);
        updateDisplay();
    } catch (e) {
        expression = "";
        display.textContent = "Erro";
    }
}


const buttons = document.querySelectorAll(".btn");

function findButtonByKey(key) {
    for (const btn of buttons) {
        const txt = btn.textContent.trim();

        if (txt === key) return btn;

        if ((key === "Enter" || key === "=") && txt === "=") return btn;

        if (key === "Backspace" && (txt === "⌫" || txt === "←" || txt.toLowerCase() === "del")) return btn;

        if ((key === "c" || key === "C") && txt.toLowerCase() === "c") return btn;

        if (key === "," && txt === ".") return btn;
    }
    return null;
}

function acenderLed(key) {
    const btn = findButtonByKey(key);
    if (!btn) return;
    btn.classList.add("btn-led");
}

function apagarLed(key) {
    const btn = findButtonByKey(key);
    if (!btn) return;
    btn.classList.remove("btn-led");
}

document.addEventListener("keydown", (event) => {
    const key = event.key;
    let handled = false;

    if (key >= "0" && key <= "9") {
        pressed(key);
        handled = true;
    }
    else if ("+-*/".includes(key)) {
        pressed(key);
        handled = true;
    }
    else if (key === "." || key === ",") {
        pressed(".");
        handled = true;
    }
    else if (key === "Enter" || key === "=") {
        calculate();
        handled = true;
    }
    // backspace
    else if (key === "Backspace") {
        backspace();
        handled = true;
    }
    // C para limpar
    else if (key === "c" || key === "C") {
        clearAll();
        handled = true;
    }

    if (handled) {
        event.preventDefault();   
        acenderLed(key);          
    }
});

document.addEventListener("keyup", (event) => {
    const key = event.key;
    apagarLed(key); });
