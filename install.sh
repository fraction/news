#!/bin/sh

# Install Meteor
printf "> curl https://install.meteor.com | /bin/sh\n"
curl https://install.meteor.com | /bin/sh

# Install Meteorite (use sudo if necessary)
printf "\n> npm install -g meteorite || { sudo -H npm install -g meteorite; }\n"
npm install -g meteorite || { sudo -H npm install -g meteorite; }

# Install JSHint (use sudo if necessary)
printf "\n> npm install -g meteorite || { sudo -H npm install -g meteorite; }\n"
npm install -g meteorite || { sudo -H npm install -g meteorite; }
