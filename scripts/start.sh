#!/bin/bash

if [ -d "$PWD/dist" ]; then node -r $PWD/dist/index.js; fi