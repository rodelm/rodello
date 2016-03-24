/*var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.count = 0;
    $scope.myFunction = function() {
        $scope.count++;
    }
});*/


angular.module('rodelloApp', [])
    .controller('cardController', function($scope) {
        var count = 0;
        var cardName = "Story";
        $scope.cards = [];
        $scope.addCard = function() {
        	count++;
            $scope.cards.push(cardName + count);
            $('#card-name').show();
        }

        $scope.enableEditor = function() {
            $('.options, #card-name').hide();
            $('#edit-wrap').show();
        }

        $scope.save = function() {
            $scope.card = ($scope.cardTitle);
            $('#edit-wrap').hide();
            $('.options, #card-name').show();
        };

        /*$scope.editName = function(){
            $('#update-card-name').show();
            $('.options, #card-name').hide();
        }*/

        /*$scope.hideOptions = function(){
        	$('.actions').hide();
        }
        $scope.showOptions = function(){
        	$('.actions').show();
        }*/
});



$( '#sortableLogs, #sortableProgress, #sortableDone' ).sortable({
      connectWith: '.connectedSortable',
      placeholder: 'ui-sortable-placeholder'
});


/*
function ClickToEditCtrl($scope) {
  $scope.title = "Welcome to this demo!";
  $scope.editorEnabled = false;
  
  $scope.enableEditor = function() {
    $scope.editorEnabled = true;
    $scope.editableTitle = $scope.title;
  };
  
  $scope.disableEditor = function() {
    $scope.editorEnabled = false;
  };
  
  $scope.save = function() {
    $scope.title = $scope.editableTitle;
    $scope.disableEditor();
  };
}*/