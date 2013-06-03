define(['require', 'exports', 'module'], function (require, exports, module) {
 
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

		this.testTest = function(){
			console.log(this.test);
		}
		// console.log("Exported Circle!");
	}

	module.exports = Circle;

	// console.log("Node1!");
});