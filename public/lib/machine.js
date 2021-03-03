const MachineType = {
    NONE: 0,
    CIRCLE: 1,
    RECT: 2,
    TRI: 3,
    POINT: 4,
    CUSTOM: 5
};




function initSocketIO() {
    /*
    establish a connection to the central flatland server
    */
    socket = io.connect(flatlandConfig.server);
    socket.on('updateremotemachines', updateRemoteMachines);
    socket.on('removemachine', removeMachine);
    console.log('socket.id = ' + socket.id);
}

function removeClient(data) {
    flatlandlink.removeClient(data);
}

function removeMachine(data) {
    flatlandlink.removeMachine(data);
}


function updateRemoteMachines(data) {
    flatlandlink.updateRemoteMachines(data);

}



class flatlandLink {
    constructor() {
        this.machinesLocal = [];
        this.machinesRemote = [];
        this.monofont = loadFont('/fonts/RobotoMono-Regular.otf');

        textFont(this.monofont);
        textSize(12);

        this.overlayCanvas;
        this.overlayCanvas = createGraphics(windowWidth, windowHeight);
        this.overlayCanvas.textFont(this.monofont);
        this.overlayCanvas.textSize(12);

        this.drawingCanvas;
        this.drawingCanvas = createGraphics(windowWidth, windowHeight);
        this.drawingCanvas.background(30, 30, 30);
        this.spawn();

    }

    spawn() {
        this.machinesLocal.push(new Machine(this.genRandomMachineID(), true));
    }
    clearScreen() {
        if (flatlandConfig.clearscreen) {
            background(flatlandConfig.backgroundcolor[0], flatlandConfig.backgroundcolor[1], flatlandConfig.backgroundcolor[2]);
        }
    }

    drawDebugInformation() {
        if (flatlandConfig.debug) {
            this.overlayCanvas.clear();
            this.overlayCanvas.fill(255, 255, 0);
            var _debugmessage_ = 'debug\n' +
                '-------------------------------\n' +
                'version  : ' + _VERSION + '\n' +
                'fps      : ' + frameRate() + '\n' +
                'myID     : ' + socket.id + '\n' +
                '#local   : ' + this.machineCountLocal() + "\n" +
                '#remote  : ' + this.machineCountRemote() + "\n";

            this.overlayCanvas.text(_debugmessage_, 20, 20);
            image(this.overlayCanvas, -width / 2, -height / 2);
        }

    }

    removeMachine(data) {
        if (this.machinesRemote[data.machineid]) {
            this.machinesRemote[data.machineid].setAlive(false);
        }
    }

    removeClient(data) {
        // remove all machines from client
    }

    updateRemoteMachines(data) {
        if (data.socketid == socket.id) return; // my own machines
        if (this.machinesRemote[data.machineid] && this.machinesRemote[data.machineid].isAlive()) {
            // console.log("update");
            this.machinesRemote[data.machineid].set(data.pos.x, data.pos.y, data.size);
            this.machinesRemote[data.machineid].setColor1(data.color1);
            this.machinesRemote[data.machineid].setColor2(data.color2);
            this.machinesRemote[data.machineid].setRotation(data.rotation);

        } else {
            //console.log("new");
            this.machinesRemote[data.machineid] = new Machine(data.machineid, false);
            this.machinesRemote[data.machineid].setSocketID(data.socketid);
            this.machinesRemote[data.machineid].setMachineID(data.machineid);
            this.machinesRemote[data.machineid].set(data.pos.x, data.pos.y, data.size);
            this.machinesRemote[data.machineid].setColor1(data.color1);
            this.machinesRemote[data.machineid].setColor2(data.color2);
            this.machinesRemote[data.machineid].setRotation(data.rotation);
        }
    }

    update() {
        this.clearScreen();
        image(this.drawingCanvas, -width / 2, -height / 2);
        if (this.machinesLocal.length < machineConfig.maxCount) {
            this.spawn();

        }
        for (let i = 0; i < this.machinesLocal.length; i++) {
            if (!this.machinesLocal[i].isAlive()) {
                this.machinesLocal.splice(i, 1);
            } else {
                this.machinesLocal[i].premove();
                this.machinesLocal[i].move();
                this.machinesLocal[i].update();
                this.machinesLocal[i].display();
            }
        }
        for (var key in this.machinesRemote) {
            if (!this.machinesRemote[key].isAlive() || this.machinesRemote[key].lastupdated() > 2000) {
                delete this.machinesRemote[key];
            } else {
                this.machinesRemote[key].display();
            }
        }
        /*
                for (var key in this.machinesRemote) {
                    this.machinesRemote[key].display();
                }
                */
        this.drawDebugInformation();
    }

    machineCountRemote() {
        return Object.keys(this.machinesRemote).length;
    }


    machineCountLocal() {
        return this.machinesLocal.length;
    }

    genRandomMachineID() {
        return Math.floor((1 + Math.random()) * 0x10000000000).toString(16).substring(1);
    };
}


