#!/bin/bash

# Remove dist dirrectory if exist
if [ -d "$PWD/dist" ]; then rm -Rf $PWD/dist; fi
echo "Removed dist";

# Build broject
tsc --build $PWD/tsconfig.prod.json;
echo "Compiled typescript";
