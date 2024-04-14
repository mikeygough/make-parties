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

#### sequelize cli:

example model create:

`sequelize model:create --name User --attributes firstName:string,lastName:string,email:string,password:string`

then migrate:

`sequelize db:migrate`

example creating associations

`sequelize migration:create --name add-event-id-to-rsvps`

Now in the migration, add the EventId column then change the EventId column we just created to become a Foreign Key.

Update the new db/migrations/add-event-id-to-rsvps.js migration file to the following:

// migration

```js
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Rsvps', // name of source model
      'EventId', // name of key we are adding
      {
        type: Sequelize.INTEGER,
        references: {
          //Required field
          model: 'Events',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Rsvps', 'EventId');
  },
};
```

Also update the Rsvp and Event models to define the "has many" and "belongs to" association:

db/models/rsvp.js

```js
// db/models/rsvp.js
...
  Rsvp.associate = function(models) {
    Rsvp.belongsTo(models.Event); // EventId
  };
db/models/event.js
```

```js
// db/models/event.js
...
  Event.associate = function(models) {
    Event.hasMany(models.Rsvp);
  };
```

then migrate

`sequelize db:migrate`

#### notes:

i ran into a small database error when getting setup with sequalize and running the `createdb make-parties` command. to get around this, i had to run `brew services restart  postgresql`.

#### dummy data
