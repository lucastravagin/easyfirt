
(function() {
angular.module('appEasyFit').component('contentHeader', {
    bindings: {
       name: '@', //uma String não vai mudar
       small: '@',
    },
    template: `
       <section class="content-header">
         <h1>{{ $ctrl.name }} <small>{{ $ctrl.small }}</small></h1>
       </section>
    `
 });

})()