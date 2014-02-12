
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
      threads: []
    },
    {
      title: "Family",
      threads: []
    },
    {
      title: "CS194",
      threads: []
    },
    {
      title: "Work",
      threads: []
    },
    {
      title: "Tigers",
      threads: []
    },
    {
      title: "Food",
      threads: []
    },
    {
      title: "Spam",
      threads: []
    },
    {
      title: "Lord of the Rings",
      threads: []
    },
    {
      title: "How long can my labels be?",
      threads: []
    },
    {
      title: "Soccer",
      threads: []
    },
    {
      title: "Basketball",
      threads: []
    },
    {
      title: "Football",
      threads: []
    },
    {
      title: "Hockey",
      threads: []
    },
    {
      title: "Cricket",
      threads: []
    },
    {
      title: "Baseball",
      threads: []
    },
    {
      title: "Golf",
      threads: []
    },
    {
      title: "Nascar",
      threads: []
    }
  ];

  for (var i = 0; i < $scope.boards.length; i++) {
    for (var j = 0; j < randomInt(2,4); j++) {
      $scope.boards[i].threads.push(randomThread())
    };    
  };

  $scope.selected_thread = null;
  $scope.qr_state = true;
  $scope.sidebar_active = true;
  $scope.compose_active = true;

  $scope.current_response = "";

  $scope.addReply = function(message) {
    if ($scope.current_response.length >= 0) {
        $scope.selected_thread.emails.push({
        subject: $scope.selected_thread.emails[0].subject,
        sender: "You",
        receiver: $scope.selected_thread.emails[0].sender,
        message: message,
        timestamp: "now",
        is_read: true,
        is_complete: true
      })
    }
  }

  $scope.selectThread = function(thread) {
    $scope.selected_thread = thread;
  }

  $scope.toggleHighlight = function(thread) {
    thread.is_highlighted = !thread.is_highlighted;
  }

  $scope.toggleTodos = function(thread) {
    thread.todos_open = !thread.todos_open;
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
    $scope.workspace_width = (boards.length-1)*241;
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

  var messages = [
    "Makin their way the only way they know how. That's just a little bit more than the law will allow. Come and knock on our door. We've been waiting for you. Where the kisses are hers and hers and his. Three's company too. It's time to put on makeup. It's time to dress up right. It's time to raise the curtain on the Muppet Show tonight. Now were up in the big leagues getting' our turn at bat. Baby if you've ever wondered - wondered whatever became of me. I'm living on the air in Cincinnati. Cincinnati WKRP. Here he comes Here comes Speed Racer. He's a demon on wheels", 
    "Wouldn't you like to get away? Sometimes you want to go where everybody knows your name. And they're always glad you came. Movin' on up to the east side. We finally got a piece of the pie. Believe it or not I'm walking on air. I never thought I could feel so free! Now were up in the big leagues getting' our turn at bat. Sunny Days sweepin' the clouds away. On my way to where the air is sweet. Can you tell me how to get how to get to Sesame Street", 
    "Well we're movin' on up to the east side. To a deluxe apartment in the sky. Sunny Days sweepin' the clouds away. On my way to where the air is sweet. Can you tell me how to get how to get to Sesame Street. The Love Boat soon will be making another run. The Love Boat promises something for everyone. Doin' it our way. There's nothing we wont try. Never heard the word impossible. This time there's no stopping us. The first mate and his Skipper too will do their very best to make the others comfortable in their tropic island nest. And when the odds are against him and their dangers work to do. You bet your life Speed Racer he will see it through", 
    "Today still wanted by the government they survive as soldiers of fortune., Today still wanted by the government they survive as soldiers of fortune. He's gainin' on you so you better look alive. He busy revin' up his Powerful Mach 5. The ship set ground on the shore of this uncharted desert isle with Gilligan the Skipper too the millionaire and his wife. It's time to play the music. It's time to light the lights. It's time to meet the Muppets on the Muppet Show tonight. No phone no lights no motor car not a single luxury. Like Robinson Crusoe it's primitive as can be. Till the one day when the lady met this fellow and they knew it was much more than a hunch.", 
    "Fleeing from the Cylon tyranny the last Battlestar – Galactica - leads a rag-tag fugitive fleet on a lonely quest - a shining planet known as Earth. They're creepy and they're kooky mysterious and spooky. They're all together ooky the Addams Family. The first mate and his Skipper too will do their very best to make the others comfortable in their tropic island nest.", 
  ]

  return {
    subject: subjects[randomInt(0,subjects.length - 1)],
    sender: senders[randomInt(0,senders.length - 1)],
    message: messages[randomInt(0,messages.length - 1)],
    receiver: "You",
    timestamp: randomInt(1,12) + ":" + randomInt(10, 60) + "pm",
    is_read: randomInt(0,1) == 0,
    is_complete: randomInt(0,1) == 0
  }
}

function someTodos() {
    var todos = [
      {
        action: "Work on it",
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
        action: "Ask Lil B about this one.",
        completed: false
      }
    ]

    var response = [];

    for (var i = 0; i < randomInt(0,4); i++) {
      response.push(todos[i]);
    };

    return response;
  }

function randomThread() {
  return {
    todos: someTodos(),
    is_highlighted: false,
    emails: [
      randomEmail()
    ]
  }
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}