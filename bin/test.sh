#!/bin/sh

# Test with JSHint
printf "> jshint --exclude-path packages/.gitignore .\n"
jshint --exclude-path packages/.gitignore .
