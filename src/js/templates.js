;(function(){

'use strict';

angular.module('notesApp').run(['$templateCache', function($templateCache) {

  $templateCache.put('partials/add.html', '<div class="jumbotron"><h2 translate="ADD_NEW_NOTE"></h2><form name="form" novalidate><div class="input-group add-group"><input type="text" class="form-control" placeholder="{{ \'TYPE_A_NOTE\' | translate }}" name="noteText" ng-model="noteText" required> <span class="input-group-btn"><button class="btn btn-primary" type="button" ng-click="addNote()" ng-disabled="form.noteText.$invalid"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> {{ \'ADD_BTN\' | translate }}</button></span></div></form></div>');

  $templateCache.put('partials/detail.html', '<div class="jumbotron"><h2 translate="DETAIL_NOTE" translate-values="{ value: note.id }"></h2><p ng-show="message">{{ message }}</p><p ng-show="error" translate="CANNOT_RESOLVE_DETAIL"></p><small ng-show="status" translate="RESPONSE_STATUS" translate-values="{ value: status }"></small></div>');

  $templateCache.put('partials/edit.html', '<div class="jumbotron"><h2 translate="CHANGE_NOTE_TEXT" translate-values="{ value: noteID }"></h2><form name="form" novalidate><div class="input-group add-group"><input type="text" class="form-control" placeholder="{{ \'TYPE_A_NOTE\' | translate }}" name="noteText" ng-model="noteText" required autofocus> <span class="input-group-btn"><button class="btn btn-primary" type="button" ng-click="updateNote()" ng-disabled="form.noteText.$invalid"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> {{ \'UPDATE_BTN\' | translate }}</button></span></div></form></div>');

  $templateCache.put('partials/footer.html', '<hr><footer><div class="row"><div class="col-sm-8"><button class="btn btn-default lang" ng-show="lang == \'sk\'" ng-click="changeLanguage(\'en\')"><span class="glyphicon glyphicon-retweet" aria-hidden="true"></span> {{ \'BUTTON_LANG_EN\' | translate }}</button> <button class="btn btn-default lang" ng-show="lang == \'en\'" ng-click="changeLanguage(\'sk\')"><span class="glyphicon glyphicon-retweet" aria-hidden="true"></span> {{ \'BUTTON_LANG_SK\' | translate }}</button></div><div class="col-sm-4"><p class="text-right"><small>&copy; -pg- 2016</small></p></div></div></footer>');

  $templateCache.put('partials/header.html', '<div class="row"><div class="col-sm-8"><h1><a ui-sref="home"><span class="glyphicon glyphicon-comment" aria-hidden="true"></span> {{ \'NOTES_APP\' | translate }}</a></h1></div><div class="col-sm-4 text-right"><button id="add-button" type="button" class="btn btn-primary" aria-label="{{ \'ADD_NEW_NOTE_BTN\' | translate }}" ui-sref="add"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> {{ \'ADD_NEW_NOTE_BTN\' | translate }}</button></div></div>');

  $templateCache.put('partials/home.html', '<div class="jumbotron"><h2 translate="WELCOME_TITLE"></h2><p translate="WELCOME_TEXT"></p></div>');

  $templateCache.put('partials/modal-add.html', '<div class="modal-header"><h3 class="modal-title" translate="INFO"></h3></div><div class="modal-body"><p translate="NEW_NOTE_ADDED" translate-values="{ value: id}"></p></div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="ok()" translate="OK_BTN"></button></div>');

  $templateCache.put('partials/modal-edit.html', '<div class="modal-header"><h3 class="modal-title" translate="INFO"></h3></div><div class="modal-body"><p translate="NOTE_UPDATED" translate-values="{ value: id }"></p></div><div class="modal-footer center-text"><button class="btn btn-primary" type="button" ng-click="ok()" translate="OK_BTN"></button></div>');

  $templateCache.put('partials/modal-remove.html', '<div class="modal-header"><h3 class="modal-title" translate="REMOVE_NOTE"></h3></div><div class="modal-body"><p translate="SURE_REMOVE"></p></div><div class="modal-footer"><button class="btn btn-default" type="button" ng-click="cancel()" translate="CANCEL_BTN"></button> <button class="btn btn-danger" type="button" ng-click="ok()" translate="REMOVE_BTN"></button></div>');

  $templateCache.put('partials/remove.html', '<div class="jumbotron"><h2 translate="REMOVE_NOTE"></h2><p ng-show="!(ok || error)" translate="REMOVING_NOTE" translate-values="{ value: noteID }"></p><p ng-show="ok" translate="NOTE_REMOVED" translate-values="{ value: noteID }"></p><p ng-show="error" translate="NOTE_CANNOT_REMOVE" translate-values="{ value: noteID }"></p><p ng-show="cancel" translate="CANCELLED"></p><small ng-show="status" translate="RESPONSE_STATUS" translate-values="{ value: status }"></small></div>');

  $templateCache.put('partials/table.html', '<table class="table table-striped"><tr ng-repeat="x in myData"><td class="tbl-number">{{ x.id }}</td><td class="tbl-text">{{ x.title }}</td><td class="tbl-buttons"><div class="btn-group" role="group" aria-label="{{ \'BUTTON_GROUP\' | translate }}"><button type="button" class="btn btn-default" aria-label="{{ \'DETAIL_BTN_LABEL\' | translate }}" ui-sref="detail({noteID: x.id})" uib-tooltip="{{ \'DETAIL_BTN_LABEL\' | translate }}"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button><button type="button" class="btn btn-default" aria-label="{{ \'EDIT_BTN_LABEL\' | translate }}" ui-sref="edit({noteID: x.id})" uib-tooltip="{{ \'EDIT_BTN_LABEL\' | translate }}"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button><button type="button" class="btn btn-danger" aria-label="{{ \'REMOVE_BTN_LABEL\' | translate }}" ui-sref="remove({noteID: x.id})" uib-tooltip="{{ \'REMOVE_BTN_LABEL\' | translate }}"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></div></td></tr></table>');

}]);

})();