'use strict';

angular.module('planning')
		.config(function($stateProvider) {
			$stateProvider.state('planning.returnRoute', {
				url: '/return-route/:roundId',
				templateUrl: 'app/planning/return-route/index.html',
				controller: 'ReturnRouteCtrl',
				controllerAs: 'rrCtrl',
				resolve: {
					deliveryRound: function(planningService, $stateParams){
						function handleError(err){
							log.error('deliveryRoundNotFound', err);
							throw err;//block $state transition
						}
						return planningService.getByRoundId($stateParams.roundId)
								.catch(handleError);
					}
				}
			});
		});
