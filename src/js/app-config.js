var notesApp     = angular.module('notesApp',
	['ui.router', 'pascalprecht.translate', 'ngCookies', 'ui.bootstrap', 'ngAnimate']);

var remoteServer = 'http://private-9aad-note10.apiary-mock.com/notes';


notesApp.config(function($stateProvider, $locationProvider,
	$urlRouterProvider, $uibTooltipProvider, $translateProvider) {

	// Set up preety URL
	//$locationProvider.html5Mode(true);
	
	// Translation settings
	$translateProvider.useStaticFilesLoader({
		prefix: 'translations/lang-',
		suffix: '.json'
	})
	.preferredLanguage('en')
	.useSanitizeValueStrategy('escapeParameters')
	.useLocalStorage();


	// Set tooltip options
	$uibTooltipProvider.options({
		'appendToBody': 'true',
		'popupDelay':   '500'
	});


	// Default route
	$urlRouterProvider.otherwise('/');

	// Application rooting	
	$stateProvider
		
		// Application default state
		.state('home', {
			url: '/',
			templateUrl: 'partials/home.html' // wellcome screen template
			//controller: 'stateHomeCtrl'
		})

		// Application state for displaying note detail
		.state('detail', {
			url: '/detail/:noteID',  // possible to navigate using /detail/{ID}
			templateUrl: 'partials/detail.html',
			controller:  'stateDetailCtrl'
		})

		// Application state for removing notes
		.state('remove', {
			url: '/remove/:noteID', // possible to navigate using /remove/{ID}
			templateUrl: 'partials/remove.html',
			controller:  'stateRemoveCtrl'
		})

		// Application state for adding notes
		.state('add', {
			url: '/add', // possible to navigate using /add
			templateUrl: 'partials/add.html',
			resolve: {
				// Get notes count
				countNotes: function($http) {
					return $http({
						method: 'GET',
						url: remoteServer
					})
					.then(function(response) {
						return response.data.length;
					},
					function(response){
						return -1;
					});
				}
			},
			controller: 'stateAddCtrl'
		})

		// Application state for editing notes
		.state('edit', {
			url: '/edit/:noteID',
			templateUrl: 'partials/edit.html',
			resolve: {
				noteData: function($http, $stateParams) {
					return $http({
						method: 'GET',
						url: remoteServer + '/' + $stateParams.noteID
					})
					.then(function(response) {
							return response.data;
						},
						function(response) {
							// TODO:
							// when something wrong
						}
					);
				}
			},
			controller: 'stateEditCtrl'
		});

}); //notesApp.config


// Set init global language to English
notesApp.run(function($rootScope) {

	$rootScope.lang = 'en';

});
