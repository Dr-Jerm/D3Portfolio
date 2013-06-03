define(function (require){

	var $ = require('jquery'),
        d3 = require('d3'),
        Circle = require('../circle');

	$('#title').append("WOOT!");
    console.log("up and running");


    var w = window.innerWidth,
		h = window.innerHeight;

	var svg = d3.select("#portfolioApp").append("svg:svg")
		.attr("width", w)
		.attr("height", h);

	var circles = [];

	var circleCount = 200;
	var count = 0;
	while(count < circleCount){
		var newCircle = new Circle(svg, {radius: Math.random() * 12 + 4});
		circles.push(newCircle);
		newCircle.addCircle(svg,[newCircle]);
		count++;
	}

	color = d3.scale.category10();
	var force = d3.layout.force()
		.gravity(0.05)
		.charge(function(d, i) { return i ? 0 : -2000; })
		.nodes(circles)
		.size([w, h]);
	var root = circles[0];
	root.radius = 0;
	root.fixed = true;
	force.start();

	// svg.selectAll("circle")
	// 	.data(circles.slice(1))
	// 	.enter().append("svg:circle")
	// 	.attr("r", function(d) { return d.radius - 2; })
	// 	.style("fill", function(d, i) { return color(i % 3); });
	force.on("tick", function(e) {
		var q = d3.geom.quadtree(circles),
		i = 0,
		n = circles.length;
		while (++i < n) {
			q.visit(collide(circles[i]));
		}
		svg.selectAll("circle")
			.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; });
	});

	// svg.on("mousemove", function() {
	// 	var p1 = d3.svg.mouse(this);
	// 	root.px = p1[0];
	// 	root.py = p1[1];
	// 	force.resume();
	// });

    $(window).mousemove(function(event) {
        root.px = ( event.clientX);
        root.py = ( event.clientY);
        force.resume();
    });

    $(window).click(function(event) {
        root.px = ( event.clientX);
        root.py = ( event.clientY);
        force.resume();
    });

	function collide(node) {
		var r = node.radius + 16,
		nx1 = node.x - r,
		nx2 = node.x + r,
		ny1 = node.y - r,
		ny2 = node.y + r;
		return function(quad, x1, y1, x2, y2) {
			if (quad.point && (quad.point !== node)) {
				var x = node.x - quad.point.x,
				y = node.y - quad.point.y,
				l = Math.sqrt(x * x + y * y),
				r = node.radius + quad.point.radius;
				if (l < r) {
				l = (l - r) / l * .5;
				node.x -= x *= l;
				node.y -= y *= l;
				quad.point.x += x;
				quad.point.y += y;
				}
			}
		return x1 > nx2
			|| x2 < nx1
			|| y1 > ny2
			|| y2 < ny1;
		};
	} 
});