class defaultMachine {
    constructor(_machineid, _isLocal) {
        this.t = 0;
        this.alive = true;
        this.type = MachineType.RECT;
        this.pos = createVector(random(-width / 2, width / 2), random(-height / 2, height / 2));
        this.posPrevious = createVector(this.pos.x, this.pos.y);
        this.size = 100;
        this.rotation = random(PI);
        this.pendown = true;
        this.pencolor = color(255, 255, 255, 128);
        this.pensize = 2.0;
        this.color1 = color(machineConfig.color1[0], machineConfig.color1[1], machineConfig.color1[2], machineConfig.color1Opacity * 255);
        this.color2 = color(machineConfig.color2[0], machineConfig.color2[1], machineConfig.color2[2], machineConfig.color2Opacity * 255);
        this.speed = 1;
        this.socketid = -1;
        this.machineid = _machineid;
        this.local = _isLocal;
        this.born = millis();
        this.setup();
    }
    setup() {

    }
    setAlive(_set) {
        this.alive = _set;
    }
    isAlive() {
        return this.alive;
    }
    setColor1(_c) {
        this.color1 = color(_c.r, _c.g, _c.b, _c.a);
    }
    setColor2(_c) {
        this.color2 = color(_c.r, _c.g, _c.b, _c.a);
    }
    setRotation(_r) {
        this.rotation = _r;
    }
    setSocketID(socketid) {
        this.socketid = socketid;
    }
    setMachineID(_machineid) {
        this.machineid = _machineid;
    }

    set(_x, _y, _size) {
        this.lastupdate = millis();
        if (!this.local) {
            this.posPrevious.x = this.pos.x;
            this.posPrevious.y = this.pos.y;
            this.pos.x = _x;
            this.pos.y = _y;
        }
        this.size = _size;
    }

    move() {
        this.updatePos()
        this.pos.x += random(-this.speed, this.speed);
        this.pos.y += random(-this.speed, this.speed);
        this.size = map(this.age(), 0, machineConfig.lifetime, machineConfig.maxSize, machineConfig.minSize);

    }


    penUp() {
        this.pendown = false;
    }
    penDown() {
        this.pendown = true;
    }
    age() {
        return millis() - this.born;
    }
    lastupdated() {
        return millis() - this.lastupdate;
    }
    premove() {
        if (this.local) {
            this.posPrevious.x = this.pos.x;
            this.posPrevious.y = this.pos.y;

        }
    }
    update() {

        if (this.local == true && socket.id != undefined) {
            this.socketid = socket.id;
        }
        if (this.age() > machineConfig.lifetime) {
            this.setAlive(false);
            socket.emit('removemachine', { machineid: this.machineid });

        } else {
            if (this.t % 2 == 0) {
                //send my machine data to server
                var data = {
                    pos: {
                        'x': this.pos.x,
                        'y': this.pos.y
                    },
                    size: this.size,
                    color1: {
                        'r': this.color1.levels[0],
                        'g': this.color1.levels[1],
                        'b': this.color1.levels[2],
                        'a': this.color1.levels[3]
                    },
                    color2: {
                        'r': this.color2.levels[0],
                        'g': this.color2.levels[1],
                        'b': this.color2.levels[2],
                        'a': this.color2.levels[3]
                    },
                    socketid: this.socketid,
                    age: this.age(),
                    rotation: this.rotation,
                    machineid: this.machineid
                }
                socket.emit('machine', data);
            }
        }
        this.t++;
        if (this.pos.x < -width / 2) this.pos.x = -width / 2;
        if (this.pos.y < -height / 2) this.pos.y = -height / 2;
        if (this.pos.x > width / 2) this.pos.x = width / 2;
        if (this.pos.y > height / 2) this.pos.y = height / 2;
        this.color1 = color(machineConfig.color1[0], machineConfig.color1[1], machineConfig.color1[2], machineConfig.color1Opacity * 255);
        this.color2 = color(machineConfig.color2[0], machineConfig.color2[1], machineConfig.color2[2], machineConfig.color2Opacity * 255);
        this.lastupdate = millis();
        this.pencolor = color(machineConfig.pencolor[0], machineConfig.pencolor[1], machineConfig.pencolor[2]);
        this.pensize = machineConfig.pensize;
        this.pendown = machineConfig.pendown;
        if (this.pendown) {
            flatlandlink.drawingCanvas.stroke(this.pencolor);
            flatlandlink.drawingCanvas.strokeWeight(this.pensize);
            flatlandlink.drawingCanvas.line(this.posPrevious.x + width / 2, this.posPrevious.y + height / 2,
                this.pos.x + width / 2, this.pos.y + height / 2);
        }

    }
    _displayMachine() {
        strokeWeight(1);
        //console.log(this.type);
        if (this.type == MachineType.CIRCLE) {
            push();
            translate(this.pos.x, this.pos.y);
            ellipse(0, 0, this.size, this.size);
            pop();

        }
        if (this.type == MachineType.RECT) {
            rectMode(CENTER)
            push();
            translate(this.pos.x, this.pos.y);
            rotateZ(this.rotation);

            rect(0, 0, this.size, this.size); this
            pop();
        }
    }




    display() {
        if (this.isAlive()) {
            fill(this.color1);
            stroke(this.color2)
            this._displayMachine();
            fill(255);
            if (this.local == true) {
                if (flatlandConfig.debug) {
                    text("LOCAL:\n" + socket.id + "\n" + this.machineid, this.pos.x, this.pos.y);
                }
            } else {
                this._displayMachine();
                if (flatlandConfig.debug) {
                    text("REMOTE\n: " + this.socketid + "\n" + this.machineid, this.pos.x, this.pos.y);
                }
            }
        }
    }

}

