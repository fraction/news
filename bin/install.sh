#!/bin/sh

# Install Meteor
printf "> curl https://install.meteor.com | /bin/sh\n"
curl https://install.meteor.com | /bin/sh

# Install Meteorite (use sudo if necessary)
printf "> npm install -g meteorite@0.7.x || { sudo -H npm install -g meteorite@0.7.x; }\n"
npm install -g meteorite@0.7.x || { sudo -H npm install -g meteorite@0.7.x; }

# Install JSHint (use sudo if necessary)
printf "\n> npm install -g jshint@2.5.x || { sudo -H npm install -g jshint@2.5.x; }\n"
npm install -g jshint@2.5.x || { sudo -H npm install -g jshint@2.5.x; }
