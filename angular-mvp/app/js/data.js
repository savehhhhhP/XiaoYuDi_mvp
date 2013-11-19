/**
 * Created by Administrator on 13-10-29.
 */

angular.module("myApp.data", ['ngResource'])
    .factory("user",
        ['$resource', function ($resource) {
            return $resource('user.json', {}, {
                query: {method: 'GET', isArray: true}
            });
        }])
    .factory("resources",
        ['$resource', function ($resource) {
            return $resource('resources.json', {}, {
                query: {method: 'GET', isArray: true}
            });
        }])
    .factory("card",
        ['$resource', function ($resource) {
            return $resource('card.json', {}, {
                query: {method: 'GET', isArray: true}
            });
        }])
    .factory("card_tree",
        ['$resource', function ($resource) {
            return $resource('card_tree.json', {}, {
                query: {method: 'GET', isArray: true}
            });
        }]);