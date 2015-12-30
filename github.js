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

            var repos = Async.runSync(function(done) {
                github.repos.getFromUser({user: username}, function(error, data) {
                    done(null, data);
                });
            });

            lodash.forEach(repos.result, function(repo, index) {
                repos.result[index].score = repo.forks_count + (2 * repo.stargazers_count) + repo.watchers_count;
            });

            return repos.result;

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

                response = lodash.sortByOrder(response, 'score', 'desc');

                Session.set('isLoading', false);

                Session.set('repos', response);

            });

        }

    });

    // repos

    Template.repos.helpers({

        repos: function() {
            return Session.get('repos');
        },

        moment: function(date) {
            return moment(date).fromNow();
        }

    });

}