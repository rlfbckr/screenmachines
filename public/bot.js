class botManager {
    constructor() {
        this.bots_local = [];
        this.bots_remote = [];
        this.spawn();
    }

    spawn() {
        this.bots_local.push(new Bot(this.genRandomID(), true));
    }

    removeBot(data) {
        if (this.bots_remote[data.botid]) {
            this.bots_remote[data.botid].alive(false);
        }
    }

    getRemoteBots(data) {
        if (data.sockeid == socket.id) return; // my own bots
        if (this.bots_remote[data.botid]) {
            console.log("update");
            this.bots_remote[data.botid].set(data.posx, data.posy, data.size);
        } else {
            console.log("new");
            this.bots_remote[data.botid] = new Bot(data.botid, false);
            this.bots_remote[data.botid].setSockedID(data.sockedid);
            this.bots_remote[data.botid].setBotID(data.botid);
            this.bots_remote[data.botid].set(data.posx, data.posy, data.size);

        }
    }

    update() {

        if (this.bots_local.length < botconfig.botcount) {
            this.spawn();

        }
        for (let i = 0; i < this.bots_local.length; i++) {
            if (!this.bots_local[i].isAlive()) {
                this.bots_local.splice(i,1);
            }
            this.bots_local[i].move();
            this.bots_local[i].update();
            this.bots_local[i].display();
        }
        var remotekeys = Object.keys(this.bots_remote);
        for (let i = 0; i < remotekeys.length; i++) {
            var key = remotekeys[i];
            /*
            if (this.bots_remote[key].alive == false) {
                //                this.bots_remote.splice(key,1);
                console.log("removing");
            }
            */
            this.bots_remote[key].display();
            //console.log("displaying: "+key);
        }
    }
    botCountRemote() {
        return this.bots_remote.length;
    }

    genRandomID() {
        return Math.floor((1 + Math.random()) * 0x10000000000)
            .toString(16)
            .substring(1);
    };
}


class Bot {
    constructor(_botID, _isLocal) {
        this.t = 0;
        this.alive = true;
        this.posx = random(width);
        this.posy = random(height);
        this.size = 100;
        this.color = color(220, 0, 120);
        this.speed = 1;
        this.sockedid = -1;
        this.botid = _botID;
        this.local = _isLocal;
        this.born = millis();
    }
    alive(_set) {
        this.alive = _set;
    }
    isAlive() {
        return this.alive;
    }
    setSockedID(_sockedid) {
        this.sockedid = _sockedid;
    }
    setBotID(_botid) {
        this.botid = _botid;
    }

    set(_x, _y, _size) {
        this.lastupdate = millis();
        this.posx = _x;
        this.posy = _y;
        this.size = _size;
    }
    move() {
        this.posx += random(-this.speed, this.speed);
        this.posy += random(-this.speed, this.speed);
        if (this.posx < 0) this.posx = 0;
        if (this.posy < 0) this.posy = 0;
        if (this.posx > width) this.posx = width;
        if (this.posy > height) this.posy = height;

    }
    age() {
        return millis() - this.born;
    }
    
    update() {

        if (this.local == true && socket.id != undefined) {
            this.sockedid = socket.id;
        }
        if (this.age() > botconfig.lifetime) {
            this.alive = false;
        }
        if (this.t % 10 == 0) {
            //send my bot data to server
            var data = {
                posx: this.posx,
                posy: this.posy,
                size: this.size,
                color: this.color,
                socketid: this.sockedid,
                age: this.age(),
                botid: this.botid
            }
            socket.emit('bot', data);
        }
        this.t++;

        this.size = map(this.age(),0,botconfig.lifetime,botconfig.maxSize,botconfig.minSize);
    }

    display() {
        if (!this.local && (millis() - this.lastupdate > 2000)) {
            this.alive = false; // remove zombies
        }

        if (this.alive) {
            if (this.local == true) {
                fill(0, 255, 255);
                ellipse(this.posx, this.posy, this.size, this.size);
                fill(128);
                text("local:" + socket.id + " " + this.botid, this.posx, this.posy);

            } else {
                console.log("remote " + this.posx + " " + this.posy);

                fill(this.color);
                ellipse(this.posx, this.posy, this.size, this.size);
                fill(255);
                text("remote: " + this.sockedid + " " + this.botid, this.posx, this.posy);

            }
        }
    }

}