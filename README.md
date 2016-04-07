# idealists
Web application for managing lists. 

## How to start

### Checkout

Checkout the project via

    git clone https://github.com/nezrok/idealists.git --recursive

The `--recursive` flag is needed to update all submodules. 
If your version of git do not support this flag, you can do:

    git clone https://github.com/nezrok/idealists.git
    cd idealists
    git submodule init
    git submodule update

Once you have checked out the project you can request updates via
    
    git pull --recurse-submodules

### Installing the Dependencies

To be able to run the application's server, make sure you have 
[npm](https://www.npmjs.com/), [Node.js 0.10+](https://nodejs.org/) and 
[MongoDB v2.4+](https://www.mongodb.org/) installed.
The commands to install may depend on your operating system. For Ubuntu 15.04 
you can type 

    sudo apt-get install npm

to install npm,

    curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
    sudo apt-get install -y nodejs

to install Node.js and

    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
    echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
    sudo apt-get update
    sudo apt-get install -y mongodb-org

to install MongoDB.

Finally, type

    cd idealists
    npm install

to install the application's dependencies.

### Run the Server

Type

    node keystone

to start the application's server.
