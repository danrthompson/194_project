We will be asking each team to include in your repo, a README file that covers your code base. This should be a thorough document covering the repo, detailing what code does what, what packages you used, what you wrote yourself, etc. This document should be sufficient to bring someone who has not seen your code up to speed on your code base without having to read every line of code in your repo. Alex and I will be going through all of the repo's and using the README as our "guide". If we can not understand how your code works, we can evaluate the difficulty of the development of it.

For most items, if you are questioning if you should include it into the README or not, the answer is probably yes.

We will be looking for things in your code base such as, clean formatting, proper commenting, and all other things that would be deemed as solid programming practices.



FRONTEND:

The frontend is built using Angular JS and a hodgepodge of Angular modules peppered in. We use our own modified version of Bootstrap for the base stylesheets. All assets (Angular modules, Angular templates, and Less-based stylesheets) are crunched through the Rails asset pipeline before making it to the user.

Here's a breakdown of what's important:
.
├── assets
│   ├── fonts
│   │   └── [ionicons]
│   ├── images
│   │   └── [static image -- logo, etc.]
│   ├── javascripts
│   │   ├── app
│   │   │   ├── app.js
│   │   │   ├── common
│   │   │   │   ├── directives
│   │   │   │   │   └── [directives that show up around the app]
│   │   │   │   └── resources
│   │   │   │       └── [resources that are common throughout the app]
│   │   │   ├── modals
│   │   │   │   └── [specific Angular controllers for modals]
│   │   │   ├── third-party
│   │   │   │   └── [all of the third-party JS libraries we're using]
│   │   │   └── workspace, navbar, sidebar
│   │   │       └── [controllers and directives for each primary component]
│   │   └── templates
│   │       ├── modals
│   │       │   ├── account.html.erb
│   │       │   ├── add_contributor.html
│   │       │   ├── add_filter.html
│   │       │   ├── add_label.html.erb
│   │       │   ├── edit_board.html
│   │       │   └── help.html.erb
│   │       ├── navbar
│   │       │   └── navbar.html.erb
│   │       ├── ngTagsInput
│   │       │   ├── autocomplete.html
│   │       │   └── tags-input.html
│   │       ├── sidebar
│   │       │   ├── compose.html
│   │       │   ├── sidebar.html.erb
│   │       │   └── view.html
│   │       └── workspace
│   │           ├── label_column.html.erb
│   │           └── workspace.html.erb
│   └── stylesheets
│       ├── bootstrap
│       │   ├── alerts.less
│       │   ├── badges.less
│       │   ├── bootstrap-switch.less
│       │   ├── bootstrap.less
│       │   ├── breadcrumbs.less
│       │   ├── button-groups.less
│       │   ├── buttons.less
│       │   ├── carousel.less
│       │   ├── close.less
│       │   ├── code.less
│       │   ├── component-animations.less
│       │   ├── dropdowns.less
│       │   ├── forms.less
│       │   ├── glyphicons.less
│       │   ├── grid.less
│       │   ├── input-groups.less
│       │   ├── jumbotron.less
│       │   ├── labels.less
│       │   ├── list-group.less
│       │   ├── media.less
│       │   ├── mixins.less
│       │   ├── modals.less
│       │   ├── navbar.less
│       │   ├── navs.less
│       │   ├── normalize.less
│       │   ├── pager.less
│       │   ├── pagination.less
│       │   ├── panels.less
│       │   ├── popovers.less
│       │   ├── print.less
│       │   ├── progress-bars.less
│       │   ├── responsive-utilities.less
│       │   ├── scaffolding.less
│       │   ├── tables.less
│       │   ├── theme.less
│       │   ├── thumbnails.less
│       │   ├── tooltip.less
│       │   ├── type.less
│       │   ├── utilities.less
│       │   ├── variables.less
│       │   └── wells.less
│       ├── checkmail.less
│       ├── email.less
│       ├── extensions.less
│       ├── homepage.less
│       ├── ionicons-customizations.less
│       ├── ionicons.less
│       ├── mixins.less
│       ├── modals.less
│       ├── navbar.less
│       ├── sidebar.less
│       ├── tags-input.less
│       ├── variables.less
│       └── workspace.less
├── controllers
│   ├── api
│   │   ├── emails_controller.rb
│   │   ├── labels_controller.rb
│   │   └── threads_controller.rb
│   ├── application_controller.rb
│   ├── check_mail_controller.rb
│   └── users
│       └── omniauth_callbacks_controller.rb
├── helpers
│   └── application_helper.rb
├── mailers
├── models
│   ├── conversation.rb
│   ├── email.rb
│   ├── email_address.rb
│   ├── emails_label.rb
│   ├── label.rb
│   └── user.rb
└── views
    ├── check_mail
    │   ├── about.html.erb
    │   ├── home.html.erb
    │   ├── index.html.erb
    │   ├── press.html.erb
    │   └── tour.html.erb
    └── layouts
        └── application.html.haml