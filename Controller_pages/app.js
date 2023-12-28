var app = angular.module("myApp", ["ngRoute"]);

app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "signup.html",
      controller: "SignupController",
    })
    .when("/login", {
      templateUrl: "login.html",
      controller: "LoginController",
    })
    .when("/dashboard", {
      templateUrl: "dashboard.html",
      controller: "dashboardCtrl",
    })
    .otherwise({
      templateUrl: "signup.html",
      controller: "SignupController",
    });
});
