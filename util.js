document.documentElement.style.setProperty('--animation-speed', '200ms');

let arraySize = 400;
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
    animationSpeed = Math.max(20 , Math.min(500, newSpeed)); // Clamp between 50 and 500
    
    // Update display and CSS variable
    speedValue.textContent = `${animationSpeed}ms`;
    document.documentElement.style.setProperty('--animation-speed', `${animationSpeed}ms`);
});

// Update the initial speed value display
speedValue.textContent = `${animationSpeed}ms`;

async function merge(bars, start, mid, end) {
    const leftArray = bars.slice(start, mid + 1);
    const rightArray = bars.slice(mid + 1, end + 1);

    let i = 0, j = 0, k = start;

    while (i < leftArray.length && j < rightArray.length) {
        const first = leftArray[i], second = rightArray[j];
        
        first.classList.add('bar-comparing');
        second.classList.add('bar-comparing');
        setTimeout(() => {
            first.classList.remove('bar-comparing');
            second.classList.remove('bar-comparing');
        }, animationSpeed);
        if (getNum(leftArray[i], 'height') <= getNum(rightArray[j], 'height')) {
            i++;
        } else {
            second.style.left = `${(k * 100) / arraySize}%`;
            second.classList.remove('bar-comparing');
            second.classList.add('bar-moving');
            
            setTimeout(() => {
                second.classList.remove('bar-moving');
            }, animationSpeed);

            for (let barIndex = i; barIndex < leftArray.length; barIndex++) {
                leftArray[barIndex].classList.add('bar-sorted');
                setTimeout(() => {
                    leftArray[barIndex].classList.remove('bar-sorted');
                }, animationSpeed);
                leftArray[barIndex].style.left = `${getNum(leftArray[barIndex], 'left') + 100 / arraySize}%`;
            }
            j++;
        }
        k++;
        await slowDown(animationSpeed/10);
        // await new Promise(resolve => setTimeout(resolve, animationSpeed/10));
    }
}