(function () {
    angular.module('appEasyFit').controller('TrainingCtrl', [
        '$scope',
        '$http',
        'msgs',
        'consts',
        TrainingController
    ])

    function TrainingController($scope, $http, msgs, consts) {
        $scope.resultPreencheCampo = {}
        const url = `${consts.apiUrl}/students`

        $scope.refresh = function () {
            initCreditsAndDebts()
        }




        $scope.getStudent = function (filter) {
            $http.get(`${url}?nome__regex=/^${filter}/i`).then(function (resp) {
                $scope.students = resp.data
                $scope.student = {}
            })
        }

        $scope.preencheCampo = function (student) {
            $scope.resultPreencheCampo = student
            initCreditsAndDebts()
        }

        $scope.addSegunda = function (index) {
            $scope.resultPreencheCampo.segunda.splice(index + 1, 0, {})
        }

        $scope.cloneSegunda = function (index, { exercicio, value, status }) {
            $scope.resultPreencheCampo.segunda.splice(index + 1, 0, { exercicio, serie, exercicio })
            initCreditsAndDebts()
        }

        $scope.deleteSegunda = function (index) {
            $scope.resultPreencheCampo.segunda.splice(index, 1)
            initCreditsAndDebts()
        }

        //Terça
        $scope.addTerca = function (index) {
            $scope.resultPreencheCampo.terca.splice(index + 1, 0, {})
        }

        $scope.cloneTerca = function (index, { exercicio, value, status }) {
            $scope.resultPreencheCampo.terca.splice(index + 1, 0, { exercicio, serie, exercicio })
            initCreditsAndDebts()
        }

        $scope.deleteTerca = function (index) {
            $scope.resultPreencheCampo.terca.splice(index, 1)
            initCreditsAndDebts()
        }

        //Quarta
        $scope.addQuarta = function (index) {
            $scope.resultPreencheCampo.quarta.splice(index + 1, 0, {})
        }

        $scope.cloneQuarta = function (index, { exercicio, value, status }) {
            $scope.resultPreencheCampo.quarta.splice(index + 1, 0, { exercicio, serie, exercicio })
            initCreditsAndDebts()
        }

        $scope.deleteQuarta = function (index) {
            $scope.resultPreencheCampo.quarta.splice(index, 1)
            initCreditsAndDebts()
        }

        //Quinta

        $scope.addQuinta = function (index) {
            $scope.resultPreencheCampo.quinta.splice(index + 1, 0, {})
        }

        $scope.cloneQuinta = function (index, { exercicio, value, status }) {
            $scope.resultPreencheCampo.quinta.splice(index + 1, 0, { exercicio, serie, exercicio })
            initCreditsAndDebts()
        }

        $scope.deleteQuinta = function (index) {
            $scope.resultPreencheCampo.quinta.splice(index, 1)
            initCreditsAndDebts()
        }

        //Sexta

        $scope.addSexta = function (index) {
            $scope.resultPreencheCampo.sexta.splice(index + 1, 0, {})
        }

        $scope.cloneSexta = function (index, { exercicio, value, status }) {
            $scope.resultPreencheCampo.sexta.splice(index + 1, 0, { exercicio, serie, exercicio })
            initCreditsAndDebts()
        }

        $scope.deleteSexta = function (index) {
            $scope.resultPreencheCampo.sexta.splice(index, 1)
            initCreditsAndDebts()
        }

        //Sabado
        $scope.addSabado = function (index) {
            $scope.resultPreencheCampo.sabado.splice(index + 1, 0, {})
        }

        $scope.cloneSabado = function (index, { exercicio, value, status }) {
            $scope.resultPreencheCampo.sabado.splice(index + 1, 0, { exercicio, serie, exercicio })
            initCreditsAndDebts()
        }

        $scope.deleteSabado = function (index) {
            $scope.resultPreencheCampo.sabado.splice(index, 1)
            initCreditsAndDebts()
        }

        $scope.createTrainee = function () {
            var updateUrl = `${url}/${$scope.resultPreencheCampo._id}`
            $http.put(updateUrl, $scope.resultPreencheCampo)
                .then(resp => {
                    msgs.addSuccess('Operação realizada com sucesso!')
                    $scope.resultPreencheCampo = {}
                }).catch(resp => {
                    msgs.addError(resp.data.errors)
                })
            
        }

        $scope.cancel = function () {
            $scope.resultPreencheCampo = {}
            $scope.resultPreencheCampo = {}
        }


        var initCreditsAndDebts = function () {
            if (!$scope.resultPreencheCampo.segunda || !$scope.resultPreencheCampo.segunda.length) {
                $scope.resultPreencheCampo.segunda = []
                $scope.resultPreencheCampo.segunda.push({})
            }
            if (!$scope.resultPreencheCampo.terca || !$scope.resultPreencheCampo.terca.length) {
                $scope.resultPreencheCampo.terca = []
                $scope.resultPreencheCampo.terca.push({})
            }
            if (!$scope.resultPreencheCampo.quarta || !$scope.resultPreencheCampo.quarta.length) {
                $scope.resultPreencheCampo.quarta = []
                $scope.resultPreencheCampo.quarta.push({})
            }
            if (!$scope.resultPreencheCampo.quinta || !$scope.resultPreencheCampo.quinta.length) {
                $scope.resultPreencheCampo.quinta = []
                $scope.resultPreencheCampo.quinta.push({})
            }
            if (!$scope.resultPreencheCampo.sexta || !$scope.resultPreencheCampo.sexta.length) {
                $scope.resultPreencheCampo.sexta = []
                $scope.resultPreencheCampo.sexta.push({})
            }

            if (!$scope.resultPreencheCampo.sabado || !$scope.resultPreencheCampo.sabado.length) {
                $scope.resultPreencheCampo.sabado = []
                $scope.resultPreencheCampo.sabado.push({})
            }

        }
        const urlTraining = `${consts.apiUrl}/training`
        $scope.getTreinamento = function() {
            $http.get(urlTraining).then(resp => {
                $scope.selectTreino = resp.data
            }).catch(resp => {
                msgs.addError('Não foi possível carregar os dados')
            })
        }
        $scope.refresh()
        $scope.getTreinamento()
    }

})()