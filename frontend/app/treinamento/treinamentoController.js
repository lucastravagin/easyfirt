(function () {
    angular.module('appEasyFit').controller('treinamentoCtrl', [
        '$scope',
        '$http',
        'msgs',
        'tabs',
        'consts',
        TreinamentoController
    ])

    function TreinamentoController($scope, $http,msgs, tabs, consts) {

         const url = `${consts.apiUrl}/training`
        $scope.getTreinamento = function() {
            $http.get(url).then(resp => {
                $scope.treinamentos = resp.data
                $scope.treinamento =  {}
                tabs.show($scope, {tabList: true, tabCreate: true})
            }).catch(resp => {
                msgs.addError('Não foi possível carregar os dados')
            })
        }
        
        $scope.getTreinamento()
        $scope.createTreinamento = function() {
            $http.post(url, $scope.treinamento).then(resp => {
                msgs.addSuccess('Operação realizada com sucesso')
                $scope.getTreinamento()
                $scope.treinamento = {}
            }).catch(resp => {
                msgs.addError(resp.data.errors)
            })
        }

        $scope.showTabUpdate = function(treinamento) {
            $scope.treinamento = treinamento
            tabs.show($scope, {tabUpdate: true})
        }

        $scope.updateTreinamento = function() {
            const urlUpdate = `${url}/${$scope.treinamento._id}`
            $http.put(urlUpdate, $scope.treinamento).then(resp => {
                $scope.getTreinamento()
                tabs.show($scope, {tabList: true, tabCreate: true})
                msgs.addSuccess('Operação realizada com sucesso')
                $scope.treinamento = {}
            }).catch(resp => {
                msgs.addError(resp.data.errors)
            })
        }

        $scope.showTabDelete = function(treinamento) {
            $scope.treinamento = treinamento
            tabs.show($scope, {tabDelete: true})
        }

        $scope.deleteTreinamento = function() {
            const urlDelete = `${url}/${$scope.treinamento._id}`
            $http.delete(urlDelete, $scope.treinamento).then(resp => {
                $scope.treinamento = {}
                $scope.getTreinamento()
                msgs.addSuccess('Operação realizada com sucesso')
            }).catch(resp => {
                msgs.addError(resp.data.errors)
            })
        }
    }
})()