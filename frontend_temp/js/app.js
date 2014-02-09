
var myapp = angular.module('checkmail', ['ui.sortable']);


myapp.controller('AppCtrl', function ($scope) {
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
      title: "Spam",
      emails: []
    },
  ];

  for (var i = 0; i < $scope.boards.length; i++) {
    for (var j = 0; j < randomInt(2,5); j++) {
      $scope.boards[i].emails.push(randomEmail())
    };    
  };

  // var firebase = new angularFire('http://...')
  
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
    $scope.width = boards.length*241;
    // $scope.$apply();
  })

  // scope.sortableOptions = {
  //   placeholder: "app",
  //   connectWith: ".apps-container"
  // };
  
  // $scope.logModels = function () {
  //   $scope.sortingLog = [];
  //   for (var i = 0; i < $scope.rawScreens.length; i++) {
  //     var logEntry = $scope.rawScreens[i].map(function (x) {
  //       return x.title;
  //     }).join(', ');
  //     logEntry = 'container ' + (i+1) + ': ' + logEntry;
  //     $scope.sortingLog.push(logEntry);
  //   }
  // };
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
    timestamp: "3:00pm"
  }
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}