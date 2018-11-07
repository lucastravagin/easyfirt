(function() {
    angular.module('appEasyFit').controller('studentController', [
        '$scope',
        '$http',
        'msgs',
        '$location',
        'tabs',
        'consts',
        StudentController
    ])

    function StudentController($scope,$http, msgs, $location,tabs,consts) {

        const url = `${consts.apiUrl}/students`

        
        $scope.getStudent = function() {
            const page = parseInt($location.search().page) || 1
            const urlGet = `${url}/?skip=${(page - 1) * 10}&limit=10`
            $http.get(urlGet).then(function(resp) {
              $scope.students = resp.data
              $scope.student = {}
              $http.get(`${url}/count`).then(function(resp) {
                $scope.pages = Math.ceil(resp.data.value / 10)
                tabs.show($scope, {tabList: true, tabCreate: true})
              })
            })
          }

        $scope.getStudent()
        $scope.createStudent = function() {
            $http.post(url, $scope.student).then(function() {
                $scope.student = {}
                $scope.getStudent()
                msgs.addSuccess('Operação realizada com sucesso!')
            }).catch(function(resp) {
                msgs.addError(resp.data.errors)
            })
        }

        $scope.showTabUpdate = function(student) {
            $scope.student  = student
            tabs.show($scope, {tabUpdate: true})
        }

        $scope.showTabDelete = function(student) {
            $scope.student  = student
            tabs.show($scope, {tabDelete: true})
        }

        $scope.deleteStudent = function() {
            const deleteUrl = `${url}/${$scope.student._id}`
            $http.delete(deleteUrl, $scope.student).then(function(response) {
                $scope.student = {}
                $scope.getStudent()
                msgs.addSuccess('Operação realizada com sucesso')
            }).catch(function(resp) {
                msgs.addError(resp.data.errors)
            })
        }

        $scope.updateStudent = function() {
            const updateUrl = `${url}/${$scope.student._id}`
            $http.put(updateUrl, $scope.student).then(function(respponse) {
                $scope.getStudent()
                msgs.addSuccess('Operações realizada com sucesso!')
            }).catch(function(resp) {
                msgs.addError(resp.data.errors)
            })
        }

    }
})()