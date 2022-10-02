const pallete = [ "#a7dbd8", "#69d2e7", "#e0e4cc", "#f38630", "#fa6900", "#606060",
		  "#0084ff", "#44bec7", "#ffc300", "#fa3c4c", "#d696bb", "#839e4d",
		  "#cc8d6a", "#ba392e", "#54243a", "#79172d", "#606060"]; // https://codepen.io/banik/pen/WJaMLY
let colorIndex = 0;

function initCNVS(cnvs) {
    const ctx = cnvs.ctx;
    const stripWidth = cnvs.x / cnvs.columns;
    for (let i = 1; i <= cnvs.columns; ++ i) {
	// used       ^^ (i.e. <=) because of
	// wierd canvas coloring
	ctx.beginPath();
	ctx.moveTo(stripWidth * i, 0);
	ctx.lineTo(stripWidth * i, cnvs.y);
	ctx.stroke();
	ctx.closePath();
    }
    ctx.rect(0, 0, cnvs.x, cnvs.y);
    ctx.stroke();
}

function drawDepartment(department, cnvs) {
    const stripWidth = cnvs.x / cnvs.columns;
    const stripHeight = department.size / stripWidth;
    colorDepartment(department, cnvs);
    drawLabel(department, cnvs);
    if (stripHeight + cnvs.state.y > cnvs.y) {
	const tempY = cnvs.state.y;
	++ cnvs.state.i;
	cnvs.state.y = 0;
	cnvs.state.topToBtm = ! cnvs.state.topToBtm;
	incfColorIndex(-1);
	drawDepartment(new Department(
	    department.id + "...",
	    department.size - stripWidth * (cnvs.y - tempY),
	    true), cnvs);
    } else {
	cnvs.state.y += stripHeight;
	drawDepartmentBorder(cnvs);
    }
}

function colorDepartment(department, cnvs) {
    const ctx = cnvs.ctx;
    const stripWidth = cnvs.x / cnvs.columns;
    const stripHeight = department.size / stripWidth;
    ctx.fillStyle = pallete[colorIndex];
    ctx.fillRect(cnvs.state.i * stripWidth,
		 cnvs.state.topToBtm ? cnvs.state.y : cnvs.y - cnvs.state.y,
		 stripWidth,
		 - ((-1) ** cnvs.state.topToBtm) * stripHeight);
    initCNVS(cnvs);
    incfColorIndex(1);
}

function incfColorIndex(i) {
    while (i <= 0) i += pallete.length;
    colorIndex += i;
    colorIndex %= pallete.length;
}

function drawLabel(department, cnvs) {
    const delta = 5;
    const stripWidth = cnvs.x / cnvs.columns;
    const textMetric = cnvs.ctx.measureText(department.id);
    const x = (cnvs.state.i + .5) * stripWidth - textMetric.actualBoundingBoxRight / 2;
    const y = (cnvs.state.topToBtm
	       ? cnvs.state.y + textMetric.actualBoundingBoxAscent + delta
	       : cnvs.y - cnvs.state.y - delta);
    cnvs.ctx.fillStyle = 'black';
    cnvs.ctx.fillText(department.id, x, y);
}

function drawDepartmentBorder(cnvs) {
    const stripWidth = cnvs.x / cnvs.columns;
    const ctx = cnvs.ctx;
    const y = (cnvs.state.topToBtm
	       ? cnvs.state.y
	       : cnvs.y - cnvs.state.y);
    ctx.beginPath();
    ctx.moveTo(cnvs.state.i * stripWidth, y);
    ctx.lineTo((cnvs.state.i + 1) * stripWidth, y);
    ctx.stroke();
    ctx.closePath();
}
