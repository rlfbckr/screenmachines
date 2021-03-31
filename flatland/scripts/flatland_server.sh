#!/bin/bash

#cd /home/rlfbckr/hfk/screenmachines
#screen -S flatlandsever

echo "hi flatland"

if ! screen -list | grep -q "flatland"; then
	echo "starting"
	cd /home/rlfbckr/hfk/screenmachines/flatland/
	screen -S flatland nodemon server.js
	stty sane
    # run bash script
else
    echo "reattaching to existing session"
    screen -d -r flatland
fi