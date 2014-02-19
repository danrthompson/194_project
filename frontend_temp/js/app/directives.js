// From: http://stackoverflow.com/questions/14925728/how-to-observe-custom-events-in-angularjs
checkmail.directive('enterSubmit', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var submit;

      $(element).on({
        keydown: function (e) {
          submit = false;

          if (e.which === 13 && !e.shiftKey) {
            submit = true;
            e.preventDefault();
          }
        },

        keyup: function () {
          if (submit) {
            scope.$eval( attrs.enterSubmit );

            // flush model changes manually
            scope.$digest();
          }
        }
      });
    }
  };
});

// TODO: it would be good to decompose this directive into a more flexible system
checkmail.directive('shiftClick', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var shift;

      $(document).on({
        keydown: function (e) {
          shift = false;

          if (e.shiftKey) {
            shift = true;
          }
        },

        keyup: function () {
          if (shift) {
            shift = false;
          }
        },
      })

      $(element).on({
        click: function(e) {
          if (shift) {
            e.preventDefault();
            scope.$eval( attrs.shiftClick );
            scope.$digest();
          };
        }
      });
    }
  };
});

checkmail.directive('scrollOnClick', function() {
  return {
    restrict: 'A',
    link: function(scope, $elm, attrs) {
      var idToScroll = attrs.href;
      $elm.on('click', function(e) {
        e.preventDefault();

        var $target;
        if (idToScroll) {
          $target = $(idToScroll);
        } else {
          $target = $elm;
        }

        // TODO: Abstract this out a bit
        $(".workspace").animate({scrollLeft: $target.offset().left - $('.scroll-wrapper').offset().left}, "fast");
      });
    }
  }
});