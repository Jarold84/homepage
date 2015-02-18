var app = angular.module('myApp', ['ngRoute', 'ngAnimate']).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
	when("/", {templateUrl: "views/main.html", controller: "MainController"}).
	when("/about", {templateUrl: "views/about.html", controller: "MainController"}).
	when("/contact", {templateUrl: "views/contact.html", controller: "MainController"}).
	when("/portfolio", {templateUrl: "views/portfolio.html", controller: "MainController"}).
	when("/resume", {templateUrl: "views/resume.html", controller: "MainController"}).
	otherwise({
	    redirectTo: '/'});
}]);