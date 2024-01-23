var config = {
    type: Phaser.AUTO,
    backgroundColor: 0xcccccc,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    scale: {
        mode: Phaser.Scale.LANDSCAPE,
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    render: {
        pixelArt: true,
    },
    physics: {
        default: 'matter',
        matter: {
            gravity: { x: 0, y: 0 },
            debug: true
        }
    },
    plugins: {
    global: [
      {
        key: "VirtualJoystick",
        plugin: rexvirtualjoystickplugin,
        mapping: "joystickPlugin"
      }
    ]
  }
};

var game = new Phaser.Game(config);

function preload() {    

    this.load.image('block', 'blocks.png');
    this.load.image('ball', 'ball.png');
}



function create() {

    this.matter.add.image(100, 300, 'block');
    this.matter.add.image(200, 200, 'block');
    this.matter.add.image(350, 600, 'block');
    this.matter.add.image(410, 310, 'block');

    this.player = this.matter.add.image(100, 100, 'ball');

    this.cameras.main.setBounds(0, 0, 13000, 13000);
    this.cameras.main.startFollow(this.player);

    joystick = this.joystickPlugin.add(this, {
        x: 150,
        y: 450,
        radius: 100,
        fixed: true,
        base: this.add.circle(200, 200, 80, 0x6666ff),
        thumb: this.add.circle(0, 0, 30, 0x0011ff)
      });

}


let lastUpdateTime = 0;
function update(time, delta) {

    this.player.setVelocity(0);
    //player.setAngle(0)

    if(joystick.up){
        this.player.setVelocityY(-3);
    }
    if(joystick.down){
        this.player.setVelocityY(3);
    }
    if(joystick.left){
        this.player.setVelocityX(-3);
    }
    if(joystick.right){
        this.player.setVelocityX(3);
    }

}
