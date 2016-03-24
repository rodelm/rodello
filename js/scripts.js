angular.module('rodelloApp', ['ngStorage'])
    .controller('cardController', function($scope,$localStorage,$sessionStorage) {
        
        $localStorage.backlogCards = []
        $localStorage.inprogressCards = []
        $localStorage.doneCards = []
      
        $scope.backlogCards = []
        $scope.inprogressCards = []
        $scope.doneCards = []

        $scope.addBacklog = function(title) {
          $scope.backlogCards.push("Story" + $scope.backlogCards.length);
        }

        $scope.addInProgress = function() {
          $scope.inprogressCards.push("progress");
        }

        $scope.addDone = function() {
          $scope.doneCards.push("done");
        }

        $scope.enableEditor = function(ind) {
          console.log(ind);
          $('.backlog-' + ind).hide();
          $('.options').hide();
          $('.backlog-editwrap-' + ind).show();          
        }

        $scope.save = function(ind) {
          console.log(ind);
          $('.options').show();
          $('.backlog-' + ind).show();          
        }
});



$( '#sortableLogs, #sortableProgress, #sortableDone' ).sortable({
      connectWith: '.connectedSortable',
      placeholder: 'ui-sortable-placeholder'
});

