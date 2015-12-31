/*
-----------------------------------------------------
SERVER
-----------------------------------------------------
*/

if (Meteor.isServer) {

    // not really using server-side

}

/*
-----------------------------------------------------
CLIENT
-----------------------------------------------------
*/

if (Meteor.isClient) {

    // init github API wrapper

    // TODO: use logged-in user info to init

    var github = new Github({}),
        githubUser = github.getUser();

    // ------------
    // formUsername
    // ------------

    Template.formUsername.helpers({

        isLoading: function() {
          return Session.get('isLoading');
        }

    });

    Template.formUsername.events({

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
                username: username,
                repos: null
            });

            githubUser.userRepos(username, function(error, repos) {

                if (error) {

                    // TODO: handle different types of errors

                    Session.set({
                        isLoading: false
                    });

                } else {

                    // calculate a repository score
                    lodash.forEach(repos, function(repo, index) {
                        repo.score = repo.forks_count + (2 * repo.stargazers_count) + repo.watchers_count;
                    });

                    // sort repositories by score (descending)
                    repos = lodash.sortByOrder(repos, 'score', 'desc');

                    Session.set({
                        isLoading: false,
                        repos: repos
                    });

                }

            });

        }

    });

    // -----
    // repos
    // -----

    Template.repos.helpers({

        isLoading: function() {
            return Session.get('isLoading');
        },

        repos: function() {
            return Session.get('repos');
        },

        username: function() {
            return Session.get('username');
        },

        fromNow: function(date) {
            return moment(date).fromNow();
        }

    });

}