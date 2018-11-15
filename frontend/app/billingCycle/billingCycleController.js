(function() {
    angular.module('appEasyFit').controller('BillingCycleCtrl', [
        '$scope',
        '$http',
        'msgs',
        'tabs',
        '$location',
        BillingCycleController
    ])

    function BillingCycleController($scope,$http, msgs, tabs, $location) {
    
        const vm = this

        const url = 'http://localhost:3003/api/billingCycle'


        

        $scope.refresh = function() {
            const page = parseInt($location.search().page) || 1
            $http.get(`${url}?skip=${(page - 1) * 10}&limit=5`).then(function(response) {
                vm.billingCycle = {credits: [{}], debts: [{}]}
                vm.billingCycles = response.data
                $scope.calculateValues()
                $http.get(`${url}/count`).then(function(response) {
                    $scope.pages = Math.ceil(response.data.value / 10)
                    tabs.show(vm, {tabList: true, tabCreate: true})
                })
            })

        }

        $scope.create = function() {
            $http.post(url, vm.billingCycle).then(function(response) {
                $scope.billingCycle = {}
                $scope.refresh()
                msgs.addSuccess('Operação realizada com sucesso!')
            }).catch(function(resp) {
                msgs.addError(resp.data.errors)
            })
        }


        $scope.showTabUpdate = function(billingCycle) {
            vm.billingCycle  = billingCycle
            $scope.calculateValues()
            tabs.show(vm, {tabUpdate: true})
        }

        $scope.showTabDelete = function(billingCycle) {
            vm.billingCycle  = billingCycle
            $scope.calculateValues()
            tabs.show(vm, {tabDelete: true})
        }

        $scope.delete = function() {
            const deleteUrl = `${url}/${vm.billingCycle._id}`
            $http.delete(deleteUrl, vm.billingCycle).then(function(response) {
                $scope.billingCycle = {}
                $scope.refresh()
                msgs.addSuccess('Operação realizada com sucesso')
            }).catch(function(resp) {
                msgs.addError(resp.data.errors)
            })
        }

        $scope.update = function() {
            const updateUrl = `${url}/${vm.billingCycle._id}`
            $http.put(updateUrl, vm.billingCycle).then(function(response) {

                $scope.refresh()
                msgs.addSuccess('Operações realizada com sucesso!')
            }).catch(function(resp) {
                msgs.addError(resp.data.errors)
            })
        }

        $scope.addCredit = function(index) {
            vm.billingCycle.credits.splice(index + 1, 0, {name: null, value: null})
        }

        $scope.addDebt = function(index) {
            vm.billingCycle.debts.splice(index + 1, 0, {})
        }
        $scope.cloneCredit = function(index, {name, value}) {
            vm.billingCycle.credits.splice(index + 1, 0, {name, value})
            $scope.calculateValues()
        }

        $scope.deleteCredit = function(index) {
            if(vm.billingCycle.credits.length > 1)
            vm.billingCycle.credits.splice(index, 1)
            $scope.calculateValues()
        }

        
        $scope.cloneDebt = function(index, {name, value, status}) {
            vm.billingCycle.debts.splice(index + 1, 0, {name, value, status})
            $scope.calculateValues()
        }

        $scope.deleteDebt = function(index) {
            if(vm.billingCycle.debts.length > 1) vm.billingCycle.debts.splice(index, 1) 
            $scope.calculateValues()
        }

        $scope.calculateValues = function() {
            vm.credit = 0
            vm.debt = 0

            if(vm.billingCycle) {
              vm.billingCycle.credits.forEach(function({value}) {
                vm.credit += !value || isNaN(value) ? 0 : parseFloat(value) 
              })

              vm.billingCycle.debts.forEach(function({value}) {
                vm.debt += !value || isNaN(value) ? 0 : parseFloat(value)
              })

              vm.total = vm.credit - vm.debt
            }
        }

        $scope.refresh()
    }
})()