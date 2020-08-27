#!/usr/bin/env bash

rm -rf temp &&
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
yarn link react-dom &&
yarn test:jest &&
yarn unlink react && yarn unlink react-dom &&
cd temp/node_modules/react &&
yarn unlink &&
cd ../react-dom &&
yarn unlink &&
cd ../../../ &&
rm -rf temp