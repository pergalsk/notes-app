// MODAL remove dialogue controller
notesApp.controller('ModalRemoveCtrl', function ($scope, $uibModalInstance) {

	$scope.ok = function () {
		$uibModalInstance.close();
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

});


// MODAL add dialogue controller
notesApp.controller('ModalAddCtrl', function ($scope, $uibModalInstance, id) {

	$scope.id = id.value;

	$scope.ok = function () {
		$uibModalInstance.close();
	};

});