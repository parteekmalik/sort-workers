let array = [];
const arraySize = 50;
let animationSpeed = 50;

// Get DOM elements
const arrayContainer = document.getElementById('arrayContainer');
const generateArrayBtn = document.getElementById('generateArray');
const startSortBtn = document.getElementById('startSort');

// Generate random array
function generateArray() {
    array = [];
    arrayContainer.innerHTML = '';
    
    for (let i = 0; i < arraySize; i++) {
        const value = Math.floor(Math.random() * 100) + 1;
        array.push(value);
        
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value}%`;
        bar.style.width = `${100 / arraySize}%`;
        bar.style.backgroundColor = '#4B5563'; // gray-600
        bar.style.transition = 'all 0.2s ease';
        arrayContainer.appendChild(bar);
    }
}

// Merge sort implementation
async function mergeSort(arr, start, end) {
    if (start >= end) return;
    
    const mid = Math.floor((start + end) / 2);
    await mergeSort(arr, start, mid);
    await mergeSort(arr, mid + 1, end);
    await merge(arr, start, mid, end);
}

async function merge(arr, start, mid, end) {
    const leftArray = arr.slice(start, mid + 1);
    const rightArray = arr.slice(mid + 1, end + 1);
    
    let i = 0, j = 0, k = start;
    const bars = document.getElementsByClassName('bar');

    while (i < leftArray.length && j < rightArray.length) {
        // Highlight comparing elements
        bars[start + i].style.backgroundColor = '#EF4444'; // red-500
        bars[mid + 1 + j].style.backgroundColor = '#EF4444'; // red-500
        
        await new Promise(resolve => setTimeout(resolve, animationSpeed));

        if (leftArray[i] <= rightArray[j]) {
            arr[k] = leftArray[i];
            bars[k].style.height = `${leftArray[i]}%`;
            bars[k].style.backgroundColor = '#10B981'; // green-500
            i++;
        } else {
            arr[k] = rightArray[j];
            bars[k].style.height = `${rightArray[j]}%`;
            bars[k].style.backgroundColor = '#10B981'; // green-500
            j++;
        }
        k++;
        
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
    }

    while (i < leftArray.length) {
        arr[k] = leftArray[i];
        bars[k].style.height = `${leftArray[i]}%`;
        bars[k].style.backgroundColor = '#10B981'; // green-500
        i++;
        k++;
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
    }

    while (j < rightArray.length) {
        arr[k] = rightArray[j];
        bars[k].style.height = `${rightArray[j]}%`;
        bars[k].style.backgroundColor = '#10B981'; // green-500
        j++;
        k++;
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
    }
}

// Event listeners
generateArrayBtn.addEventListener('click', generateArray);
startSortBtn.addEventListener('click', async () => {
    startSortBtn.disabled = true;
    generateArrayBtn.disabled = true;
    await mergeSort(array, 0, array.length - 1);
    startSortBtn.disabled = false;
    generateArrayBtn.disabled = false;
});

// Generate initial array
generateArray();
