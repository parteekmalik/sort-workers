// Add at the top with other variables
const barCountInput = document.getElementById('barCount');

// Generate random array
function generateArray(containerId) {
    arraySize = parseInt(barCountInput.value) || 50; // Use input value or default to 50
    const arrayContainer = document.querySelector(containerId);
    arrayContainer.innerHTML = '';

    const uniqueValues = Array.from(
        { length: arraySize }, 
        (_, index) => (100 / arraySize) * index
    ).sort((a,b) => Math.random() - 0.5);

    uniqueValues.forEach((value, i) => {
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

// Event listeners
document.getElementById('generateArray').addEventListener('click', () => {
    generateArray('#arrayContainer1');
    generateArray('#arrayContainer2');
});

document.getElementById('startSort').addEventListener('click', async () => {
    const startBtn = document.getElementById('startSort');
    const generateBtn = document.getElementById('generateArray');
    startBtn.disabled = true;
    generateBtn.disabled = true;
    barCountInput.disabled = true; // Disable bar count input

    // Start both sorts simultaneously
    await Promise.all([
        iterativeMergeSort('#arrayContainer1'),
        iterativeMergeSortMulti('#arrayContainer2')
    ]);

    startBtn.disabled = false;
    generateBtn.disabled = false;
    barCountInput.disabled = false; // Re-enable bar count input
});

document.getElementById('speedControl').addEventListener('input', (e) => {
    const newSpeed = parseInt(e.target.value);
    document.documentElement.style.setProperty('--animation-speed', `${newSpeed}ms`);
    document.getElementById('speedValue').textContent = `${newSpeed}ms`;
});

// Add event listener for bar count changes
barCountInput.addEventListener('change', () => {
    const value = parseInt(barCountInput.value);
    // Clamp the value between min and max
    barCountInput.value = Math.max(10, Math.min(1000, value));
    generateArray('#arrayContainer1');
    generateArray('#arrayContainer2');
});

// Generate initial arrays
generateArray('#arrayContainer1');
generateArray('#arrayContainer2');
