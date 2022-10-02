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
    drawLabel(department, cnvs);
    if (stripHeight + cnvs.state.y > cnvs.y) {
	const tempY = cnvs.state.y;
	++ cnvs.state.i;
	cnvs.state.y = 0;
	cnvs.state.topToBtm = ! cnvs.state.topToBtm;
	drawDepartment(new Department(
	    department.id + "...",
	    department.size - stripWidth * (cnvs.y - tempY),
	    true), cnvs);
    } else {
	cnvs.state.y += stripHeight;
	drawDepartmentBorder(cnvs);
    }
}

function drawLabel(department, cnvs) {
    const delta = 5;
    const stripWidth = cnvs.x / cnvs.columns;
    const textMetric = cnvs.ctx.measureText(department.id);
    const x = (cnvs.state.i + .5) * stripWidth - textMetric.actualBoundingBoxRight / 2;
    const y = (cnvs.state.topToBtm
	       ? cnvs.state.y + textMetric.actualBoundingBoxAscent + delta
	       : cnvs.y - cnvs.state.y - delta);
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
