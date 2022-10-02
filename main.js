const cnvs = new CNVS(document.querySelector('#root'), 300, 300, 5);
initCNVS(cnvs);

const list = {
    'A': 60 * 20 * 3,
    'B': 60 * 20 * 4,
    'C': 60 * 20 * 3,
    'D': 60 * 20 * 3,
    'E': 60 * 20 * 2,
    'F': 60 * 20 * 1,
    'G': 60 * 20 * 1,
    'H': 60 * 20 * 4,
    'I': 60 * 20 * 1,
    'K': 60 * 20 * 3,
    'L': 60 * 20 * 4,
    'M': 60 * 20 * 5,
    'N': 60 * 20 * 1,
    'O': 60 * 20 * 3,
    'P': 60 * 20 * 4,
    'Q': 60 * 20 * 2,
    'R': 60 * 20 * 4,
};

let depList = Object.entries(list).map(x => new Department(x[0], x[1]));
// departments.forEach(d => drawDepartment(d, cnvs));

const relList = new Map();

relList.set(jointId('A', 'B'), 'A');
relList.set(jointId('D', 'B'), 'A');
relList.set(jointId('E', 'B'), 'A');

depList = iWillHaveOrder(depList, relList);
depList.forEach(d => drawDepartment(d, cnvs));
