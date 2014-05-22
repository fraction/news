#!/bin/sh

# Install Meteor
curl https://install.meteor.com | /bin/sh

# Install Meteorite (use sudo if necessary)
npm install -g meteorite@0.7.x || { sudo -H npm install -g meteorite@0.7.x; }

# Install JSHint (use sudo if necessary)
npm install -g jshint@2.5.x || { sudo -H npm install -g jshint@2.5.x; }
