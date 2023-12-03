#!/bin/bash

# This script should be executed only on CI (like CircleCI or TravisCI)
# We expect that PRIVATE_KEY and DATABASE_URL are already provided by CI config

# creates directories
mkdir $PWD/backups  # is needed for tests
mkdir $PWD/key      # is needed for private key

# prepares private key
export GOOGLE_APPLICATION_CREDENTIALS="$PWD/key/private_key.json"
echo $GOOGLE_APPLICATION_CREDENTIALS
echo $PRIVATE_KEY > $GOOGLE_APPLICATION_CREDENTIALS
echo "export GOOGLE_APPLICATION_CREDENTIALS=$GOOGLE_APPLICATION_CREDENTIALS" >> $BASH_ENV