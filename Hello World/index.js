const { Anchor, Group, Box, Shape, Hemisphere, easeInOut, TAU } = Zdog;

const colors = {
	swing: ["hsl(333 22% 54%)", "hsl(344 43% 65%)"],
	set: ["hsl(344 26% 46%)", "hsl(8 56% 66%)"],
	face: ["hsl(25 37% 46%)", "hsl(23 46% 72%)"],
	eye: ["hsl(288 24% 29%)"],
	character: ["hsl(231 22% 54%)", "hsl(219 43% 65%)"]
};

const stroke = 1;
const offsetZ = 17;
const offsetY = 19;

const root = new Anchor({
	rotate: {
		x: -0.25,
		y: -0.6
	}
});

const topAnchor = new Anchor({
	addTo: root,
	translate: {
		y: offsetY * -1
	}
});

const swing = new Anchor({
	addTo: topAnchor
});

const box = new Box({
	color: colors["swing"][0],
	topFace: colors["swing"][1],
	bottomFace: colors["swing"][1],
	stroke,
	width: 6,
	height: 2,
	depth: 12
});

const seat = new Anchor({
	addTo: swing,
	translate: {
		y: offsetY
	}
});

box.copy({
	addTo: seat
});

const character = new Group({
	addTo: seat,
	translate: {
		y: (box.height / 2 + stroke) * -1
	}
});

const base = new Shape({
	addTo: character,
	color: colors["character"][0],
	stroke,
	fill: true,
	path: [
		{ x: 0, y: 0, z: -1.5 },
		{
			arc: [
				{ x: 1.5, y: 0, z: -1.5 },
				{ x: 1.5, y: 0, z: 0 }
			]
		},
		{
			arc: [
				{ x: 1.5, y: 0, z: 1.5 },
				{ x: 0, y: 0, z: 1.5 }
			]
		},
		{
			arc: [
				{ x: -1.5, y: 0, z: 1.5 },
				{ x: -1.5, y: 0, z: 0 }
			]
		},
		{
			arc: [
				{ x: -1.5, y: 0, z: -1.5 },
				{ x: 0, y: 0, z: -1.5 }
			]
		}
	]
});

base.copy({
	color: colors["character"][1],
	translate: {
		y: 3 * -1
	}
});

const core = new Anchor({
	addTo: base,
	rotate: {
		y: 0.5
	}
});

const characterArc = new Shape({
	addTo: core,
	color: colors["character"][0],
	stroke,
	fill: true,
	path: [
		{ x: 0, y: 0, z: -1.5 },
		{ x: 0, y: -3, z: -1.5 },
		{
			arc: [
				{ x: 1.5, y: -3, z: -1.5 },
				{ x: 1.5, y: -3, z: 0 }
			]
		},
		{ x: 1.5, y: 0, z: 0 },
		{
			arc: [
				{ x: 1.5, y: 0, z: -1.5 },
				{ x: 0, y: 0, z: -1.5 }
			]
		}
	]
});

characterArc.copy({
	rotate: {
		y: TAU / 4
	}
});

characterArc.copy({
	color: colors["character"][1],
	rotate: {
		y: TAU / 2
	}
});

characterArc.copy({
	color: colors["character"][1],
	rotate: {
		y: (TAU * 3) / 4
	}
});

const face = new Anchor({
	addTo: character,
	translate: {
		y: (5.2 + stroke) * -1
	},
	rotate: {
		y: TAU / 4
	}
});

new Hemisphere({
	addTo: face,
	color: colors["face"][1],
	stroke,
	diameter: 3 + stroke / 2,
	rotate: {
		x: (TAU / 4) * -1
	}
});

new Hemisphere({
	addTo: face,
	color: colors["face"][0],
	stroke,
	diameter: 3 + stroke / 2,
	rotate: {
		x: TAU / 4
	}
});

const eye = new Shape({
	color: colors["eye"][0],
	stroke: 0.2 + stroke / 2
});

eye.copy({
	addTo: face,
	translate: {
		x: (0.3 + stroke / 2) * -1,
		y: 0.5 + stroke / 2,
		z: 1 + stroke
	}
});

