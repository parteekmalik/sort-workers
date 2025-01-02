// Generate random array
function generateArray() {
    const arrayContainer = document.getElementById('arrayContainer');
    const array = [];
    arrayContainer.innerHTML = '';

    // Create a set to ensure uniqueness
    const uniqueValues = Array.from({ length: arraySize }, (_,index) => (100 / arraySize) * index).sort((a,b) => Math.random() - 0.5);

    // Convert the set to an array
    const uniqueArray = Array.from(uniqueValues);

    uniqueArray.forEach((value, i) => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value}%`;
        bar.style.width = `calc(${100 / arraySize}% - 2px)`;
        bar.style.margin = '2px';
        bar.style.position = 'absolute';
        bar.style.left = `${(i * 100) / arraySize}%`;
        arrayContainer.appendChild(bar);
    });
}

// Iterative Merge Sort implementation
async function iterativeMergeSort() {
    const bars = Array.from(document.getElementsByClassName('bar'));
    const n = bars.length;

    // Start with subarrays of size 1, then 2, 4, 8, etc.
    for (let size = 1; size < n; size = size * 2) {
        // Merge subarrays of size 'size'
        for (let leftStart = 0; leftStart < n - 1; leftStart += 2 * size) {
            const mid = Math.min(leftStart + size - 1, n - 1);
            const rightEnd = Math.min(leftStart + 2 * size - 1, n - 1);

            // Merge the subarrays
            bars.sort((a, b) => getNum(a, 'left') - getNum(b, 'left'));
            await merge(bars, leftStart, mid, rightEnd);
        }
    }
}

async function merge(bars, start, mid, end) {
    const leftArray = bars.slice(start, mid + 1);
    const rightArray = bars.slice(mid + 1, end + 1);

    let i = 0, j = 0, k = start;

    while (i < leftArray.length && j < rightArray.length) {
        const first = leftArray[i], second = rightArray[j];
        
        // Add comparing class
        first.classList.add('bar-comparing');
        second.classList.add('bar-comparing');

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

        await slowDown(100);

        // Remove comparing class
        first.classList.remove('bar-comparing');
        second.classList.remove('bar-comparing');
    }
}

// Event listeners
generateArrayBtn.addEventListener('click', generateArray);

// Generate initial array
generateArray();
