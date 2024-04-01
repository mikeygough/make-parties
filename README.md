# make-parties

## user stories

- Users can view all events (index)
- Users can create a event (new/create)
- Users can view one event (show)
- Users can edit a event (edit/update)
- Users can delete a event (destroy)
- Users can rsvp to events (/rsvps/create, /rsvps/new)
- Users can cancel their rsvp (/rsvps/destroy)

#### resourceful routes:

| URL              | HTTP Verb | Action  | What it Does           |
| ---------------- | --------- | ------- | ---------------------- |
| /events          | GET       | index   | See all events         |
| /events/new      | GET       | new     | See new event form     |
| /events          | POST      | create  | Create a new event     |
| /events/:id      | GET       | show    | See one event          |
| /events/:id/edit | GET       | edit    | See an edit event form |
| /events/:id      | PATCH/PUT | update  | Update a event         |
| /events/:id      | DELETE    | destroy | Delete a event         |

#### dependencies

- node
- express (framework)
- nodemon
- handlebars (templating engine)

#### run the app with:

`nodemon app.js`

#### notes:

i ran into a small database error when getting setup with sequalize and running the `createdb make-parties` command. to get around this, i had to run `brew services restart  postgresql`.
