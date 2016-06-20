(function() {
  'use strict';
  angular
    .module('videoLib')
    .controller('MainController', MainController);

    MainController.$inject = ['$scope','moviesApi'];
    /**
     * @ Controller
     */
    function MainController($scope, moviesServices) {
        var vm = this;
        vm.collectionId = 528;
        vm.movieSelected = false;
        vm.movieSelectedId = 0;
        vm.selectedPosterImage = '';

         /**
          * Method called on init on the controller to load the collection data
          */
        vm.getCollection = function(){
          moviesServices.getCollection(vm.collectionId).then(function(response){
            vm.collection = response.data;
          })
        };

        /**
          * Method called when an movie item is selected from the list to fetch movie details
          */
        vm.getMovieDetails = function(id){
          if(id){
            vm.movieSelected = true;
            vm.movieSelectedId = id;
            vm.selectedPosterImage = '';
            moviesServices.getMovieDetails(id).then(function(response){
              vm.movieDetails = response;
            })
          }

        };

        /**
          * updates the poster image of the selected cast
          */
        vm.updatePosterImage = function(cast){
          vm.selectedPosterImage = cast.profile_path;
        }
      }

   // ])


})();
