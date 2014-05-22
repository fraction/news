#!/bin/sh

# Test with JSHint
cd app && jshint --exclude-path packages/.gitignore
