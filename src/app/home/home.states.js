'use strict'

angular.module('home')
  .config(function (
    $stateProvider,
    config,
    authProvider
  ) {
    $stateProvider.state('home', {
      parent: 'index',
      url: '/',
      controller: 'HomeCtrl',
      controllerAs: 'homeCtrl',
      templateUrl: 'app/home/home.html',
      resolve: {
        authentication: authProvider.requireAuthenticatedUser,
        roundReport: function (deliveryRoundService, $rootScope, usersService) {
          var key = ''
          var roundInfo = []
          return usersService.getUserStates()
            .then(function (states) {
              var state = angular.isDefined($rootScope.selectedState) ? $rootScope.selectedState.name : states[0].name
              return deliveryRoundService.getLatestBy(state)
            })
            .then(function (ri) {
              roundInfo = ri
              key = roundInfo.latestRoundId
              return deliveryRoundService.getReport(key)
                .then(function (rndReport) {
                  rndReport.deliveryRoundID = key
                  rndReport.roundInfo = roundInfo
                  return rndReport
                })
            })
            .catch(function () {
              var defaultReport = deliveryRoundService.getDefaultReport()
              defaultReport.deliveryRoundID = key
              defaultReport.status = []
              defaultReport.roundInfo = roundInfo
              return defaultReport
            })
        }
      },
      data: {
        label: 'Home',
        roles: config.roles.admin.roles.concat(config.roles.user.roles)
      }
    })
  })
