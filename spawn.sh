#!/bin/bash 

DATA_IMAGE=dev-mysql-nextjs
CONTAINER_NAME=spawn-dev-container

function imageExists() {
  spawnctl get data-image $DATA_IMAGE > /dev/null 2>&1
  return $?
}

function containersExist() {
  spawnctl get data-container $CONTAINER_NAME > /dev/null 2>&1
  return $?
}

if imageExists; then
  echo "Spawn data image '$DATA_IMAGE' exists"
else 
  echo "ERROR: Spawn data image '$DATA_IMAGE' does not exist, please create it first."
  echo "You can do this by running 'spawnctl create data-image -f ./database/dev-example.yaml' from this repository"
  echo
  exit 1
fi

if containersExist; then
  echo "Spawn data container already provisioned"
else
  echo "Provisioning Spawn data container for dev"
  spawnctl create data-container --image $DATA_IMAGE --name $CONTAINER_NAME -q
  echo "Spawn data container '$CONTAINER_NAME' successfully provisioned"
fi

echo "Updating data container connection details in .env.local"

db_connection_details_json=$(spawnctl get data-container $CONTAINER_NAME -o json)

DB_HOST=$(echo $db_connection_details_json | jq .host)
DB_PORT=$(echo $db_connection_details_json | jq .port)
DB_USERNAME=$(echo $db_connection_details_json | jq .user)
DB_PASSWORD=$(echo $db_connection_details_json | jq .password)

cat << EOF > .env.local
MYSQL_HOST=$DB_HOST
MYSQL_PORT=$DB_PORT
MYSQL_USERNAME=$DB_USERNAME
MYSQL_PASSWORD=$DB_PASSWORD
MYSQL_DATABASE=nextjs
EOF

echo "Successfully updated data container connection details in .env.local"