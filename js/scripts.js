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
        $scope.cards = [];
        $scope.addCard = function() {
        	count++;
            $scope.cards.push('Story '+count);
        }

        $scope.editName = function(){
            $('#update-card-name').show();
            $('#card-name').hide();
            $('#btn-edit').hide();
            /*$event.preventDefault();*/
        }
});



$( '#sortableLogs, #sortableProgress, #sortableDone' ).sortable({
      connectWith: '.connectedSortable',
      placeholder: 'ui-sortable-placeholder'
});




