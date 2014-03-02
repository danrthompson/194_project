// // $stateProvider.state("items.add", {
// //     url: "/add",
// //     onEnter: function($stateParams, $state, $modal, $resource) {
// //         $modal.open({
// //             templateUrl: "items/add",
// //             resolve: {
// //               item: function() { new Item(123).get(); }
// //             },
// //             controller: ['$scope', 'item', function($scope, item) {
// //               $scope.dismiss = function() {
// //                 $scope.$dismiss();
// //               };

// //               $scope.save = function() {
// //                 item.update().then(function() {
// //                   $scope.$close(true);
// //                 });
// //               };
// //             }]
// //         }).result.then(function(result) {
// //             if (result) {
// //                 return $state.transitionTo("items");
// //             }
// //         });
// //     }
// // });

// checkmail.config(function($stateProvider) {
//     $stateProvider
//       .state('main', {
//         url: '',
//         views: {
//           'workspace': {
//             templateUrl: 'templates/workspace/main.html'
//           },
//           'sidebar': {
//             // pass the view on...
//             template: '<div ui-view="sidebar" />'
//           }
//         }
//       })
//       .state('main.view', {
//         url: '/view',
//         views: {
//           'sidebar': {
//             templateUrl: 'templates/sidebar/view.html'
//           }
//         }
//       })
//       .state('main.action', {})
//       .state('main.action.compose', {
//         url: '/compose',
//         views: {
//           'sidebar': {
//             templateUrl: 'templates/sidebar/compose.html'
//           }
//         }
//       });
//   });
//   // .state('main.modal', {})
//   // .state('main.workspace', {})
//   // .state('main.sidebar', {})
//   // .state('main.sidebar.compose', {})
//   // .state('main.sidebar.conversation', {})