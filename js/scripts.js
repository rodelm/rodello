angular.module("rodelloApp", [ "dndLists" ]);
angular.module("rodelloApp", [ "ngRoute" ]);
angular.module("rodelloApp", [ "ngStorage" ]);

/*angular.module("rodelloApp").controller("CardController", function($scope) {
    // go boxes
    $scope.models = {
        selected: null,
        lists: {"Backlog": [], "InProgress": [], "Done": []}
    };
    for (var i = 1; i <= 3; ++i) {
        $scope.models.lists.Backlog.push({
            label: "Item A" + i
        });
        $scope.models.lists.InProgress.push({
            label: "Item B" + i
        });
        $scope.models.lists.Done.push({
            label: "Item C" + i
        });
    }
    $scope.addCard = function(columnName) {
        // add new card to boxes
        $scope.models.lists[columnName].push({
            label: "Story #1"
        });
        
    };

    // Model to JSON for demo purpose
    $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);

});*/

angular.module("rodelloApp", [ "dndLists", "ngStorage" ]);

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
        storyCounter: 0,
        firstTime: true
    });
    $scope.models = {
        selected: null,
        lists: $scope.$storage.lists,
        trashItems: $scope.$storage.trashItems,
        footerExpanded: false
    };

    // add new card to boxes + assign colors
    $scope.color = "blue";
    $scope.addCard = function(columnName) {
        $scope.$storage.lists[columnName].push({
            label: "Story " + ++$scope.$storage.storyCounter,
            color: "blue"
        });
    };
    //Toggle color chooser
    $scope.IsHidden = true;
    $scope.ShowHide = function () {
        //If DIV is hidden it will be visible and vice versa.
        $scope.IsHidden = $scope.IsHidden ? false : true;
    };

    //Pressing 'archive' on a story moves the item to the bottom Trash
    $scope.moveToTrash = function(columnName, item, index) {
        item.column = columnName;
        console.log(item);
        $scope.$storage.trashItems.items.push(item);
        //remove item from the draggable list
        $scope.$storage.lists[columnName].splice(index, 1);
    };
    $scope.permanentlyDelete = function(index) {
        delete $scope.$storage.trashItems["items"].splice(index, 1);
    };
    $scope.putBack = function(index, item) {
        var columnName = item.column;
        delete item.column;
        $scope.$storage.lists[columnName].push(item);
        delete $scope.$storage.trashItems["items"].splice(index, 1);
    };

    $scope.changeColor = function(idx, columnName) {
        alert(idx + columnName);
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
