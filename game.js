let tasks = [
    {
        id: 1,
        question: 'Select your body',
        keys: ['body1', 'body2'],
        answered: false

    }, {
        id: 2,
        question: 'Select your hair',
        keys: ['hair1', 'hair2'],
        answered: false

    }, {
        id: 3,
        question: 'Select your clothes',
        keys: ['clothes1', 'clothes2', 'clothes3'],
        answered: false

    }
]
let completedTasks = []
let activeValue = ''

let activeTaskId = tasks[0].id


let config = {
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'phaser-example',
    backgroundColor: 0xffffff,
    scene: [Scene1, Scene2],
    scale: {
        mode: Phaser.Scale.Center.CENTER_BOTH
    }
}


const game = new Phaser.Game(config)
