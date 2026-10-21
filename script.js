const display = document.getElementById("display");

function append(value) {
  if (["Error", "Math Error", "Invalid input", "Enter a number"].includes(display.value)) {
    display.value = "";
  }
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function formatResult(value) {
  return Number.isFinite(value)
    ? String(Number(value.toPrecision(12)))
    : "Math Error";
}

function calculate() {
  const expression = display.value.trim();
  if (!expression) return;

  if (!/^[0-9+\-*/.()\s]+$/.test(expression)) {
    display.value = "Invalid input";
    return;
  }

  try {
    const result = Function('"use strict"; return (' + expression + ')')();
    display.value = formatResult(result);
  } catch {
    display.value = "Math Error";
  }
}

function scientific(operation) {
  const input = display.value.trim();
  if (!input || !Number.isFinite(Number(input))) {
    display.value = "Enter a number";
    return;
  }

  const value = Number(input);
  let result;

  switch (operation) {
    case "sin":
      result = Math.sin(value * Math.PI / 180);
      break;
    case "cos":
      result = Math.cos(value * Math.PI / 180);
      break;
    case "tan":
      result = Math.abs(Math.cos(value * Math.PI / 180)) < 1e-12
        ? NaN
        : Math.tan(value * Math.PI / 180);
      break;
    case "sqrt":
      result = value >= 0 ? Math.sqrt(value) : NaN;
      break;
    case "square":
      result = value * value;
      break;
    case "log":
      result = value > 0 ? Math.log10(value) : NaN;
      break;
    case "ln":
      result = value > 0 ? Math.log(value) : NaN;
      break;
    case "percent":
      result = value / 100;
      break;
    default:
      result = NaN;
  }

  display.value = formatResult(result);
}
