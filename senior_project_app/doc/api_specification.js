// This is a very sparse document right now. There are a lot of things our API
// _should_ do eventually, but I'm just outlining the things I need right now.

// ===== THE GIST =====

// GET /api/labels

// ===== LABELS =====

// List all labels
// ---------------
// notes:
// - "latest_date" is in UTC format (ms since epoch)
// request: GET /api/labels
// response (200):

[
    {
        "id": 1,
        "title": "Inbox",
        "order": 1,
        "conversations": [
            {
                "id": 1,
                "subject": "Free pizza at 3:00pm",
                "latest_date": 1333065600000,
                "email_addresses": [
                    {
                        "id": 1,
                        "address": "johnny@google.com",
                        "address_type": "from",
                        "name": "Johnny",
                        "email_count": 3
                    },
                    {
                        "id": 2,
                        "address": "timmy@aol.com",
                        "address_type": "cc",
                        "name": "Johnny",
                        "email_count": 1
                    }
                ]
            },
            {
                "id": 2,
                "subject": "Who took all of my pizza??",
                "latest_date": 1333065600000,
                "email_addresses": [
                    {
                        "id": 1,
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
        "id": 2,
        "title": "Family",
        "order": 2,
        "conversations": [
            {
                "id": 1,
                "subject": "You suck",
                "latest_date": 1333065600000,
                "email_addresses": [
                    {
                        "id": 1,
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
        "id": 1,
        "order": 2
    },
    {
        "id": 2,
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
    "id": 1,
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



// ===== CONVERSATIONS =====

// Get conversation details
// ------------------------
// request: GET /api/conversations/{conversation_id}
// response (200):

{
    "id": 123,
    "label_id": 1,
    "emails": [
        {
            "id": 12345,
            "thread_id": 123,
            "subject": "You suck",
            "date": 1333065600000,
            "html_body": "<strong>stupid</strong>",
            "read": true,
            "email_addresses": [
                {
                    "id": 1,
                    "address": "johnny@google.com",
                    "address_type": "from",
                    "name": "Johnny",
                    "email_count": 3
                },
                {
                    "id": 2,
                    "address": "timmy@aol.com",
                    "address_type": "to",
                    "name": "Johnny",
                    "email_count": 1
                }
            ]
        },
        {
            "id": 12346,
            "thread_id": 123,
            "subject": "Re: You suck",
            "date": 1333065600000,
            "html_body": "<strong>I'm not stupid</strong>",
            "read": true,
            "email_addresses": [
                {
                    "id": 1,
                    "address": "johnny@google.com",
                    "address_type": "to",
                    "name": "Johnny",
                    "email_count": 3
                }
            ]
        }
    ]
}
