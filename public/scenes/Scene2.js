const bodyConfig = {
    body1: 'sample/MAINHERO/start/body/1/face_f_1_body_f_regular_white_1.png',
    body2: 'sample/MAINHERO/start/body/3/face_f_3_body_f_regular_latino_3.png',
    hair1: 'sample/MAINHERO/start/hair/front/hair_f_3.png',
    hair2: 'sample/MAINHERO/start/hair/front/hair_f_4.png',
    clothes1: 'sample/MAINHERO/start/clothes/cloths_f_regular_8.png',
    clothes2: 'sample/MAINHERO/start/clothes/cloths_f_regular_9.png',
    clothes3: 'sample/MAINHERO/start/clothes/cloths_f_regular_16.png'
}
const emotionConfig = [{
    angry: 'sample/MAINHERO/start/body/1/emotions/face_f_1_angry.png',
    default: 'sample/MAINHERO/start/body/1/emotions/face_f_1_default.png',
    joy: 'sample/MAINHERO/start/body/1/emotions/face_f_1_joy.png',
    sad: 'sample/MAINHERO/start/body/1/emotions/face_f_1_sad.png',
    shy: 'sample/MAINHERO/start/body/1/emotions/face_f_1_shy.png',
    surprise: 'sample/MAINHERO/start/body/1/emotions/face_f_1_surprised.png'
},
{
    angry: 'sample/MAINHERO/start/body/3/emotions/face_f_3_angry.png',
    default: 'sample/MAINHERO/start/body/3/emotions/face_f_3_default.png',
    joy: 'sample/MAINHERO/start/body/3/emotions/face_f_3_joy.png',
    sad: 'sample/MAINHERO/start/body/3/emotions/face_f_3_sad.png',
    shy: 'sample/MAINHERO/start/body/3/emotions/face_f_3_shy.png',
    surprise: 'sample/MAINHERO/start/body/3/emotions/face_f_3_surprised.png'
}
]
class Scene2 extends Phaser.Scene {
    constructor() {
        super('Walking');
        this.rect_params = {//location main white rectangle
            width: (window.innerWidth < 800) ? window.innerWidth - window.innerWidth / 4 : window.innerWidth / 3,
            height: window.innerHeight / 4,
            y: window.innerHeight / 2 + 150,
            x: null
        }
        this.rect_params.x = (window.innerWidth / 2) - (this.rect_params.width / 2)
    }
    preload() {
        console.log(completedTasks)
        this.load.image('body', bodyConfig[completedTasks[0].key]);
        this.load.image('hair', bodyConfig[completedTasks[1].key]);
        this.load.image('clothes', bodyConfig[completedTasks[2].key]);
        this.load.image('background1', 'sample/Backgrounds/ons-lux-party-balcony-7.jpg');
        this.load.image('home', 'imgs/home.png');
        this.load.json('json', 'sample/ons2.json')
        let skin
        console.log(completedTasks[0].key)
        if (completedTasks[0].key === 'body1') {
            skin = 0
        } else {
            skin = 1
        }
        this.load.image('woman_angry', emotionConfig[skin].angry);
        this.load.image('woman_default', emotionConfig[skin].default);
        this.load.image('woman_joy', emotionConfig[skin].joy);
        this.load.image('woman_sad', emotionConfig[skin].sad);
        this.load.image('woman_shy', emotionConfig[skin].shy);
        this.load.image('woman_surprised', emotionConfig[skin].surprise);

        this.load.image('angryEclipse', 'sample/backgroundeclipces/Angry.png');
        this.load.image('defaultEclipse', 'sample/backgroundeclipces/Default.png');
        this.load.image('flirtyEclipse', 'sample/backgroundeclipces/Flirty.png');
        this.load.image('joyEclipse', 'sample/backgroundeclipces/Happy.png');
        this.load.image('sadEclipse', 'sample/backgroundeclipces/Sad.png');
        this.load.image('shyEclipse', 'sample/backgroundeclipces/Shy.png');
        this.load.image('surpriseEclipse', 'sample/backgroundeclipces/Surprised.png');

        this.load.image('man_hair', 'sample/Russell/hair/hair_m_4.png');
        this.load.image('man_clothes', 'sample/Russell/cloths_m_regular_6.png');
        this.load.image('man_body', 'sample/Russell/face_m_1_body_m_regular_white_1.png');

        this.load.image('man_angry', 'sample/Russell/emotions/face_m_1_angry.png');
        this.load.image('man_default', 'sample/Russell/emotions/face_m_1_default.png');
        this.load.image('man_joy', 'sample/Russell/emotions/face_m_1_default.png');
        this.load.image('man_sad', 'sample/Russell/emotions/face_m_1_sad.png');
        this.load.image('man_shy', 'sample/Russell/emotions/face_m_1_shy.png');
        this.load.image('man_surprised', 'sample/Russell/emotions/face_m_1_surprised.png');
    }
    setBackground() {
        this.background = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'background1')
        this.background.setScale(0.5, 0.5);
    }
    setHomeButton() {
        this.homeButton = this.add.image(window.innerWidth / 2 - window.innerWidth / 4, 100, 'home').setInteractive({ cursor: 'pointer' })
        this.homeButton.setScale(0.5, 0.5);
        this.homeButton.on('pointerdown', () => {
            completedTasks = []
            activeTaskId = tasks[0].id
            clearInterval(this.interval)
            this.scene.start('Wearing')
        });
    }
    createMainRect() {
        let graphics = this.add.graphics();
        graphics.fillStyle(0xffffff, 1);
        let rect = graphics.fillRoundedRect(this.rect_params.x, this.rect_params.y, this.rect_params.width, this.rect_params.height, 32);
        rect.alpha = 0.9
        graphics.lineStyle(15, 0xcd2d71, 1);
        graphics.strokeRoundedRect(this.rect_params.x, this.rect_params.y, this.rect_params.width, this.rect_params.height, 32);
    }
    createNameRect() {
        let graphics = this.add.graphics();
        graphics.fillStyle(0xcd2d71, 1);
        let rect = graphics.fillRoundedRect(this.rect_params.x + this.rect_params.width / 2, this.rect_params.y - 20, this.rect_params.width / 3, 40, 20);
    }
    createHeaderText(string) {//create text in header
        this.add.text(this.rect_params.x + this.rect_params.width / 2, this.rect_params.y - 15, string, { fixedWidth: this.rect_params.width / 3 - 10, align: 'center', fontSize: 30 })
    }
    createMainText(string) {
        let text = this.add.text(this.rect_params.x + 20, this.rect_params.y + 50, string, { fixedWidth: this.rect_params.width, align: 'left', fontSize: 20, color: '#000000',wordWrap: true, wordWrapWidth: 300 },)
    }
    mainHero(emotion) {
        if(this.body){
            this.body.destroy()
            this.eclipse.destroy()
            this.emotion.destroy()
            this.hair.destroy()
            this.clothes.destroy()
        }
        this.eclipse = this.add.image(this.rect_params.x + 100, this.rect_params.y - 75, `${emotion}Eclipse`)
        this.eclipse.setScale(0.35, 0.35);
        this.body = this.add.image(this.rect_params.x + 100, this.rect_params.y - 75, 'body')
        this.body.setScale(0.35, 0.35);
        this.emotion = this.add.image(this.rect_params.x + 100, this.rect_params.y - 75, `woman_${emotion}`)
        this.emotion.setScale(0.35, 0.35);
        this.hair = this.add.image(this.rect_params.x + 100, this.rect_params.y - 75, 'hair')
        this.hair.setScale(0.35, 0.35);
        this.clothes = this.add.image(this.rect_params.x + 100, this.rect_params.y - 75, 'clothes')
        this.clothes.setScale(0.35, 0.35);
    }
    speaker(emotion) {
        if(this.body){
            this.body.destroy()
            this.eclipse.destroy()
            this.emotion.destroy()
            this.hair.destroy()
            this.clothes.destroy()
        }
        this.eclipse = this.add.image(this.rect_params.x + this.rect_params.width - 100, this.rect_params.y - 75, 'angryEclipse')
        this.eclipse.setScale(-0.35, 0.35);
        this.body = this.add.image(this.rect_params.x + this.rect_params.width - 100, this.rect_params.y - 75, 'man_body')
        this.body.setScale(-0.35, 0.35);
        this.hair = this.add.image(this.rect_params.x + this.rect_params.width - 100, this.rect_params.y - 75, 'man_hair')
        this.hair.setScale(-0.35, 0.35);
        this.clothes = this.add.image(this.rect_params.x + this.rect_params.width - 100, this.rect_params.y - 75, 'man_clothes')
        this.clothes.setScale(-0.35, 0.35);
    }




    showMainHero() {

    }

    create() {
        this.jsonArr = this.cache.json.get('json');
        console.log(this.jsonArr)
        this.setBackground()
        this.setHomeButton()
        let i = 0
        this.interval = setInterval(()=>{
            if(i>=this.jsonArr.length-1){
                clearInterval(this.interval)
            }
            if(this.jsonArr[i].character === undefined){
                if(this.body){
                    this.body.destroy()
                    this.emotion.destroy()
                    this.eclipse.destroy()
                    this.hair.destroy()
                    this.clothes.destroy()
                    console.log('hello')
                }
                this.createMainRect()
                this.createNameRect()
                this.createHeaderText('Nobody')
                this.createMainText(this.jsonArr[i].text || '')
            }else if(this.jsonArr[i].character === 'MAINHERO'){
                this.mainHero(this.jsonArr[i].emotion)
                this.createMainRect()
                this.createNameRect()
                this.createHeaderText('MAINHERO')
                this.createMainText(this.jsonArr[i].text || '')
            }else if(this.jsonArr[i].character === 'Russell'){
                this.speaker(this.jsonArr[i].emotion)
                this.createMainRect()
                this.createNameRect()
                this.createHeaderText('Russell')
                this.createMainText(this.jsonArr[i].text || '')
            }




            i++
        },1000)



    }

}
