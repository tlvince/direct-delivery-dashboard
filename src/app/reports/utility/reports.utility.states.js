'use strict'

angular.module('reports')
  .config(function ($stateProvider) {
    $stateProvider.state('reports.layout.utility', {
      url: '/utility',
      templateUrl: 'app/reports/utility/immunised.html',
      controller: 'ReportUtilityCtrl as utilityCtrl',
      resolve: {
        rounds: function (deliveryRoundService, log) {
          return deliveryRoundService.getRoundCodes()
            .catch(function (err) {
              log.info('noRounds', err)
              return []
            })
        }
      }
    })
  })
