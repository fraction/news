#!/bin/sh

# Kill Meteor (from http://blog.fraction.io/how-to-kill-meteor/)
printf "> kill \`ps ax | grep '[m]eteor' | awk '{print $1}'\`\n"
kill `ps ax | grep '[m]eteor' | awk '{print $1}'`
