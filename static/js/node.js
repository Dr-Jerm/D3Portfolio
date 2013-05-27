define(['require', 'exports', 'module'], function (require, exports, module) {
 
	var Node = function(){
		this.test = "woot!";

		this.testTest = function(){
			console.log(this.test);
		}
		// console.log("Exported Node!");
	}

	module.exports = Node;

	// console.log("Node1!");
});