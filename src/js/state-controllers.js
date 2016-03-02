// DETAIL note state controller
notesApp.controller('stateDetailCtrl', function($scope, $http, $stateParams) {

	// URL parameter
	$scope.noteID  = $stateParams.noteID;

	$scope.error = false;
	$scope.message = '';

	// Use GET HTTP method
	$http({
		method: 'GET',
		url: remoteServer + '/' + $scope.noteID
	})
	.then(function(response) {
			// When successful
			$scope.note    = response.data;
			$scope.message = $scope.note.title;
			$scope.status  = response.status + " - " + response.statusText;
		},
		function(response) {
			// When something wrong
			$scope.error = true;
			$scope.status  = response.status + " - " + response.statusText;
	});

}); // Detail controller



// REMOVE Note state controller
notesApp.controller('stateRemoveCtrl', function($scope, $http, $uibModal, $stateParams) {
	
	// URL parameter			
	$scope.noteID  = $stateParams.noteID;
	$scope.ok      = false;
	$scope.error   = false;

	// Open confirmation dialogue
	var modalInstance = $uibModal.open({
		templateUrl: 'partials/modal-remove.html',
		controller: 'ModalRemoveCtrl'
	});

	// Result from confirmation dialogue
	modalInstance.result.then(function () {
		
		// Use DELETE HTTP method
		$http({
			method: 'DELETE',
			url: remoteServer + "/" + $scope.noteID
		})
		.then(function(response) {
				// When successful
				$scope.ok = true;
				$scope.status  = response.status + " - " + response.statusText;
			},
			function(response) {
				// When something wrong
				$scope.error = true;
				$scope.status  = response.status + " - " + response.statusText;
			}
		);
	
	},function (){
		// Dialogue cancelled
		$scope.cancel = true;
	});

}); // Remove controller



// ADD note state controller
notesApp.controller('stateAddCtrl', function($scope, $http, $uibModal, countNotes) {

	// New Note's ID
	$scope.noteID = countNotes + 1;

	$scope.addNote = function() {
		
		if (countNotes > -1) {
			$http({
				method: 'POST',
				url: remoteServer,
				headers: {
					'Content-Type': 'application/json'
				},
				data: {
					'id': $scope.noteID,
					'title': $scope.noteText
				}
			})
			.then(function(response) {

					// When successful
					// Open info dialogue
					$uibModal.open({
						templateUrl: 'partials/modal-add.html',
						controller:  'ModalAddCtrl',
						resolve: {
							id: function() {
								return {
									value: $scope.noteID
								}
							}
						}
					});

					$scope.noteText = '';

				}, function(response) {
						// TODO:
						// When something wrong
				}
			);
		} else {
			// TODO:
			// When something wrong
		}
	
	} // function addNote

}); // Add controller



// EDIT note state controller
notesApp.controller('stateEditCtrl', function($scope, $http, $uibModal, noteData) {

	$scope.noteText = noteData.title;
	$scope.noteID   = noteData.id;


	$scope.updateNote = function() {

		// Use PUT HTTP method
		$http({
			method: 'PUT',
			url: remoteServer + '/' + $scope.noteID,
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				'title': $scope.noteText
			}
		})
		.then(function(response) {

				// When successful
				// Open info dialogue
				$uibModal.open({
					templateUrl: 'partials/modal-edit.html',
					controller:  'ModalAddCtrl',
					resolve: {
						id: function() {
							return {
								value: $scope.noteID
							}
						}
					}
				});

				$scope.noteText = '';

			}, function(response) {
				// TODO:
				// When something wrong
			}
		);

	} // function updateNote

});  // Edit controller



// MAIN application controller
notesApp.controller('myCtrl', function($rootScope, $scope, $translate, $http) {

	// Function for changing language
	$scope.changeLanguage = function (key) {
		$translate.use(key);
	};

	// On language change
	$rootScope.$on('$translateChangeSuccess', function(event, data) {
		$rootScope.lang = data.language;
	});

	// Load all Notes
	$http({
		method: 'GET',
		url: remoteServer
	}).then(function(response) {
			$scope.myData = response.data;
		},
		function(response) {
			// TODO:
			//$scope.myStatus = response.status + ": " + response.statusText + " (Wrong!)";
		}
	);

});
