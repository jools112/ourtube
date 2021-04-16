# Ourtube

Ourtube allows for users to join groups within which they can watch youtube videos together, synchronized. Once finished, users will also be able to find and vote on videos, as well as browse a list of top rated videos.

So far, we have three routes deployed to Heroku. Please note that it may take a few minutes from the first request before the app starts up (heroku will shut them down after some inactivity):
* http://ourtube-iprog.herokuapp.com/ - this index page will allow users to log into the website, a functionality which will later be mocked with a username and password field.
* http://ourtube-iprog.herokuapp.com/explore - this page allows users to create groups, within which users can interact through the video controls on the /watch page. Creating a group is functional, and is persisted through firebase. However, selecting a group currently has no effect. Later on, this page will also feature a list of the website's top rated videos.

* http://ourtube-iprog.herokuapp.com/watch - this is Ourtube's main page. Currently, due to the not-yet implemented login functionality, you must select a username and join the single available group. Due to backend not being the focus of the assignment, all users must have loaded the page and joined the group before proceeding further than this for it to work correctly. Next, any one user may click on the "take control" button, after which they can control the video player. It may take a few seconds for all users to connect fully once the video player has started. Although not yet functional, this page also includes a rating feature for the video, a poll of which video to queue up next, and in the future will also display the current group.

Throughout the website, the header will in the future display your current username. The search bar will also allow for searching youtube for a video to play in the watch page.
Most of the backend work and actual page navigation is very much a work in progress.

The video synchronization API communication is done through websockets. In the future, some components will also fetch data directly from the youtube API in order to display search results and thumbnails. A component making use of this feature can be found in the "videosummary" branch.

## File structure:
* `src/action` folder contains .js files which defines all redux actions.
* `src/reducers` similarly contains redux reducers
* `src/hooks/useScript.js` contains a helper function for importing an external script file
* `src/components` contains components that are not view-specific, used throughout the app
* `src/views/` includes javascript and css files for all views in the project. The components will have both a .js and .css file with the same name. We currently have the following:
  * Login - see "/" route.
  * TopBar - the header which is shared between different views
  * Watch - files within this folder correspond to the components and views visible on the /watch route. Each subfolder correspond to a single feature on that page.
  * explore - files within this folder correspond to the components and views visible on the /explore route. Each subfolder correspond to a single feature on that page.


To host locally:
`node src/video-server.js & yarn start` (yarn dependencies may need to be installed first)
