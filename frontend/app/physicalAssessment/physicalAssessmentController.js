(function() {
    angular.module('appEasyFit').controller('physicalAssessmentController', [
        '$scope',
        '$http',
        'consts',
        PhysicalAssessmentController
    ])

    function PhysicalAssessmentController($scope,$http,consts) {
        const url = `${consts.apiUrl}/students`
        
        $scope.getStudent = function(filter) {
            $http.get(`${url}?nome__regex=/^${filter}/i`).then(function(resp) {
                $scope.students = resp.data
                console.log(resp.data)
                $scope.student = {}
              })
        }

        $scope.preencheCampo = function(student) {
            $scope.resultPreencheCampo = student
        }

        $scope.gorduraCorporal = function() {
            let continua = true
            let sexo = $scope.resultPreencheCampo
            console.log(sexo)
        }

        $scope.gorduraCorporal()

    }
})()