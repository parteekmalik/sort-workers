
async function iterativeMergeSortMulti(containerId) {
    const bars = Array.from(document.querySelector(containerId).getElementsByClassName('bar'));
    const n = bars.length;
    const arraySize = bars.length;

    for (let size = 1; size < n; size = size * 2) {
        const processes = [];
        for (let leftStart = 0; leftStart < n - 1; leftStart += 2 * size) {
            const mid = Math.min(leftStart + size - 1, n - 1);
            const rightEnd = Math.min(leftStart + 2 * size - 1, n - 1);

            bars.sort((a, b) => getNum(a, 'left') - getNum(b, 'left'));
            processes.push(merge(bars, leftStart, mid, rightEnd));
        }
        await Promise.all(processes);
    }
}

