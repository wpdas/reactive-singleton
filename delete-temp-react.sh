#!/usr/bin/env bash

yarn unlink react && yarn unlink react-dom &&
cd temp/node_modules/react &&
yarn unlink &&
cd ../react-dom &&
yarn unlink &&
cd ../../../ &&
rm -rf temp