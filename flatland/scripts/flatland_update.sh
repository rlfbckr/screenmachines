#!/bin/bash

#cd /home/rlfbckr/hfk/screenmachines
#screen -S flatlandsever

echo "hi flatland update"

if ! screen -list | grep -q "flatlandupdate"; then
	echo "starting"
	cd /home/rlfbckr/scripts
	screen -S flatlandupdate /home/rlfbckr/scripts/update_flatland_repository.sh
	stty sane
    # run bash script
else
    echo "reattaching to existing session"
    screen -d -r flatlandupdate
fi