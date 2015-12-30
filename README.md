README:

A mini web app that allows fetching GitHub repositories for a given username Written by Nir Peled <nir@nirpeled.com>

SETUP:

Run "meteor run"

TODO (WIP):

- Find a better github api wrapper
- Add support for pagination or increase page limit (repos.getFromUser only returns 30 repos)
- Grab the current github user and auto populate the form input with it (Meteor.user().services.github.username)
- Fetch more info that can be shown (parent repo, commiters, open issues, open prs, etc.)
- Add tests
- Allow filtering and/or searching options for repos
- Improve UI/UX