(function() {
    angular.module('appEasyFit').controller('studentController', [
        '$scope',
        '$http',
        'msgs',
        '$location',
        'tabs',
        'consts',
        '$rootScope',
        StudentController
    ])

    function StudentController($scope,$http, msgs, $location,tabs,consts, $rootScope) {

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

        $scope.showDashboardStudent = function(student) {
            var obj = student.avaliacoesFisicas
            var ultimaAval = obj[obj.length - 1]
            $rootScope.ultimaAvalicao = ultimaAval
            var objSegunda = student.segunda
            var objTerca = student.terca
            var objQuarta = student.quarta
            var objQuinta = student.quinta
            var objSexta = student.sexta
            var objSabado = student.sabado

            var treinoSegunda = objSegunda[objSegunda.length - 1]
            var treinoTerca = objTerca[objTerca.length - 1]
            var treinoQuarta = objQuarta[objQuarta.length - 1]
            var treinoQuinta = objQuinta[objQuinta.length - 1]
            var treinoSexta = objSexta[objSexta.length - 1]
            var treinoSabado = objSabado[objSabado.length - 1]

            $rootScope.treinoSegunda = treinoSegunda
            $rootScope.treinoTerca = treinoTerca
            $rootScope.treinoQuarta = treinoQuarta
            $rootScope.treinoQuinta = treinoQuinta
            $rootScope.treinoSexta = treinoSexta
            $rootScope.treinoSabado = treinoSabado
    
            $rootScope.studentDashboard  = student

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