angular.module("rodelloApp", [ "dndLists", "ngStorage", "ngRoute" ]);
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
        storyCounter: 0
    });
    $scope.models = {
        selected: null,
        lists: $scope.$storage.lists,
        trashItems: $scope.$storage.trashItems
    };

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
        //If DIV is hidden it will be visible and vice versa.
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
    $scope.putBack = function(index, item) {
        var columnName = item.column;
        delete item.column;
        $scope.$storage.lists[columnName].push(item);
        delete $scope.$storage.trashItems["items"].splice(index, 1);
    };

    $scope.clearBoard = function(columnName) {
        $scope.$storage.lists[columnName] = [];
    };
    $scope.toggleBox = function() {
        this.colorEnabled = false;
    };
    // Model to JSON for demo purposes
    $scope.$watch("models", function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);
    function retrieveObjects() {
        var retrievedObjects = localStorage.getItem("listObjects");
        return JSON.parse(retrievedObjects);
    }
    $scope.toggleFooter = function() {
        $scope.models.footerExpanded = !$scope.models.footerExpanded;
    };
    
} ]);
