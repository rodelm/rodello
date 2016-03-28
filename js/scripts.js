angular.module("rodelloApp", [ "dndLists", "ngStorage", "ngRoute", "angular-tour" ]);
angular.module("rodelloApp").controller("CardController", [ "$scope", "$localStorage", function($scope, $localStorage) {
    var listObjects = {
        Backlog: [],
        InProgress: [],
        Done: []
    };
    $scope.$storage = $localStorage.$default({
        lists: {
            Backlog: [],
            InProgress: [],
            Done: []
        },
        trashItems: {
            items: []
        },
        storyCounter: 0, tourStatus: true
    });
    $scope.models = {
        selected: null,
        lists: $scope.$storage.lists,
        trashItems: $scope.$storage.trashItems
    };

    // enable tour
    /*var curStep = $cookies.get('myTour');
    
    if(typeof curStep === 'string')
        curStep = parseInt(curStep);

        $scope.currentStep = curStep || 0;

        $scope.postTourCallback = function() {
          console.log('tour closes');
        };

        $scope.tourCompleteCallback = function() {
          console.log('tour completed');
        }

        $scope.postStepCallback = function() {
          console.log('Tour - Update Step', $scope.currentStep);
          $cookies.put('myTour', $scope.currentStep);
        };
*/

    // add new card to boxes + assign colors
    $scope.color = "DarkBlue";
    $scope.addCard = function(columnName) {
        $scope.$storage.lists[columnName].push({
            label: "Story " + ++$scope.$storage.storyCounter,
            color: "DarkBlue"
        });
    };

    //toggle color chooser
    $scope.IsHidden = true;
    $scope.ShowHide = function () {
        $scope.IsHidden = $scope.IsHidden ? false : true;
    };
    $scope.changeColor = function (columnName, color, $index) {
        $scope.models.lists[columnName][$index].color = color;
    };

    $scope.moveToTrash = function(columnName, label) {
        $scope.models.trashItems.items.push({
            label: label,
            column: columnName
        });
    };

    //move to trash
    $scope.moveToTrash = function(columnName, item, index) {
        item.column = columnName;
        console.log(item);
        $scope.$storage.trashItems.items.push(item);
        //remove item from the draggable list
        $scope.$storage.lists[columnName].splice(index, 1);
    };
    $scope.purgeTrash = function(index) {
        delete $scope.$storage.trashItems["items"].splice(index, 1);
    };

    $scope.clearBoard = function(columnName) {
        $scope.$storage.lists[columnName] = [];
    };
    $scope.toggleBox = function() {
        this.colorEnabled = false;
    };
    
    
} ]);


    