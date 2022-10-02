const root = document.querySelector('#root');
let cnvs;
let namesElm, nameElms; // code ninja lmao
let tableElm, tableData;
let genBtn;

let nDepartments = 5;
const depList = [];

function createElement(tag, parent) {
    const elm = document.createElement(tag);
    if (parent) parent.appendChild(elm);
    return elm;
}

const nDepElmLbl = createElement('label', root);
nDepElmLbl.innerText = 'Number of Departments: ';
nDepElmLbl.setAttribute('for', 'n-dep');
const nDepElm = createElement('input', root);
nDepElm.setAttribute('type', 'number');
nDepElm.setAttribute('name', 'n-dep');
nDepElm.value = 5;
createElement('br', root);

const sizeLbl = createElement('label', root);
sizeLbl.innerText = 'Size: ';
const size = [ createElement('input', root), createElement('input', root) ];
size.forEach((i, j) => {
    i.setAttribute('type', 'number');
    i.value = 300;
    i.setAttribute('name', [ 'x', 'y' ][j]);
});
createElement('br', root);

const columnsElmLbl = createElement('label', root);
columnsElmLbl.innerText = 'Number of columns: ';
columnsElmLbl.setAttribute('for', 'columns');
const columnsElm = createElement('input', root);
columnsElm.setAttribute('type', 'number');
columnsElm.setAttribute('name', 'columns');
columnsElm.value = 5;
createElement('br', root);

const nDepElmBtn = createElement('button', root);
nDepElmBtn.innerText = 'Go'
nDepElmBtn.onclick = () => (confirm("Are you sure?") && nameList());
createElement('hr', root);
createElement('br', root);

function createCNVS() {
    if (cnvs) cnvs.canvas.remove();
    cnvs = new CNVS(document.querySelector('#cnvs-box'),
		    + size?.[0]?.value || 300,
		    + size?.[1]?.value || 300,
		    + columnsElm?.value || 5);
    initCNVS(cnvs);
}

function nameList() {
    nDepartments = nDepElm.value;
    if (namesElm) namesElm.remove();
    namesElm = createElement('div', root);
    nameElms = [];
    for (let i = 0; i < nDepartments; ++ i) {
	const x = { label: createElement('label', namesElm),
		    input: createElement('input', namesElm),
		    sizeInput: createElement('input', namesElm),
		    br: createElement('br', namesElm) };
	const name = `Department-${ i + 1 }`;
	x.input.setAttribute('name', name.toLowerCase());
	x.input.value = 'ABCDEFGHIJKLMNOPQRTSUVWXYZ'.charAt(i);
	x.input.oninput = relationTable;
	x.sizeInput.setAttribute('name', name.toLowerCase() + '-size');
	x.sizeInput.setAttribute('type', 'number');
	x.sizeInput.value = 3;
	x.label.setAttribute('for', name.toLowerCase());
	x.label.innerText = name + ': ';
	nameElms[i] = x;
    }
    relationTable();
}

function relationTable() {
    const depIds = nameElms.map(i => i.input.value);
    if (tableElm) tableElm.remove();
    tableElm = createElement('table', namesElm);
    const topRow = createElement('tr', tableElm);
    createElement('th', topRow).innerText = '#';
    depIds.forEach(id => createElement('th', topRow).innerText = id);
    tableData = [];
    for (let i = 0; i < depIds.length; ++ i) {
	const row = createElement('tr', tableElm);
	createElement('th', row).innerText = depIds[i];
	const rowData = [];
	tableData.push(rowData);
	for (let j = 0; j < depIds.length; ++ j) {
	    const cell = createElement('td', row);
	    if (i != j) rowData.push({
		a: depIds[i],
		b: depIds[j],
		btn: specialButton(cell, jointId(depIds[i], depIds[j]))
	    });
	    else cell.innerText = 'X';
	}
    }
    genGenBtn();
}

function specialButton(parent, id) {
    const button = createElement('button', parent);
    button.id = id;
    button.innerText = 'U';
    button.onclick = e => manageButton(e, id);
    return button;
}

function manageButton(e, id) {
    const oldText = e.target.innerText;
    e.target.innerText = nextRelation(oldText) || 'A';
}

nameList();

function genGenBtn() {
    if (genBtn) genBtn.remove();
    genBtn = createElement('button', root);
    genBtn.innerText = 'Generate';
    genBtn.onclick = generate;
}

function generate() {
    Department.reset();
    createCNVS();
    const departments = nameElms.map(i => new Department(i.input.value, i.sizeInput.value * 60 * 60));
    const relations = new Map();
    for (let i = 0; i < tableData.length; ++ i) {
	for (let j = 0; j < tableData[i].length; ++ j) {
	    const elm = tableData[i][j];
	    const rel = elm.btn.innerText;
	    if (rel != 'U')
		relations.set(jointId(elm.a, elm.b), rel);
	}
    }
    const finalList = iWillHaveOrder(departments, relations)
    finalList.forEach(d => drawDepartment(d, cnvs));
}
