
async function iterativeMergeSort(containerId) {
    const bars = Array.from(document.querySelector(containerId).getElementsByClassName('bar'));
    const n = bars.length;

    for (let size = 1; size < n; size = size * 2) {
        for (let leftStart = 0; leftStart < n - 1; leftStart += 2 * size) {
            const mid = Math.min(leftStart + size - 1, n - 1);
            const rightEnd = Math.min(leftStart + 2 * size - 1, n - 1);

            bars.sort((a, b) => getNum(a, 'left') - getNum(b, 'left'));
            await merge(bars, leftStart, mid, rightEnd);
        }
    }
}
