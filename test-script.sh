#!/usr/bin/env bash

mkdir temp &&
cd temp &&
cp ../package_test.json ./package.json &&
yarn install &&
cd node_modules/react &&
yarn link &&