/*global angular: true*/

var todoApp = angular.module('todoApp', ['ngRoute', 'ngResource']);


todoApp.controller('ListCtrl', function($scope, $http) {
    
    $scope.isLoaded = false;
    $scope.formData = {};
    $scope.newlist = {};
    $scope.lists = [];
    $scope.tasks =[];
    $scope.newTask = {};
    $scope.changedTask = {};
    
    
    $scope.saveList = function(list) {
        $scope.list = list;
        console.log('saving list');
        $http.post('/api/todolists/', $scope.list)
            .success(function(data) {
                $scope.list = {};
                $scope.lists = data;
            }).error(function(data) {
                console.log('Error: ' + data);
            })
    }
    
    $scope.removeList = function(listId) {
        var query = '/api/todolists/'+ listId;
        $http.delete(query)
        .success(function(data) {
            $scope.update();
        }).error(function(data) {
           console.log('Error: ' + data); 
        });
    }
    
    $scope.changeState = function(changedTask,
                                    taskId,
                                    listId,
                                    taskText,
                                    priority) {
          $scope.changedTask = changedTask;
          $scope.changedTask.taskText = taskText;
          $scope.changedTask.priority = priority;
          var query = '/api/todolists/'+ listId +'/tasks/' + taskId;
          $http.put(query, $scope.changedTask)
            .success(function(data) {
                $scope.changedTask = {};
            }).error(function(data) {
                console.log('Error: ' + data);
            })
    };
    
    
    
    $scope.getTasks = function(listId) {
      console.log(listId);
      var query = '/api/todolists/'+ listId +'/tasks';
      $http.get(query)
        .success(function(data) {
            $scope.tasks = data;
            $scope.isLoaded = true;
        }).error(function(data) {
           console.log('Error: ' + data); 
        });
    };
    
    $scope.addTask = function(listId, newTask) {
            $scope.newTask = newTask;
          $http.post('/api/todolists/' + listId + '/tasks', $scope.newTask)
            .success(function(data) {
                $scope.formData = {};
                $scope.tasks = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
    $scope.removeTask = function(listid, taskId) {
        var query = '/api/todolists/'+ listid +'/tasks/' + taskId;
        $http.delete(query)
        .success(function(data) {
            console.log(data);
            $scope.tasks = data;
        }).error(function(data) {
           console.log('Error: ' + data); 
        });
    }
    
    $scope.update = function() {
       $http.get('/api/todolists')
        .success(function(data) {
            $scope.lists = data;
        }).error(function(data) {
           console.log('Error: ' + data); 
        }); 
    }

    $http.get('/api/todolists')
        .success(function(data) {
            $scope.lists = data;
        }).error(function(data) {
           console.log('Error: ' + data); 
        });
    
});
