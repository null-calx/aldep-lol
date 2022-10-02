const seed = null;

function random() {
    return Math.random();
}

function chooseRandom(arr) {
    return arr[Math.floor(arr.length * random())];
}

function popRandom(arr) {
    const idx = Math.floor(arr.length * random());
    return arr.splice(idx, 1)[0];
}
