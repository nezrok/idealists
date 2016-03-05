# idealists
Web application for managing lists. 

## How to use

### Checkout

Checkout the project via

    git clone https://github.com/nezrok/idealists.git --recursive

The --recursive flag is needed to update all submodules. 
If your version of git do not support this flag, you can do:

    git clone https://github.com/nezrok/idealists.git
    cd idealists
    git submodule init
    git submodule update
    
Once you have checked out the project you can request updates via
    
    git pull --recurse-submodules
