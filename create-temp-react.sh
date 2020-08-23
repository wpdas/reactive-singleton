#!/usr/bin/env bash

mkdir temp &&
cd temp &&
cp ../package_test.json ./package.json &&
yarn install &&
cd node_modules/react &&
yarn link &&
cd ../react-dom &&
yarn link &&
cd ../../../ &&
yarn link react &&
yarn link react-dom