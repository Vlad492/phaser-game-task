class Scene1 extends Phaser.Scene {
  constructor() {
    super();
  }
  create() {
    this.add.text(20, 20, "Hello world!");
    let background = this.add.sprite(0, 0, 'background1');
    background.height = window.innerHeight;
  }
}

class Scene2 extends Phaser.Scene {
  constructor() {
    super('Walking');
  }
}





var game = new Phaser.Game(config);
//   function preload() {
//     game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//     game.scale.pageAlignHorizontally = true;
//     game.scale.pageAlignVertically = true;
//     game.load.image('background1', 'sample/Backgrounds/ons-lux-party-balcony-7.jpg');
//     game.load.image('background2', 'sample/Backgrounds/ons-lux-party-hall-6.jpg');
//     game.load.image('background3', 'sample/Backgrounds/ons-ms-apartment-bedroom-5.jpg');
// }
//   function create() {
//     var background = game.add.sprite(0, 0, 'background1');
//     background.height= window.innerHeight;
//   }
//   function update() {}
