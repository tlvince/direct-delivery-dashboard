angular.module('planning')
		.controller('DeliveryRoundCtrl', function ($modal, deliveryRounds, planningService, log) {

      var vm = this;
			vm.deliveryRounds = deliveryRounds;


			vm.open = function(deliveryRoundId) {
				$modal.open({
					animation: true,
					templateUrl: 'app/planning/delivery-round/dialog/round.html',
					controller: 'RoundDialogCtrl',
					controllerAs: 'nrdCtrl',
					size: 'lg',
					keyboard: false,
					backdrop: 'static',
					resolve: {
						deliveryRound: function(){
							if(!angular.isString(deliveryRoundId)){
								return;
							}
							function handleError(err){
								log.error('deliveryRoundNotFound', err);
							}
							return planningService.getByRoundId(deliveryRoundId)
									.catch(handleError);
						},
						stateAdminLevels: function(locationService, config) {
             return locationService.getLocationsByLevel(config.deliveryRoundAdminLevel)
		             .catch(function() {
			             return [];
		             })
						}
					}
				});
			};

		});