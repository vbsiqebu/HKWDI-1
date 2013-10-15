angular.module('tickeyApp')
	.directive("tickleMe", function() {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				element.bind('click', function() {
					alert("I have no idea what I'm doing!");
				});
			}
		}
	})