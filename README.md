# Ourtube

Ourtube allows for users to join groups within which they can watch youtube videos together, synchronized. Users will also be able to find and vote on videos through the Search function in the Watch page, as well as browse a list of top rated videos in the /explore page.

We have three routes deployed to Heroku. Please note that it may take a few minutes from the first request before the app starts up (heroku will shut them down after some inactivity):
* http://ourtube-iprog.herokuapp.com/ - this index page will allow users to log into the website, a functionality which is mocked with a username field that stores the username in a cookie.
* http://ourtube-iprog.herokuapp.com/explore - this page allows users to create groups, within which users can interact through the video controls on the /watch page. Creating and viewing groups is persisted through firebase. This page will also feature a list of the website's top rated videos which is non-interactive since it reads from global video rating.

* http://ourtube-iprog.herokuapp.com/watch - this is Ourtube's main page. Due to backend not being the focus of the assignment, all users must have loaded the page and joined the group before proceeding further than this for it to work correctly. Next, any one user may click on the "take control" button, after which they can control the video player. It may take a few seconds for all users to connect fully once the video player has started. On the right hand side, there are two optional features: rating feature for the video and a poll of which video to watch next.

Throughout the website, the header displays your current username. The search bar in /watch  also allows for searching youtube for a video to play in the watch page.

The video synchronization API communication is done through websockets. Components fetch data directly from the youtube API in order to display search results and thumbnails. A component making use of this feature can be found in the "videosummary" branch.

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
