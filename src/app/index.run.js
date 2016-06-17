(function() {
  'use strict';

  angular
    .module('videoLib')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
