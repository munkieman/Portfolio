(function () {
    'use strict';

    angular.module('portfolioApp', ['ngRoute'])

        .config(function ($routeProvider, $locationProvider, $httpProvider) {

            $routeProvider
                .when('/home', {
                    templateUrl: 'views/home.html',
                    controller: 'HomeCtrl'
                })

                .when('/about', {
                    templateUrl: 'views/about.html',
                    controller: 'AboutCtrl'
                })

                .when('/portfolio', {
                    templateUrl: 'views/portfolio.html',
                    controller: 'PortfolioCtrl'
                })

                .when('/programming', {
                    templateUrl: 'views/programming.html',
                    controller: 'ProgrammingCtrl'
                })

                .when('/programming/web', {
                    templateUrl: 'views/web.html',
                    controller: 'WebCtrl'
                })

                .when('/programming/desktop', {
                    templateUrl: 'views/desktop.html',
                    controller: 'DesktopCtrl'
                })

                .when('/programming/sharepoint', {
                    templateUrl: 'views/sharepoint.html',
                    controller: 'SharepointCtrl'
                })

                .when('/code', {
                    templateUrl: 'views/code.html',
                    controller: 'CodeCtrl'
                })

                .when('/contact', {
                    templateUrl: 'views/contact.html',
                    controller: 'ContactCtrl'
                })

                .otherwise({
                    redirectTo: '/home',
                    controller: 'HomeCtrl',
                });

            $locationProvider.html5Mode(true);

        })

        .controller('mainCtrl', ['$scope', '$location', function ($scope, $location) {
            //.main ($scope, $location);

            $scope.navClass = function (page) {
                var currentRoute = $location.path().substring(1) || 'home';
                return page === currentRoute ? 'active' : '';
            };

            $scope.loadHome = function () {
                $location.url('/home');
            };

            $scope.loadAbout = function () {
                $location.url('/about');
            };

            $scope.loadPortfolio = function () {
                $location.url('/portfolio');
            };

            $scope.loadProgramming = function () {
                $location.url('/programming');
            };

            $scope.loadWeb = function () {
                $location.url('/programming/web');
            };

            $scope.loadSharePoint = function () {
                $location.url('/programming/sharepoint');
            };

            $scope.loadDesk = function () {
                $location.url('/programming/desktop');
            };

            $scope.loadCode = function () {
                $location.url('/code');
            };

            $scope.loadContact = function () {
                $location.url('/contact');
            };

        }])

        .controller('HomeCtrl', function ($scope, $compile) {
            $scope.mainImage = 'images/web_design.jpg';
        })

        .controller('AboutCtrl', function ($scope, $compile) {
            $scope.aboutImage = 'images/jason_clark.jpg'
            $scope.iqImage = "http://www.free-iqtest.net/images/badges2/l144.gif"
            $scope.skillsCollapsed = true;
            $scope.educationCollapsed = true;
            $scope.experienceCollapsed = true;
            $scope.achieveCollapsed = true;
        })

        .controller('PortfolioCtrl', function ($scope, $compile, $http) {
            $scope.projects = [
                {
                    title: "Unified Query Log",
                    type: "SharePoint",
                    image: "images/banner01.png",
                    yearCreated: "2014",
                    description: "Created using ASP.Net using VB, hosted on SharePoint 2010 with a data connection to SQL Server 2008\n"
                },
                {
                    title: "GSR",
                    type: "SharePoint",
                    image: "images/banner02.png",
                    yearCreated: "2014",
                    description: "The SharePoint web part application version of the Global Service Register, created for the 2010 platform using C#.Net"
                },
                {
                    title: "GSR",
                    type: "Desktop",
                    image: "images/banner03.png",
                    yearCreated: "2013",
                    description: "Created with Visual Basic using MS Access as the front end connected to SQL server database and SharePoint."
                },
                {
                    title: "Sunshine Music",
                    type: "Web",
                    image: "images/banner04.png",
                    yearCreated: "2003",
                    description: "Website created for small record label Sunshine Music using Flash and ActionScript."
                },
                {
                    title: "GSR Help Site",
                    type: "SharePoint",
                    image: "images/banner05.png",
                    yearCreated: "2014",
                    description: "Help site created to provide basic help for using the GSR SharePoint application.  Created using HTML, CSS and JavaScript."
                },
                {
                    title: "CDSS IMAGE",
                    type: "SharePoint",
                    image: "images/banner06.png",
                    yearCreated: "2014",
                    description: "Front end landing page for the CDSS IMAGE (Information Management Applications for the Global Environment) SharePoint application farm."
                },
                {
                    title: "RFT",
                    type: "SharePoint",
                    image: "images/banner07.png",
                    yearCreated: "2014",
                    description: ""
                },
                {
                    title: "Satisfaction Survey",
                    type: "SharePoint",
                    image: "images/banner08.png",
                    yearCreated: "2015",
                    description: ""
                },
                {
                    title: "Jeopardy Tracker",
                    type: "SharePoint",
                    image: "images/banner09.png",
                    yearCreated: "2015",
                    description: ""
                },
                {
                    title: "Skills For Care",
                    type: "Web",
                    image: "images/banner10.png",
                    yearCreated: "2015",
                    description: ""
                },
                {
                    title: "CHDA Intranet",
                    type: "SharePoint",
                    image: "images/banner01.png",
                    yearCreated: "2016",
                    description: "Front end landing page for the CDSS IMAGE (Information Management Applications for the Global Environment) SharePoint application farm."
                }
            ];
        })

        .controller('WebCtrl', function ($scope, $compile) {

        })

        .controller('SharepointCtrl', function ($scope, $compile) {

        })

        .controller('DeskCtrl', function ($scope, $compile) {

        })

        .controller('CodeCtrl', function ($scope, $compile, $http) {
            this.tab = 1;

            $http.get('code.json')
                .then(function (res) {
                    $scope.languages = res.data;
                });           

            this.setTab = function (tabId) {
                this.tab = tabId;
            };

            this.isSet = function (tabId) {
                return this.tab === tabId;
            };
        })

        .controller('ContactCtrl', function ($scope, $compile) {
            $scope.message = 'inside contact controller';
        })

    .directive("masonry", function () {
        var NGREPEAT_SOURCE_RE = '<!-- ngRepeat: ((.*) in ((.*?)( track by (.*))?)) -->';
        return {
            compile: function (element, attrs) {
                // auto add animation to brick element
                var animation = attrs.ngAnimate || "'masonry'";
                var $brick = element.children();
                $brick.attr("ng-animate", animation);

                // generate item selector (exclude leaving items)
                var type = $brick.prop('tagName');
                var itemSelector = type + ":not([class$='-leave-active'])";

                return function (scope, element, attrs) {
                    var options = angular.extend({
                        itemSelector: itemSelector
                    }, scope.$eval(attrs.masonry));

                    // try to infer model from ngRepeat
                    if (!options.model) {
                        var ngRepeatMatch = element.html().match(NGREPEAT_SOURCE_RE);
                        if (ngRepeatMatch) {
                            options.model = ngRepeatMatch[4];
                        }
                    }

                    // initial animation
                    element.addClass('masonry');

                    // Wait inside directives to render
                    setTimeout(function () {
                        element.masonry(options);

                        element.on("$destroy", function () {
                            element.masonry('destroy')
                        });

                        if (options.model) {
                            scope.$apply(function () {
                                scope.$watchCollection(options.model, function (_new, _old) {
                                    if (_new == _old) return;

                                    // Wait inside directives to render
                                    setTimeout(function () {
                                        element.masonry("reload");
                                    });
                                });
                            });
                        }
                    });
                };
            }
        };
    })


})();