/*
-----------------------------------------------------
SERVER
-----------------------------------------------------
*/

if (Meteor.isServer) {

    var github = new GitHub({
        version: '3.0.0'
    });

    Meteor.methods({

        'getRepos':function(username) {

            var response = Async.runSync(function(done) {
                github.repos.getFromUser({user: username}, function(error, data) {
                    done(null, data);
                });
            });

            return response;

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

        //'change input': function (e, template) {
        //    Session.set('username', e.target.value);
        //},

        'click i': function(e, template) {
            template.$('form').submit();
        },

        'submit form': function(e, template) {

            e.preventDefault();

            var username = template.$('input').val();

            if (!username) {
                return;
            }

            Session.set({
                isLoading: true,
                username: username
            });

            Meteor.call('getRepos', username, function(error, response){

                if (lodash.size(response.result)) {

                    // calculate a repository score
                    lodash.forEach(response.result, function(repo, index) {
                        response.result[index].score = repo.forks_count + (2 * repo.stargazers_count) + repo.watchers_count;
                    });

                    // sort repositories by score (descending)
                    response.result = lodash.sortByOrder(response.result, 'score', 'desc');

                }

                Session.set({
                    isLoading: false,
                    repos: response
                });

            });

        }

    });

    // repos

    Template.repos.helpers({

        repos: function() {
            return Session.get('repos');
        },

        username: function() {
            return Session.get('username');
        },

        moment: function(date) {
            return moment(date).fromNow();
        }

    });

}