# idealists
This is the README for developers explaining the technical background and
implementation details. For a more general README for how to use idealists, see 
[README.md](README.md)

# The Initial Setup

This project uses [KeystoneJs 0.3.16](http://keystonejs.com/). 
Under the hood, KeystoneJS uses the [express.js](http://expressjs.com/) web 
server framework (which is build upon [Node.js](https://nodejs.org/en/), and a 
MongoDB database via the [mongoose](http://mongoosejs.com/) object modelling 
framework. 
Make sure you have at least Node.js 0.10 and MongoDB 2.4 installed.

The following steps were executed to setup the project (this is just to recap, 
you don't have to execute these steps again):

* Create a folder for the project: 

        mkdir idealists
        cd idealists

* Install the [KeystoneJS generator](https://github.com/keystonejs/generator-keystone)
that will setup the basic configurations (e.g. the npm dependencies) and project
layout:

        npm install -g generator-keystone
`-g` enables the global mode. Therefore the generator is installed as a global package.

* Run the generator (will ask you a few questions):

        yo keystone
The questions were answered as follows:

        ? What is the name of your project? idealists
        ? Would you like to use Jade, Swig, Nunjucks or Handlebars for templates? Jade
        ? Which CSS pre-processor would you like? [less | sass | stylus] sass
        ? Would you like to include a Blog? Yes
        ? Would you like to include an Image Gallery? No
        ? Would you like to include a Contact Form? No
        ? What would you like to call the User model? User
        ? Enter an email address for the first Admin user: admin@idealists.de
        ? Enter a password for the first Admin user: ***
        ? Would you like to include gulp or grunt? <skipped>
        ? Would you like to create a new directory for your project? No
        ? Would you like to include Email configuration in your project? No
        ? Please enter your Cloudinary URL: <skipped> 
        ? Finally, would you like to include extra code comments in your project? No

* Run the project (on http://localhost:3000):

        node keystone

# The Project Structure

The basic project structure is as follows:

        |--models
        |  The database models of the apllication.
        |--public
        |  The static files (css, js, images, etc.) that are publicly available.
        |--routes
        |  |--views
        |  |  The view controllers of the application.
        |  |--index.js
        |  |  Initialises the routes and views of the application.
        |  |--middleware.js
        |  |  Custom middleware for the routes.
        |--templates
        |  |--layouts
        |  |  The basic .jade layouts
        |  |--mixins
        |  |  The common .jade mixins.
        |  |--views
        |  |  The view templates.
        |--updates
        |  The data population and migration scripts.
        |--package.json
        |  The project configuration file.
        |--web.js
        |  The main script that starts the application.


# Database

KeyStoneJs uses a MongoDB database via the [mongoose](http://mongoosejs.com/) 
object modelling framework. For a detailed documentation about mongoose see 
[http://mongoosejs.com/docs/guide.html](http://mongoosejs.com/docs/guide.html).

The data schema and models are controlled by `Lists`, and 
documents in the database are often called `Items`.

## Creating Lists.

For a full documentation on how to create a List, see [models/User.js](models/User.js).

## Creating Items.

For a full documentation on how to create an Item, see [updates/0.0.1-admins.js](updates/0.0.1-admins.js).


# The Routes & Views

# Updates

Updates provide an easy way to seed the database, transition data when the 
models change, or run transformation scripts against the database.

Update files should be named using a semantic version followed by an optional 
key, like 0.0.1-init.js. The version numbers are used to order the update 
scripts correctly, while the keys are a nice way to identify what each update
does.

Each update file should export a single function, which should accept a 
single argument - the next(err) callback, to be called when the update is 
complete.

All the update files will be executed (each one waits for the previous update
to complete) before the web server is started.

If the next callback is receives an error it will be reported to the console,
and application initialisation will halt.

# Running the App

To run the application, execute the following in your project's main folder:

        node web

Keystone will automatically apply all updates in the `updates` (if the option 
`auto update` is set to `true` in `keystone.js`) and then start a web server on 
the default port 3000.

To see the application running, point your browser at <host>:3000. 
To sign in to the Admin UI, go to <host>:3000/keystone.