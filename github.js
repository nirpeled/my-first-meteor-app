/*
-----------------------------------------------------
SERVER
-----------------------------------------------------
*/

if (Meteor.isServer) {

    Meteor.startup(function () {});

}

/*
-----------------------------------------------------
CLIENT
-----------------------------------------------------
*/

if (Meteor.isClient) {

    console.log('[GitHub] init');

    Template.formUsername.events({

        // handle username input
        'change input': function (e, template) {
            Session.set('username', e.target.value);
            console.log('[GitHub] username has changed to ' + Session.get('username'));
        },

        // handle fetch button
        'click button': function(e, template) {
            console.log('[GitHub] fetching repos for username ' + Session.get('username'));
        }

    });

}