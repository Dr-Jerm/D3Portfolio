define(['require', 'exports', 'module'], function (require, exports, module) {
 
 // http://www.koalastothemax.com/
	var Circle = function(svg, params){
		this.radius = params.radius;

		var color = d3.scale.category10();

		this.addCircle = function(svg, circles){
			var circle = svg.selectAll('.nope')
				.data(circles)
				.enter()
				.append('svg:circle')
				.attr("r", function(d) { return d.radius - 2; })
				.style("fill", function(d, i) { return color(i % 3); });;
		}

		this.collide = function(){
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
		}
	}

	module.exports = Circle;

	// console.log("Node1!");
});