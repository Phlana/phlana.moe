import React from "react";

const canSvg = !!(document.createElementNS && document.createElementNS('http://www.w3.org/2000/svg','svg').createSVGRect);
const svgns = 'http://www.w3.org/2000/svg';
var scrollElement = document.createElementNS(svgns, 'svg');

class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    };
}

class Triangle {
    p1: Point;
    p2: Point;
    p3: Point;
    color: string;
    colRange: number;
    colVar: number;
    opacity: number;
    opaVar: number;
    tri: SVGPolygonElement;

    constructor(p1: Point, p2: Point, p3: Point) {
		this.p1 = p1;
		this.p2 = p2;
		this.p3 = p3;

		// options
		this.color = '#373a3e';
		this.colRange = 50;
		this.colVar = 0.3;
		this.opacity = 0;
		this.opaVar = 2;
        
        this.tri = new SVGPolygonElement;

		this.shiftColor();
		this.shiftOpacity();
	};

	// shifts triangles color slightly by a random amount and converts to hex
	shiftColor() {
		// parse color into numbers
		var colArr = [
            parseInt(this.color.substr(1,2),16),
            parseInt(this.color.substr(3,2),16),
            parseInt(this.color.substr(5,2),16)
        ];
        var colStr = '#';
        var val;
        const shift = Math.floor((Math.random() - 0.5) * this.colVar * this.colRange);
		for (val of colArr) {
			val += shift;
			colStr += val.toString(16);
		}
		this.color = colStr;
	};

	// shift triangles opacity slightly by a random amount
	shiftOpacity() {
		const shift = (Math.random() - 0.5) * this.opaVar;
		this.opacity = shift;
	};

	// constrain opacity within bounds
	boundedOpacity(opacity: number) {
		const o = opacity + this.opacity;
		if (o < 0) {
			return 0;
		}
		else if (o > 1) {
			return 1;
		}
		else {
			return o;
		}
	};

	// draws triangle to canvas
	draw(opacity: number) {
		this.tri.setAttribute('opacity', this.boundedOpacity(opacity).toString());
	};

	// creates an svg triangle
	createSvgTri() {
		this.tri = document.createElementNS(svgns, 'polygon');
		this.tri.setAttribute('points', `${this.p1.x} ${this.p1.y} ${this.p2.x} ${this.p2.y} ${this.p3.x} ${this.p3.y}`);
		this.tri.setAttribute('style', `fill:${this.color};stroke:${this.color};stroke-width:1.01;`);
		this.tri.setAttribute('opacity', '0');

        // inject triangle element into svg element
        scrollElement.appendChild(this.tri);
	};
};

const triangles = () => {
    const width = 900;

    return (
        <svg></svg>
    );
};

export default triangles;