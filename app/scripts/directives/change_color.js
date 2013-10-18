angular.module('tickeyApp')
	.directive("mouse", function() {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				element.bind('mouseenter', function() {
					element.addClass("backgroundCellColor");
				});
				element.bind('mouseleave', function() {
					element.removeClass("backgroundCellColor");
				});
		}
	}
})