(function() {
    angular.module('appEasyFit').controller('physicalAssessmentController', [
        '$scope',
        '$http',
        'consts',
        'msgs',
        PhysicalAssessmentController
    ])

    function PhysicalAssessmentController($scope,$http,consts,msgs) {
        const url = `${consts.apiUrl}/students`
        

        $scope.avaliacoesFisicas = {}
        
        $scope.getStudent = function(filter) {
            $http.get(`${url}?nome__regex=/^${filter}/i`).then(function(resp) {
                $scope.students = resp.data
                $scope.student = {}
              })
        }

        $scope.preencheCampo = function(student) {
            $scope.resultPreencheCampo = student

        }

    
        $scope.gorduraCorporal = function() {
                let continua = true
                let sexo = $scope.resultPreencheCampo.sexo
                let massa = Number($scope.avaliacoesFisicas.peso)
                let idade = $scope.resultPreencheCampo.dataNascimento
                var idadeExtenso = idade.replace(/\//g, ',')
                var idadeCalculada = idadeExtenso.replace(/0/, '')
                var array = idadeCalculada.split(',')
                var idadeFinal = calculaIdade(array)
                let subescapular = Number($scope.avaliacoesFisicas.subescapular)
                let auxiliar_media = Number($scope.avaliacoesFisicas.auxiliar_media)
                let triceps = Number($scope.avaliacoesFisicas.triceps)
                let coxa = Number($scope.avaliacoesFisicas.coxa)
                let supra_iliaca = Number($scope.avaliacoesFisicas.supra_iliaca)
                let abdome = Number($scope.avaliacoesFisicas.abdome)
                let peitoral  = Number($scope.avaliacoesFisicas.peitoral)

                
                if(isNaN(massa)) continua = false
                if(isNaN(subescapular)) continua = false
                if(isNaN(auxiliar_media)) continua = false
                if(isNaN(triceps)) continua = false
                if(isNaN(coxa)) continua = false
                if(isNaN(supra_iliaca)) continua = false
                if(isNaN(abdome)) continua = false
                if(isNaN(peitoral)) continua = false
                
                
                if(continua) {
                    let ST = subescapular + auxiliar_media + triceps + coxa + supra_iliaca + abdome + peitoral
                    let percentual = calculaPercentual(sexo, ST, idadeFinal)
                    let massaGorda = massa * percentual / 100
                    let massaMagra = massa - massaGorda
                    $scope.avaliacoesFisicas.percentual = percentual
                    $scope.avaliacoesFisicas.massaGorda = massaGorda
                    $scope.avaliacoesFisicas.massaMagra = massaMagra

                    $scope.resultPreencheCampo.avaliacoesFisicas.push($scope.avaliacoesFisicas)


                }
            }

            $scope.update = function() {
                const updateUrl = `${url}/${$scope.resultPreencheCampo._id}`
                $http.put(updateUrl, $scope.resultPreencheCampo).then(function(response) {
                    msgs.addSuccess('Operação realizada com sucesso!')
                    $scope.resultPreencheCampo = {}
                }).catch(function(resp) {
                    msgs.addError(resp.data)
                })
            }

            $scope.refresh = function() {
                $scope.resultPreencheCampo = {}
            }
            
    }
})()