class Scene1 extends Phaser.Scene {
    constructor() {
        super('Wearing');
        this.rect_params = {//location main white rectangle
            width: (window.innerWidth < 800) ? window.innerWidth - window.innerWidth / 4 : window.innerWidth / 3,
            height: window.innerHeight / 4,
            y: window.innerHeight / 2 + 50,
            x: null
        }
        this.rect_params.x = (window.innerWidth / 2) - (this.rect_params.width / 2)
        this.rect_header_params = {//location of header, where wrote number of task
            height: 40,
            width: 300,
            x: null,
            y: this.rect_params.y
        }
        this.rect_header_params.x = this.rect_params.x + this.rect_params.width / 2 - this.rect_header_params.width / 2
        this.headerText = {//location of text in header
            x: this.rect_header_params.x + 5,
            y: this.rect_header_params.y + 5,

        }
        this.rectText = {//location of text in white rect
            x: this.rect_params.x,
            y: this.rect_params.y + this.rect_params.height / 2 - 10,
            value: tasks[activeTaskId - 1].question
        }
    }
    preload() {
        this.load.image('background3', 'sample/Backgrounds/ons-ms-apartment-bedroom-5.jpg');
        this.load.image('body1', 'sample/MAINHERO/start/body/1/face_f_1_body_f_regular_white_1.png');
        this.load.image('body2', 'sample/MAINHERO/start/body/3/face_f_3_body_f_regular_latino_3.png');
        this.load.image('hair1', 'sample/MAINHERO/start/hair/front/hair_f_3.png');
        this.load.image('hair2', 'sample/MAINHERO/start/hair/front/hair_f_4.png');
        this.load.image('clothes1', 'sample/MAINHERO/start/clothes/cloths_f_regular_8.png');
        this.load.image('clothes2', 'sample/MAINHERO/start/clothes/cloths_f_regular_9.png');
        this.load.image('clothes3', 'sample/MAINHERO/start/clothes/cloths_f_regular_16.png');
        this.load.image('confirmButton', 'imgs/button.png');
        this.load.image('arrow_left', 'imgs/arrow-left.png');
        this.load.image('arrow_right', 'imgs/arrow-right.png');
    }
    setBackground() {
        this.image = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'background3')
        this.image.setScale(0.5, 0.5);
    }
    createArrows() {
        this.leftButton = this.add.image(window.innerWidth / 2 - window.innerWidth / 4, window.innerHeight / 2 - 100, 'arrow_left').setInteractive({ cursor: 'pointer' })
        this.leftButton.setScale(0.5, 0.5);
        this.leftButton.on('pointerdown', (pointer) => {
            this.setPrevItem()
        });
        this.rightButton = this.add.image(window.innerWidth / 2 + window.innerWidth / 4, window.innerHeight / 2 - 100, 'arrow_right').setInteractive({ cursor: 'pointer' })
        this.rightButton.setScale(0.5, 0.5);
        this.rightButton.on('pointerdown', (pointer) => {
            this.setNextItem()
        });
    }
    createRect() {//create white rect
        let graphics = this.add.graphics();
        graphics.fillStyle(0xffffff, 1);
        let rect = graphics.fillRoundedRect(this.rect_params.x, this.rect_params.y, this.rect_params.width, this.rect_params.height, 32);
        rect.alpha = 0.9
    }
    createRectHeader() {//create header of white rect
        let graphics = this.add.graphics();
        graphics.fillStyle(0xf27bae, 1);
        graphics.fillRoundedRect(this.rect_header_params.x, this.rect_header_params.y, this.rect_header_params.width, this.rect_header_params.height, { tl: 0, tr: 0, bl: 10, br: 10 });
    }
    createHeaderText() {//create text in header
        this.add.text(this.headerText.x, this.headerText.y, `Choise ${activeTaskId}/${tasks.length}`, { fixedWidth: this.rect_header_params.width - 30, align: 'center', fontSize: 30 })
    }
    createRectText() {//create text in white rect
        this.add.text(this.rectText.x, this.rectText.y, tasks[activeTaskId - 1].question, { fixedWidth: this.rect_params.width, align: 'center', fontSize: 30, color: '#000000' })
    }
    createConfirmButton() {////create confirm button
        this.image = this.add.image(window.innerWidth / 2, window.innerHeight - 100, 'confirmButton').setInteractive({ cursor: 'pointer' })
        this.image.setScale(0.5, 0.5);
        this.image.on('pointerdown', (pointer) => {
            tasks[activeTaskId - 1].answered = true
            completedTasks.push({ id: tasks[activeTaskId - 1].id, key: activeValue })
            activeTaskId++
            this.removeInputs()
            this.create()
        });

    }
    removeInputs() {    //remove available inputs when task changing
        this.input.keyboard._events.keydown_RIGHT = null
        this.input.keyboard._events.keydown_LEFT = null
    }
    alreadySettedStyle() {//show already selected items
        for (let i = 0; i < completedTasks.length; i++) {
            let backimage = this.add.image(window.innerWidth / 2, window.innerHeight / 2 - 100, completedTasks[i].key)
            backimage.setScale(0.5, 0.5);
        }
    }
    addViews() {//add selecting items
        this.alreadySettedStyle()
        let views = tasks[activeTaskId - 1].keys
        activeValue = views[0]
        let iterator = 0
        let image = this.add.image(window.innerWidth / 2, window.innerHeight / 2 - 100, views[iterator])
        image.setScale(0.5, 0.5);
        console.log(this)
        this.goingLeft = function(){
            iterator++
            if (iterator >= views.length) {
                iterator = 0
            }
            image.destroy()
            image = this.add.image(window.innerWidth / 2, window.innerHeight / 2 - 100, views[iterator])
            activeValue = views[iterator]
            image.setScale(0.5, 0.5);
            this.createRect()
            this.createRectHeader()
            this.createHeaderText()
            this.createRectText()
            this.createConfirmButton()
        }
        this.goingRight = function(){
            iterator--
            if (iterator < 0) {
                iterator = views.length - 1
            }
            image.destroy()
            image = this.add.image(window.innerWidth / 2, window.innerHeight / 2 - 100, views[iterator])
            activeValue = views[iterator]
            image.setScale(0.5, 0.5);
            this.createRect()
            this.createRectHeader()
            this.createHeaderText()
            this.createRectText()
            this.createConfirmButton()
        }
        this.input.keyboard.on('keydown_RIGHT', this.goingRight, this)
        this.input.keyboard.on('keydown_LEFT', this.goingLeft, this)
    }
    setPrevItem() {
        console.log(this)
        this.goingRight()
    }
    setNextItem() {
        console.log(this)
        this.goingLeft()
    }

    create() {
        if (tasks.length === completedTasks.length) {//if all tasks is completed --> changing scene
            this.sceneShange()
        } else {
            this.setBackground()
            this.createArrows()
            this.addViews()
            this.createRect()
            this.createRectHeader()
            this.createHeaderText()
            this.createRectText()
            this.createConfirmButton()
        }

    }
    sceneShange() {
        this.scene.start('Walking')
    }
}