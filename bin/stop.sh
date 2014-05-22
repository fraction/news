#!/bin/sh

# Kill Meteor (from http://blog.fraction.io/how-to-kill-meteor/)
kill `ps ax | grep '[m]eteor' | awk '{print $1}'`
