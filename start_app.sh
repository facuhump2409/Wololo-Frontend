#!/bin/bash

echo "------------------------------------------------------------------"
echo "\n\nSetting up directories...\n"

project_name="tp-tacs"
if [ -d "$project_name" ]
then
    echo "$project_name already exists, using it instead"
else
    echo "creating $project_name directory"
    mkdir "$project_name"
fi

cd "$project_name"

echo "------------------------------------------------------------------"
echo "\n\nCloning repos...\n"

reuising_message="already cloned. Reusing it..."
frontend_name="wololo-react"
backend_name="TP-TACS"

if [ -d "$frontend_name" ] 
then 
    echo "$frontend_name $reuising_message" 
else
    git clone "https://github.com/Maxi-F/$frontend_name.git"
fi

if [ -d "$backend_name" ] 
then
    echo "$backend_name $reuising_message"
else
    git clone "https://github.com/Tp-Tacs/$backend_name.git"
fi

cd "$frontend_name"

echo "------------------------------------------------------------------"
echo "\n\nBuilding application...\n"
sudo docker-compose build

echo "------------------------------------------------------------------"
echo "\n\nStarting application...\n"
sudo docker-compose up -d