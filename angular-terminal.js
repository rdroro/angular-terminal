angular
.module('angular-terminal', [])
.directive('angularTerminal', ['$rootScope', function ($rootScope) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			// define namespace
			var namespace = 'terminal.' + (attrs.angularTerminal || 'default'),
				t;
				var e = $('#'+element[0].id);
			// initialize terminal object
			t = e.terminal(function(input, terminal) {
				// user input commands
				$rootScope.$emit(namespace, input, terminal);
			}, {
   				greetings: attrs.greetings || '',
				height: 200,
				prompt: attrs.prompt || '$ '
			});

			// receiving echo commands\
			$rootScope.$on(namespace + '.echo', function (e, msg) {
				t.echo(msg);
			});
		}
	};
}]);
