/*
-----------------------------------------------------
SERVER
-----------------------------------------------------
*/

if (Meteor.isServer) {

    var github = new GitHub({
        version: '3.0.0'
    });

    Meteor.startup(function () {});

    Meteor.methods({

        'getRepos':function(username) {

            var gists = Async.runSync(function(done) {
                github.repos.getFromUser({user: username}, function(error, data) {
                    done(null, data);
                });
            });

            return gists.result;

        }

    });

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

            var username = Session.get('username');

            console.log('[GitHub] fetching repos for username ' + username);

            // TODO: validate username

            // TODO: use meteor template helpers

            Meteor.call('getRepos', username, function(error, response){

                console.log('[GitHub] fetching repos for username ' + username + ' : done');

                console.log(response);

            });

        }

    });

}