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

    // formUsername

    Template.formUsername.helpers({

        isLoading: function() {
          return Session.get('isLoading');
        }

    });

    Template.formUsername.events({

        'change input': function (e, template) {
            Session.set('username', e.target.value);
        },

        'click i': function(e, template) {
            template.$('form').submit();
        },

        'submit form': function(e, template) {

            e.preventDefault();

            var username = Session.get('username');

            if (!username) {
                return;
            }

            console.log('[formUsername] fetching repos for username ' + username);

            Session.set('isLoading', true);

            Meteor.call('getRepos', username, function(error, response){

                console.log('[formUsername] fetching repos for username ' + username + ' : done');

                console.log(response);

                Session.set('isLoading', false);

                Session.set('repos', response);

            });

        }

    });

    // repos

    Template.repos.helpers({

        repos: function() {
            return Session.get('repos');
        }

    });

}