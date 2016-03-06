# idealists
This is the README for developers explaining the technical background and
implementation details. For a more general README for how to use idealists, see 
[README.md](README.md)

## KeystoneJs
This project uses [KeystoneJs 0.3.16](http://keystonejs.com/). KeystoneJs is 
built upon [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.org/). 
Make sure you have at least Node.js 0.10 and MongoDB 2.4 installed.

### The initial setup

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

