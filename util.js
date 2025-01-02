document.documentElement.style.setProperty('--animation-speed', '200ms');

const arraySize = 100;
let animationSpeed = 200;

// Get DOM elements
const generateArrayBtn = document.getElementById('generateArray');
const startSortBtn = document.getElementById('startSort');
const speedControl = document.getElementById('speedControl');
const speedValue = document.getElementById('speedValue');

function isArraySorted(array, key) {
    for (let i = 0; i < array.length - 1; i++) {
        if (Number(array[i][key].slice(0, -1)) > Number(array[i + 1][key].slice(0, -1))) {
            return false;
        }
    }
    return true;
}

async function slowDown(additional = 0){
    await new Promise(resolve => setTimeout(resolve, animationSpeed + additional));
}

function getNum(element,key){
    return Number(element.style[key].slice(0, -1))
}

// Event listeners
startSortBtn.addEventListener('click', async () => {
    startSortBtn.disabled = true;
    generateArrayBtn.disabled = true;
    await iterativeMergeSort();
    startSortBtn.disabled = false;
    generateArrayBtn.disabled = false;
});

speedControl.addEventListener('input', (e) => {
    // Convert to number and ensure it's within bounds
    const newSpeed = parseInt(e.target.value);
    animationSpeed = Math.max(50, Math.min(500, newSpeed)); // Clamp between 50 and 500
    
    // Update display and CSS variable
    speedValue.textContent = `${animationSpeed}ms`;
    document.documentElement.style.setProperty('--animation-speed', `${animationSpeed}ms`);
});

// Update the initial speed value display
speedValue.textContent = `${animationSpeed}ms`;
