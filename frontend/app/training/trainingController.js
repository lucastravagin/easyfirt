(function() {
    angular.module('appEasyFit').controller('TrainingCtrl', [
        '$scope',
        '$http',
        'msgs',
        'consts',
        TrainingController
    ])

    function TrainingController ($scope,$http, msgs,consts) {

        const url = `${consts.apiUrl}/students`

        $scope.getStudent = function(filter) {
            $http.get(`${url}?nome__regex=/^${filter}/i`).then(function(resp) {
                $scope.students = resp.data
                $scope.student = {}
              })
        }

        $scope.preencheCampo = function(student) {
            $scope.resultPreencheCampo = student
        }


    }

})()