eye.copy({
	addTo: face,
	translate: {
		x: 0.3 + stroke / 2,
		y: 0.5 + stroke / 2,
		z: 1 + stroke
	}
});

const corner = new Box({
	color: colors["set"][0],
	topFace: colors["set"][1],
	leftFace: colors["set"][1],
	width: 5,
	height: 5,
	depth: 5,
	stroke
});

const support = new Anchor({
	addTo: corner,
	translate: {
		y: 2.5 + stroke
	},
	rotate: {
		y: 0.5
	}
});

const supportArc = new Shape({
	addTo: support,
	color: colors["set"][0],
	stroke,
	fill: true,
	path: [
		{ x: 0, y: 0, z: -2.1 },
		{
			arc: [
				{ x: 2.1, y: 0, z: -2.1 },
				{ x: 2.1, y: 0, z: 0 }
			]
		},
		{ x: 2.1, y: offsetY, z: 0 },
		{
			arc: [
				{ x: 2.1, y: offsetY, z: -2.1 },
				{ x: 0, y: offsetY, z: -2.1 }
			]
		}
	]
});

supportArc.copy({
	rotate: {
		y: TAU / 4
	}
});

supportArc.copy({
	color: colors["set"][1],
	rotate: {
		y: TAU / 2
	}
});

supportArc.copy({
	rotate: {
		y: (TAU * 3) / 4
	}
});

corner.copyGraph({
	addTo: topAnchor,
	translate: {
		z: offsetZ
	}
});

corner.copyGraph({
	addTo: topAnchor,
	translate: {
		z: offsetZ * -1
	}
});

const beam = new Anchor({ addTo: topAnchor, rotate: { z: -0.3 } });

const topArc = new Shape({
	addTo: beam,
	color: colors["set"][0],
	stroke,
	fill: true,
	path: [
		{ x: 0, y: -2.25, z: (offsetZ - 2.5 - stroke) * -1 },
		{
			arc: [
				{ x: 2.25, y: -2.25, z: (offsetZ - 2.5 - stroke) * -1 },
				{ x: 2.25, y: 0, z: (offsetZ - 2.5 - stroke) * -1 }
			]
		},
		{ x: 2.25, y: 0, z: offsetZ - 2.5 - stroke },
		{
			arc: [
				{ x: 2.25, y: -2.25, z: offsetZ - 2.5 - stroke },
				{ x: 0, y: -2.25, z: offsetZ - 2.5 - stroke }
			]
		}
	]
});

topArc.copy({
	rotate: {
		z: TAU / 4
	}
});
topArc.copy({
	rotate: {
		z: TAU / 2
	}
});
topArc.copy({
	color: colors["set"][1],
	rotate: {
		z: (TAU * 3) / 4
	}
});

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const { width, height } = canvas;
const zoom = 11;

context.lineJoin = "round";
context.lineCap = "round";

const render = () => {
	context.clearRect(0, 0, width, height);
	context.save();
	context.translate(width / 2, height / 2);
	context.scale(zoom, zoom);
	root.renderGraphCanvas(context);
	context.restore();
};

root.translate.y = offsetY / 2;
swing.rotate.z = -0.5;
root.updateGraph();
render();

let state = "wait";
const z = swing.rotate.z * 2;

let frame = null;
let ticker = 0;
const cycle = 60;
let direction = z <= 0 ? 1 : -1;

const animate = () => {
	ticker += direction;
	if (ticker >= cycle) {
		ticker = cycle;
		direction = -1;
	} else if (ticker <= 0) {
		ticker = 0;
		direction = 1;

		cancelAnimationFrame(frame);
		state = "wait";
		button.setAttribute("data-state", state);

		return;
	}

	const offset = 0.5 - easeInOut(ticker / cycle, 3);
	swing.rotate.z = z * offset;

	root.updateGraph();
	render();

	frame = requestAnimationFrame(animate);
};

const toggleAnimation = () => {
	if (state !== "wait") return;

	state = "push";
	button.setAttribute("data-state", state);
	frame = requestAnimationFrame(animate);
};

const button = document.querySelector("button");

button.addEventListener("click", toggleAnimation);
button.removeAttribute("disabled");
