// ===== THE GIST =====
// please let me know if you find any technically hard actions that you think
// could be done better. or just let me know how this turns out in general.
// also let me know if you'd like me to step in and help implement any of
// this.

// GET    /api/labels     => List of all labels sorted by label.order.
// POST   /api/labels     => Create a new label
// PATCH  /api/labels     => Patch all labels in request. If order is changed on any label, reject the patch unless all labels have a valid (unique) order

// GET    /api/labels/:id => Get details for label. (I'm not sure if this will be used yet, but it's good to have.)
// PATCH  /api/labels/:id => Update any properties on label except order and uid. Threads can only be sorted with this call. If a thread shows up in the list that wasn't originally in that label, assume it was moved from some other label. So we can remove the thread from that label.
// DELETE /api/labels/:id => Delete specified label.

// POST /api/threads => Compose a new email (semantically we're creating a new thread, technically we're composing an email and we should expect the email to show up again coming back from gmail.)

// GET    /api/threads/:id => Get details of thread
// POST   /api/threads/:id => Reply to the thread. (I'm thinking we avoid all the weird cases where the user replies to a specific email in the thread [as opposed to the whole thread], but let me know if you think we should keep it.)
// PATCH  /api/threads/:id => Update properties of specific thread. Don't accept order or uid or updates to emails
// DELETE /api/threads/:id => Archive the thread

// GET   /api/emails/:id => Get email and all of its details
// PATCH /api/emails/:id => Update properties on email. Specifically whether the email is read or not.


// ASSUME ALL OF THE THINGS BELOW HERE ARE OUTDATED BUT SHOULD BE USED TO
// INSPIRE HOW THE RESPONSES ARE STRUCTURED.

// This is a very sparse document right now. There are a lot of things our API
// _should_ do eventually, but I'm just outlining the things I need right now.


// ===== LABELS =====

// List all labels
// ---------------
// notes:
// - "latest_date" is in UTC format (ms since epoch)
// request: GET /api/labels
// response (200):

[
    {
        "uid": 1,
        "title": "Inbox",
        "order": 1,
        "threads": [
            {
                "uid": 1,
                "subject": "Free pizza at 3:00pm",
                "latest_date": 1333065600000,
                "email_addresses": [
                    {
                        "uid": 1,
                        "address": "johnny@google.com",
                        "address_type": "from",
                        "name": "Johnny",
                        "email_count": 3
                    },
                    {
                        "uid": 2,
                        "address": "timmy@aol.com",
                        "address_type": "cc",
                        "name": "Johnny",
                        "email_count": 1
                    }
                ]
            },
            {
                "uid": 2,
                "subject": "Who took all of my pizza??",
                "latest_date": 1333065600000,
                "email_addresses": [
                    {
                        "uid": 1,
                        "address": "jake@google.com",
                        "address_type": "from",
                        "name": "Johnny",
                        "email_count": 4
                    }
                ]
            }
        ]
    },
    {
        "uid": 2,
        "title": "Family",
        "order": 2,
        "threads": [
            {
                "uid": 1,
                "subject": "You suck",
                "latest_date": 1333065600000,
                "email_addresses": [
                    {
                        "uid": 1,
                        "address": "johnny@google.com",
                        "address_type": "from",
                        "name": "Johnny",
                        "email_count": 5
                    }
                ]
            }
        ]
    }
]

// Reorder all labels
// ------------------
// notes:
// - this should only accept requests that specify the ordering for every
//   label or we need to figure out how to reorder just one label efficiently
// request: PATCH /api/labels/order
// data:

[
    {
        "uid": 1,
        "order": 2
    },
    {
        "uid": 2,
        "order": 1
    }
]

// response (200 - ok) [blank]
// [optional] response (400 - bad request)

// Rename (or update) a label
// --------------------------
// notes:
// - should not allow Inbox (or any other "reserved" labels) to be updated
// request: PATCH /api/labels/{label_id}
// data:

{
    "uid": 1,
    "name": "Stupid Family"
}

// response (200 - ok) [blank]

// Remove a label
// --------------
// notes:
// - should not allow Inbox (or any other "reserved" labels) to be removed
// - where do the emails go??
// request: DELETE /api/labels/{label_id}
// response (200) [blank]



// ===== THREADS =====

// Get thread details
// ------------------
// request: GET /api/threads/{thread_id}
// response (200):

{
    "uid": 123,
    "label_id": 1,
    "emails": [
        {
            "uid": 12345,
            "thread_id": 123,
            "subject": "You suck",
            "date": 1333065600000,
            "html_body": "<strong>stupid</strong>",
            "read": true,
            "email_addresses": [
                {
                    "uid": 1,
                    "address": "johnny@google.com",
                    "address_type": "from",
                    "name": "Johnny",
                    "email_count": 3
                },
                {
                    "uid": 2,
                    "address": "timmy@aol.com",
                    "address_type": "to",
                    "name": "Johnny",
                    "email_count": 1
                }
            ]
        },
        {
            "uid": 12346,
            "thread_id": 123,
            "subject": "Re: You suck",
            "date": 1333065600000,
            "html_body": "<strong>I'm not stupid</strong>",
            "read": true,
            "email_addresses": [
                {
                    "uid": 1,
                    "address": "johnny@google.com",
                    "address_type": "to",
                    "name": "Johnny",
                    "email_count": 3
                }
            ]
        }
    ]
}
