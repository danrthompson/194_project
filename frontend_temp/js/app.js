
var checkmail = angular.module('checkmail', ['ui.sortable']);

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


checkmail.controller('AppCtrl', function ($scope) {
  $scope.boards = [
    {
      title: "Inbox",
      emails: []
    },
    {
      title: "Family",
      emails: []
    },
    {
      title: "CS194",
      emails: []
    },
    {
      title: "Work",
      emails: []
    },
    {
      title: "Tigers",
      emails: []
    },
    {
      title: "Food",
      emails: []
    },
    {
      title: "Spam",
      emails: []
    },
    {
      title: "Lord of the Rings",
      emails: []
    },
    {
      title: "How long can my labels be?",
      emails: []
    },
    {
      title: "Soccer",
      emails: []
    },
    {
      title: "Basketball",
      emails: []
    },
    {
      title: "Football",
      emails: []
    },
    {
      title: "Hockey",
      emails: []
    },
    {
      title: "Cricket",
      emails: []
    },
    {
      title: "Baseball",
      emails: []
    },
    {
      title: "Golf",
      emails: []
    },
    {
      title: "Nascar",
      emails: []
    }
  ];

  for (var i = 0; i < $scope.boards.length; i++) {
    for (var j = 0; j < randomInt(2,4); j++) {
      $scope.boards[i].emails.push(randomEmail())
    };    
  };

  $scope.selected_email = null;
  $scope.qr_state = true;
  $scope.sidebar_active = true;


  $scope.selectEmail = function(email) {
    $scope.selected_email = email;
  }

  $scope.toggleHighlight = function(email) {
    email.is_highlighted = !email.is_highlighted;
  }

  $scope.toggleTodos = function(email) {
    email.todos_open = !email.todos_open;
  }

  $scope.addTodo = function(email) {
    if (email.todo_temp) { 
      email.todos.push({
        action: email.todo_temp,
        completed: false
      });
      email.todo_temp = "";
    }
  }
  
  $scope.boardSortOptions = {
    placeholder: "board_placeholder",
    forcePlaceholderSize: true,
  };

  $scope.emailGroupSortableOptions = {
    placeholder: "email-placeholder",
    connectWith: ".email-group",
    forcePlaceholderSize: true,
  };

  $scope.$watch('boards', function(boards) {
    $scope.workspace_width = boards.length*241;
  })
});

// This function will generate a random email.
function randomEmail() {
  var subjects = [
    "Preliminary Floor Plans for Southern Village Neighborhood Circle Members",
    "Your April Website Stats",
    "Idlewild Camp - Important Travel Information",
    "Invitation for Murdoch, Brown, Rove & Johnson's Snow Ball",
    "MotorCycling Magazine Reader Survey",
    "Announcing Paige Elizabeth Sullivan",
    "Ship's Log #5: Parus Arrives in Phuket",
    "Nautica in Rutland Opens Soon!",
    "Updated Time Zones & Log On Information",
    "MICHAEL DRUCKMAN 1949-2007",
    "Inside Football: Summer Training Camp Preview Issue",
    "Final reminder for complimentary entry to attend the West Freelands BCI Cluster Conference 2006",
    "Tempting August NUSA Specials!",
    "SALE ends soon - up to 50% off all bras at Kara!",
    "Printers World Offers 100% Commission Up Front",
    "3% Commission For You, $10,000 in Upgrades For Your Client",
    "Help Baylor create the ideal college experience",
    "Help Spread The News!",
    "Don't Let 2006 Slip Away Without a Tax Deductible Donation To the Children & Families of Omire"
  ];

  var senders = [
    "Katie Ann Wang",
    "Meetup",
    "Clint Todd",
    "CS142 on Piazza",
    "Lizzy Scott Carmichael",
    "zholland@angelenoartistry.com",
    "Yaron Engelstein",
    "Ralph",
    "Burns",
    "Smithers",
    "Barney",
    "Grampa",
    "Flanders",
    "Wiggum",
    "Lovejoy",
    "Willie",
    "Apu",
    "Bob",
    "Skinner",
    "Edna",
    "Krusty",
    "Nelson",
    "Quimby",
    "Brockman",
    "Apu",
    "Riviera",
    "Otto",
    "Patty",
    "Selma",
    "Frink"
  ]

  function someTodos() {
    var todos = [
      {
        action: "Print this out and pee on it",
        completed: false,
      },
      {
        action: "Do something about this",
        completed: false
      },
      {
        action: "Get crunk",
        completed: false
      },
      {
        action: "Turn up",
        completed: false
      },
      {
        action: "Ask Lil Jon about this one.",
        completed: false
      }
    ]

    var response = [];

    for (var i = 0; i < randomInt(0,4); i++) {
      response.push(todos[i]);
    };

    return response;
  }

  return {
    sender: senders[randomInt(0,senders.length - 1)],
    subject: subjects[randomInt(0,subjects.length - 1)],
    todos: someTodos(),
    timestamp: randomInt(1,12) + ":" + randomInt(10, 60) + "pm",
    is_read: randomInt(0,1) == 0,
    is_complete: randomInt(0,1) == 0,
    is_highlighted: false
  }
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}