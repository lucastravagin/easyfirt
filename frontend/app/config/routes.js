angular.module('appEasyFit').config([
  '$stateProvider',
  '$urlRouterProvider',
  '$httpProvider',

  function ($stateProvider,urlRouterProvider, $httpProvider) {
    $stateProvider.state('dashboard', {
      url: "/dashboard",
      templateUrl: "dashboard/dashboard.html"
    }).state('billingCycle', {
      url: "/billingCycle?page",
      templateUrl: "billingCycle/tabs.html"
    }).state('student', {
      url: "/student?page",
      templateUrl: "student/tabs.html"
    }).state('physicalAssessment', {
      url: "/physicalAssessment?page",
      templateUrl: "physicalAssessment/tabs.html"
    }).state('dashboardStudent', {
      url: "/dashboardStudent",
      templateUrl: "student/dashboardStudent.html"
    }).state('training', {
      url: "/training",
      templateUrl: "training/tabs.html"
    })

    $httpProvider.interceptors.push('handleResponseError')
  }])

  .run([
    '$rootScope',
    '$http',
    '$location',
    '$window',
    'auth',
    function ($rootScope, $http, $location, $window, auth) {
      validateUser()
      $rootScope.$on('$locationChangeStart', () => validateUser())

      function validateUser() {

        const user = auth.getUser()
        const authPage = '/auth.html'
        const isAuthPage = $window.location.href.endsWith(authPage)

        if (!user && !isAuthPage) {
          $window.location.href = authPage
        } else if (user && !user.isValid) {
          auth.validateToken(user.token, (err, valid) => {
            if (!valid) {
              $window.location.href = authPage
            } else {
              user.isValid = true
              $http.defaults.headers.common.Authorization = user.token
              isAuthPage ? $window.location.href = '/' : $location.path('/dashboard')
            }
          })
        }
      }
    }
  ])