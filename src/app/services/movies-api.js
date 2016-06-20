(function () {
    'use strict';

    angular.module('videoLib')
    .factory('moviesApi',function ($http, $q) {
      var  model= {};

      /**
       * make GET request to movie Collections
       */
      model.getCollection = function(id) {
          return $http.get('https://api.themoviedb.org/3/collection/'+id, { params:{'api_key':'72c4fe46616c03b5e6f19b61812937e4'}});
      };

      /**
       * make GET request to movie details
       */
      model.getMovies = function(id) {
          return $http.get('https://api.themoviedb.org/3/movie/'+id, { params:{'api_key':'72c4fe46616c03b5e6f19b61812937e4'}});
      };

      /**
       * make GET request to movie cast and crew details
       */
      model.getCredits = function(id) {
          return $http.get('https://api.themoviedb.org/3/movie/'+id+'/credits', { params:{'api_key':'72c4fe46616c03b5e6f19b61812937e4'}});
      };

       /**
       * method which return the object which combines complete movie details
       */
      model.getMovieDetails =  function(id){
        var deferred = $q.defer();
        var promises = {
            movieData: model.getMovies(id),
            castData: model.getCredits(id)
        };

        $q.all(promises).then(function(results){
          var castData = results.castData.data;

          var directors = castData.crew.filter(function(item){
            return item.department === "Directing";
          });

          var writers = castData.crew.filter(function(item){
            return item.department === "Writing";
          });

          var res = {
            directors: directors || [],
            stars: angular.copy(castData.cast) || [],
            writers: writers || [],
            credits: angular.copy(castData.cast) || [],
            details: results.movieData.data
          };
          deferred.resolve(res);
         });

        return deferred.promise;

      };

      return model;
    });
})();
