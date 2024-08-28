#! /bin/bash

echo "Running migrations..."

prisma db push

npm run start --host 0.0.0.0