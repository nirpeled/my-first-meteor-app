README:

A mini web app that allows fetching GitHub repositories for a given username Written by Nir Peled <nir@nirpeled.com>

SETUP:

Run "meteor run"

LIVE DEMO:

Available at http://nirpeled-github.meteor.com (GitHub API calls seems to be failing on this env)

TODO (WIP):

- Find a better GitHub API wrapper (preferably one that runs on the client) 
- Add support for pagination or increase page limit (repos.getFromUser only returns 30 repos with no pagination support)
- Grab the current GitHub user and auto populate the form input with it (using Meteor.user().services.github.username)
- Fetch more info that can be shown (parent repo, commiters, open issues, open prs, etc.)
- Add filtering options for repos (free text, public, private, sources, forks, mirrors, etc.)
- Add unit-tests
- Improve UI/UX