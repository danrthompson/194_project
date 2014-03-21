# Frontend

The frontend is built using Angular JS and a hodgepodge of Angular modules peppered in. We use our own modified version of Bootstrap for the base stylesheets. All assets (Angular modules, Angular templates, and Less-based stylesheets) are crunched through the Rails asset pipeline before making it to the user. The interface is broken into three elements: the navbar, the workspace, and the sidebar. Functionality for the app is divided as much as possible into code relevant to those three components.

Here's a breakdown of what's important:

```
.
├── assets
│   ├── fonts
│   │   └── [ionicons]
│   ├── images
│   │   └── [static image -- logo, etc.]
│   ├── javascripts
│   │   ├── app
│   │   │   ├── app.js [main Angular app definitions]
│   │   │   ├── common
│   │   │   │   ├── directives
│   │   │   │   │   └── [Angular directives that show up around the app]
│   │   │   │   └── resources
│   │   │   │       └── [resources that are common throughout the app]
│   │   │   ├── modals
│   │   │   │   └── [specific Angular controllers for modals]
│   │   │   ├── third-party
│   │   │   │   └── [all of the third-party JS libraries we're using]
│   │   │   └── workspace, navbar, sidebar
│   │   │       └── [controllers and directives for each primary component]
│   │   └── templates
│   │       └── workspace, navbar, sidebar
│   │           └── [templates for the primary components]
│   └── stylesheets
│       ├── bootstrap
│       │   └── [base bootstrap stylesheets, minimally modified (unless it has to be)]
│       ├── checkmail.less [responsible for importing all of the styles and defining some variables]
│       ├── email.less     [stylesheet that gets injected in emails]
│       └── workspace, navbar, sidebar.less [stylesheets for each component]
└── views
    └── check_mail
        └── [templates for each page in the app --> the single page app, and then auxiliary static pages]
```
