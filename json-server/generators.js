// This file provides some utilities for generating fake data.

var Faker = require('Faker'),
    changeCase = require('change-case');

var addresses = [],
    threads = [],
    labels = [],
    label_ideas = [
        "Inbox",
        "Work",
        "Family",
        "School",
        "General",
        "Pets",
        "Movies",
        "Soccer",
        "LOTR Book Club",
        "Stupid People"
    ];

function generateAddress() {
    var first_name = Faker.Name.firstName(),
        last_name = Faker.Name.lastName();

    var dude = {
        uid: Faker.random.number(10000),
        address: Faker.Internet.email(),
        full_name: first_name + " " + last_name,
        first_name: first_name,
        last_name: last_name
    };

    addresses.push(dude);
    return dude;
}

var you = generateAddress();

String.prototype.repeat = function( num ) {
    return new Array( num + 1 ).join( this );
};

for (var i = 0; i < label_ideas.length; i++) {
    generateLabel(i);
};

var everything = {
    "email_addresses": addresses,
    "threads": threads,
    "labels": labels
};

console.log("%j", everything)



function generateLabel(order) {

    var uid = Faker.random.number(10000),
        title = label_ideas[order];

    var threads = [];

    for (var i = 0; i < randomInt(1,10); i++) {
        threads.push(generateThread());
    }

    var label = {
        uid: uid,
        title: title,
        threads: threads,
        order: order
    };

    labels.push(label);

    return label;
}

function generateThread() {
    var subject = changeCase.titleCase(Faker.Lorem.sentence()),
        uid = Faker.random.number(10000);

    var emails = [];

    for (var i = 0; i < randomInt(1,10); i++) {
        emails.push(generateEmail(subject, i));
    }

    var contacts = emails.map(function(d) {
        return d.email_addresses;
    }),
        merged = [];

    merged = merged.concat.apply(merged, contacts);

    var thread = {
        uid: uid,
        subject: subject,
        emails: emails,
        timestamp: emails[emails.length - 1].timestamp,
        email_addresses: merged
    };

    threads.push(thread);

    return thread;
}


function generateEmail(subject, n) {
    var from = generateAddress();
    from.address_type = "from";

    var to = you;
    to.address_type = "to";

    var email = {
        subject: "Re: ".repeat(n) + subject,
        email_addresses: [from,to],
        message: Faker.Lorem.paragraph(),
        timestamp: +(new Date(Faker.Date.between(2013, 2014))),
        is_read: randomInt(0,1) === 0
    };

    return email;
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}