(function () {
    angular.module('appEasyFit').controller('AuthCtrl', [
        '$location',
        'auth',
        'msgs',
        AuthController
    ])

    function AuthController($location, auth, msgs) {
        const vm = this
        vm.loginMode = true

        vm.changeMode = () => vm.loginMode = !vm.loginMode
        vm.getUser = () => auth.getUser()

        vm.login = () => {
            auth.login(vm.user, err => err ? msgs.addError(err) : $location.path('/'))
        }

        vm.signup = () => {
            console.log(vm.user)
            auth.signup(vm.user, err => err ? msgs.addError(err) : $location.path('/'))
        }

        vm.logout = () => {
            auth.logout(() => $location.path('/'))
        }
    }
})()
