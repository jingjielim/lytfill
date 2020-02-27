# Lytfill

An app to share all your photos online, view the photos of others, like and comment if you like. Inspired by Instagram.

[Photos Database API](https://github.com/jingjielim/photos-api)

### Technologies
- [Ruby on Rails](https://rubyonrails.org/)
- [Handlebars](https://handlebarsjs.com/)
- [PostgreSQl](https://www.postgresql.org/)
- [Heroku](https://www.heroku.com/)
- [Isotope](https://isotope.metafizzy.co/)
- DOM
- jQuery
- AJAX
- cURL
- BootStrap

## Screenshots
##### Homepage
![Homepage](https://i.imgur.com/nUnVIFm.png)
##### After Sign In
![Signed In](https://i.imgur.com/3KXH0Uz.png)
##### View single photo
![Single Photo](https://i.imgur.com/z4GOqO2.png)
## Development Process

### WireFrame

The homepage would display all the photos without requiring users to log in.
Sign Up and Sign In are done via modals.
![Homepage](https://i.imgur.com/OkzQ7eI.jpg)

After signing in, users will be able to change password, add new photos. In the final implementation, users are able to like and comment on photos as well. 
![Sign In](https://i.imgur.com/INhrXxw.jpg)

Clicking on any photo will bring users to the individual page.
Edit and delete photo buttons are only available if the user is the owner of the photo. Comments are displayed below the photo.
![Show Photo](https://i.imgur.com/cdqLuvi.jpg)

### User Stories
- As a user, I want to view all photos without signing in
- As a user, I want to change password when signed in
- As a user, I want to be able to sign up
- As a user, I want to edit my photos
- As a user, I want to delete my photos
- As a user, I want to sign out only when I am signed in
- As a user, I want to comment on photos
- As a user, I want to like photos


### Planning

The client app requires a [database](https://github.com/jingjielim/photos-api) to work. In this implementation, Ruby on rails was used and the database is hosted on Heroku. The basic API was written first to eliminate backend bugs when developing the front end.

The client app is split into various files for ease of maintenance. The events.js file contains event handlers placed on the components in the html file. The api.js file contains all AJAX calls to the API. The ui.js file contains all functions related to visual changes as a result of user interaction or a result of API calls.

After achieving a minimum viable product of Creating, Updating, Reading, Destroying photos resources through the app, the ability to comment was added.

Comments are only rendered in single photo mode. An input was included at the bottom to add comments. Comments are then dynamically added to the page with eh ability to also delete comments added by user. 

Likes are shown only in multiple photos mode and the buttons are shown only  when a user is signed in. When the page loads after user signs in, if the user has liked a photo, the photo's like button will be rendered red. The user can then like/unlike the photo and the button will dynamically change colour.

Finally, a package called Isotope was added to incorporate filtering and sorting functions to the app. Currently, sorting by 'most recent', 'most likes', 'most comments' and 'shuffle' is implemented. Photos can be filtered by username, and if a user is signed in, by 'user's photos' and photos liked by user. The filters will also dynamically render the photo elements when user likes/unlikes a photo.

### Problems encountered

Using a new additional npm package Isotope caused some issues at first due to unfamiliarity with the methods. Reading the documentation and searching for similar problems allowed me to clean up the implementation. The app is now able to dynamically filter and sort when data change on the page.

## Future improvements

### Explore filter
A recommender neural network can be trained with the photos that users upload and like to recommend new photos that the individual users may like too.

### Combination filtering and sorting
Currently only one filter and one sort value can be selected. Combination filters may include filtering photos by a certain user and liked by current user. Combination sort can include sorting by number of likes and date.
