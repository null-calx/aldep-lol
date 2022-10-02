let departments = new Map();
const relations = new Map();

function Department(id, size, fake = false) {
    this.id = id;
    this.size = size;
    if (!fake) departments.set(id, this);
}

Department.reset = function() {
    departments = new Map();
}

function jointId(id1, id2) {
    return id1 < id2 ? id1 + '-' + id2 : id2 + '-' + id1;
}

function getRelation(relations, id1, id2) {
    if (relations.has(jointId(id1, id2)))
	return relations.get(jointId(id1, id2));
    return 'U';
}

function setRelation(relations, id1, id2, v) {
    relations.set(jointId(id1, id2), v);
}

function iWillHaveOrder(departments, relations) {
    departments = Array.from(departments.values());
    const order = [ popRandom(departments) ];
    let nextChoices = scanRelations(order[order.length - 1], 'A');
    while(nextChoices.length) {
	let choice = chooseRandom(nextChoices);
	departments.splice(choice.index, 1);
	order.push(choice.department);
	nextChoices = scanRelations(order[order.length - 1], 'A');
    }
    return order;

    function scanRelations(dep, rel = null) {
	const result = [];
	departments.forEach((d, i) => {
	    if (matchRelation(getRelation(relations, d.id, dep.id), rel))
		result.push({ department: d, index: i });
	});
	if (rel && !result.length)
	    return scanRelations(dep, nextRelation(rel));
	return result;
	
	function matchRelation(a, b) {
	    if (b == null) return true;
	    return a == b;
	}
    }
}
	
function nextRelation(rel) {
    return ({A: 'E', E: 'I', I: 'O', O: 'U', U: null})[rel];
}
