"use client";
import { useEffect, useRef } from "react";
import * as Phaser from "phaser";
import { url } from "inspector";
// import background from "public/portfolio-bg.png"
const Game = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const phaserGameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!gameRef.current) return;

    // Preload scene
    class PreloadScene extends Phaser.Scene {
      constructor() {
        super({ key: "PreloadScene" });
      }

      preload() {
        //background
        this.load.image("portfolio-bg", "/portfolio-bg.png");
        this.load.image("background2", "/background/bg2.png");
        this.load.image("background3", "/background/bg3.png");

        //pokemon
        this.load.image("chansey", "/pokemon/chansey.gif");
        this.load.image("bulbizarre", "/pokemon/bulbizarre.gif");
        this.load.image("pikachu", "/pokemon/pikachu.gif");
        this.load.image("politoed", "/pokemon/politoed.gif");
        this.load.image("turtwig", "/pokemon/turtwig.gif");

        //objects
        

        this.load.image("portfolio-pc", "/pokemon-pc.png");
        this.load.image("portfolio-bed", "/pokemon-bed.png");
        this.load.image("photoframe", "/photoframe.png");
        this.load.image("door", "/door.png");
        this.load.image("snorlax-rightside", "/snorlax-rightside.png");
        this.load.image("omsalunke", "/omsalunke.jpg");
        this.load.image("sidelamp", "/sidelamp.png");
        this.load.image("lamp1", "/lamp1.png");
        this.load.image("chair1", "/chair1.png");
        this.load.image("chair2", "/chair2.png");
        this.load.image("table1", "/table1.png");
        this.load.image("trophy", "/trophy.png");
        this.load.image("eevee", "/eevee.png");
        this.load.image("flowerpot", "/flowerpot.png");
        this.load.image("cupboard", "/cupboardbox.png");
        this.load.image("pokeball", "/pokeball.png");
        this.load.image("player_left", "/walking_left.gif");
        this.load.image("player_right", "/walking_right.gif");
        this.load.image("player_back", "/walking_back.gif");
        this.load.image("player_front", "/walking_front.gif");
        // Create simple colored rectangles as placeholders for sprites
        this.add
          .graphics()
          .fillStyle(0x4ade80)
          .fillRect(0, 0, 32, 32)
          .generateTexture("player", 32, 32);

        const pcImage = this.add.image(60, 60, "portfolio-pc");

        this.add.image(40, 40, "pokeball");

        this.add.image(40, 40, "trophy");

        this.add
          .graphics()
          .fillStyle(0x374151)
          .fillRect(0, 0, 800, 600)
          .generateTexture("room-bg", 800, 600);

        this.add
          .graphics()
          .fillStyle(0x7c3aed)
          .fillRect(0, 0, 800, 600)
          .generateTexture("room2-bg", 800, 600);

        this.add.image(48, 48, "door");
      }

      create() {
        this.scene.start("GameScene");
      }
    }

    class GameScene extends Phaser.Scene {
      private player!: Phaser.Physics.Arcade.Sprite;
      private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
      private wasd!: any;
      private enterKey!: Phaser.Input.Keyboard.Key;
      private interactiveObjects: Array<{
        sprite: Phaser.GameObjects.Image;
        type: string;
        title: string;
        content: string;
        image?: string;
      }> = [];
      private interactionText!: Phaser.GameObjects.Text;

      constructor() {
        super({ key: "GameScene" });
      }

      create(data?: { fromRoom: number }) {
        // Add room background
        const bg = this.add.image(200, 300, "portfolio-bg");
        bg.setDisplaySize(1100, 700); // Stretch to fit canvas

        // Create walls (invisible collision bodies)
        const walls = this.physics.add.staticGroup();

        // Top wall
        walls.create(400, 16, null).setSize(800, 52).setVisible(false);
        // Bottom wall
        walls.create(400, 584, null).setSize(800, 32).setVisible(false);
        // Left wall
        walls.create(16, 300, null).setSize(32, 600).setVisible(false);
        // Right wall
        walls.create(784, 300, null).setSize(32, 600).setVisible(false);

        // Add door to room 2
        const door = this.physics.add
          .staticSprite(480, 80, "door")
          .setDisplaySize(70, 110);
        door.refreshBody();
        // Add interactive objects as physics sprites for collision
        const pc = this.physics.add
          .staticSprite(60, 140, "portfolio-pc")
          .setDisplaySize(80, 80);
        pc.refreshBody();
        const bed = this.physics.add
          .staticSprite(60, 540, "portfolio-bed")
          .setDisplaySize(80, 80);
        bed.refreshBody();
        const cupboard = this.physics.add
          .staticSprite(580, 140, "cupboard")
          .setDisplaySize(70, 70);
        cupboard.refreshBody();
        const photoframe = this.physics.add
          .staticSprite(260, 60, "photoframe")
          .setDisplaySize(60, 60);
        photoframe.refreshBody();

        const pikachu = this.physics.add
          .staticSprite(150, 130, "pikachu")
          .setDisplaySize(50, 50);
        pikachu.refreshBody();
        const sidelamp = this.physics.add
          .staticSprite(50, 330, "sidelamp")
          .setDisplaySize(50, 80);
        sidelamp.refreshBody();

        const flowerpot1 = this.physics.add
          .staticSprite(300, 140, "flowerpot")
          .setDisplaySize(30, 40);
        const flowerpot2 = this.physics.add
          .staticSprite(350, 140, "flowerpot")
          .setDisplaySize(30, 40);
        const flowerpot3 = this.physics.add
          .staticSprite(400, 140, "flowerpot")
          .setDisplaySize(30, 40);
        const flowerpot4 = this.physics.add
          .staticSprite(50, 370, "flowerpot")
          .setDisplaySize(30, 40);
        const sonalax = this.physics.add
          .staticSprite(620, 500, "snorlax-rightside")
          .setDisplaySize(50, 50);
        flowerpot1.refreshBody();
        flowerpot2.refreshBody();
        flowerpot3.refreshBody();
        flowerpot4.refreshBody();

        const trophy = this.physics.add
          .staticSprite(580, 110, "trophy")
          .setDisplaySize(40, 40);
        trophy.refreshBody();
        // Store interactive objects with their data
        this.interactiveObjects = [
          {
            sprite: door,
            type: "door",
            title: "Door to Room 2",
            content: "door",
          },
          {
            sprite: pc,
            type: "portfolio-pc",
            title: "Projects",
            content:
              "Here are my coding projects:\n• React Portfolio Game\n• Carbon Credit Platform\n• E-commerce Dashboard\n• Task Management System\n• Weather App",
          },
          {
            sprite: pikachu,
            type: "pikachu",
            title: "Pokemon",
            content:
              "✨ 'Do you know about my master? His name is Om Sachin Salunke! ⚡ He’s not just any developer—he’s a full-stack wizard who builds powerful web apps, mobile apps, and even dives deep into the world of blockchain! 🧑‍💻 With his skills and experience, he can turn imagination into reality. Pika pika Pikachu!' ⚡🐭",
          },

          {
            sprite: trophy,
            type: "trophy",
            title: "Achievements",
            content:
              "🏆 Built 50+ React components\n🏆 Deployed 10+ web applications\n🏆 Mastered TypeScript\n🏆 Created interactive games\n🏆 Led development teams",
          },
          {
            sprite: photoframe,
            type: "photo",
            title: "Profile Image",
            content: "",
            image: "/omsalunke.jpg",
          },
        ];

        // Create player
        if (data?.fromRoom === 2) {
          // Coming from room 2, place near the door
          this.player = this.physics.add.sprite(470, 130, "player_front");
          this.player.setDisplaySize(40, 40);
          this.player.refreshBody();
        } else {
          // Default position
          //   this.player = this.physics.add.sprite(400, 400, "player");
          this.player = this.physics.add.sprite(400, 400, "player_front");
          this.player.setDisplaySize(40, 40);
          this.player.refreshBody();
        }
        this.player.setCollideWorldBounds(true);

        // Create object group for collisions
        const objectGroup = this.physics.add.staticGroup([
          door,
          pc,
          flowerpot1,
          flowerpot2,
          flowerpot3,
          trophy,
          bed,
          cupboard,
          photoframe,
          pikachu,
          flowerpot4,
          sonalax,

          sidelamp,
        ]);

        // Player collisions with walls and objects
        this.physics.add.collider(this.player, walls);
        this.physics.add.collider(this.player, objectGroup);

        // Setup controls
        this.cursors = this.input.keyboard!.createCursorKeys();
        this.wasd = this.input.keyboard!.addKeys("W,S,A,D");
        this.enterKey = this.input.keyboard!.addKey(
          Phaser.Input.Keyboard.KeyCodes.ENTER
        );

        // Add interaction text (initially hidden)
        this.interactionText = this.add
          .text(400, 50, "", {
            fontSize: "18px",
            color: "#ffffff",
            backgroundColor: "#000000",
            padding: { x: 15, y: 10 },
            align: "center",
          })
          .setOrigin(0.5)
          .setVisible(false);

        // Add instructions
        // this.add.text(
        //   20,
        //   20,
        //   "Use WASD or Arrow Keys to move\nGet close to objects and press ENTER to interact",
        //   {
        //     fontSize: "16px",
        //     color: "#ffffff",
        //     backgroundColor: "#000000",
        //     padding: { x: 10, y: 10 },
        //   }
        // );
      }

      update() {
        // Player movement
        const speed = 160;

        if (this.cursors.left.isDown || this.wasd.A.isDown) {
          this.player.setVelocityX(-speed);
          this.player.setVelocityY(0);
          this.player.setTexture("player_left").setDisplaySize(40, 40);
        } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
          this.player.setVelocityX(speed);
          this.player.setVelocityY(0);
          this.player.setTexture("player_right");
        } else if (this.cursors.up.isDown || this.wasd.W.isDown) {
          this.player.setVelocityY(-speed);
          this.player.setVelocityX(0);
          this.player.setTexture("player_back");
        } else if (this.cursors.down.isDown || this.wasd.S.isDown) {
          this.player.setVelocityY(speed);
          this.player.setVelocityX(0);
          this.player.setTexture("player_front");
        } else {
          this.player.setVelocity(0);
        }

        // Check proximity to interactive objects
        let nearObject = null;
        const interactionDistance = 80;

        for (const obj of this.interactiveObjects) {
          const distance = Phaser.Math.Distance.Between(
            this.player.x,
            this.player.y,
            obj.sprite.x,
            obj.sprite.y
          );

          if (distance < interactionDistance) {
            nearObject = obj;
            break;
          }
        }

        // Show/hide interaction prompt
        if (nearObject) {
          // console.log(nearObject)
          this.interactionText.setText(
            `Press ENTER to interact with ${nearObject.type.toUpperCase()}`
          );
          this.interactionText.setVisible(true);

          // Check for Enter key press
          if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
            if (nearObject.content === "door") {
              this.scene.start("GameScene2", { fromRoom: 1 });
            } else {
              this.showModal(
                nearObject.title,
                nearObject.content,
                nearObject?.image
              );
            }
          }
        } else {
          this.interactionText.setVisible(false);
        }
      }

      private showModal(title: string, content: string, image: string) {
        // Dispatch custom event to React
        const data = { title, content };
        console.log(data);
        window.dispatchEvent(
          new CustomEvent("showGameModal", {
            detail: data,
          })
        );
      }
    }

    //game 2 layout
    class GameScene2 extends Phaser.Scene {
      private player!: Phaser.Physics.Arcade.Sprite;
      private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
      private wasd!: any;
      private enterKey!: Phaser.Input.Keyboard.Key;
      private interactiveObjects: Array<{
        sprite: Phaser.GameObjects.Image;
        type: string;
        title: string;
        content: string;
        image?: string;
      }> = [];
      private interactionText!: Phaser.GameObjects.Text;

      constructor() {
        super({ key: "GameScene2" });
      }

      create(data?: { fromRoom: number }) {
        // Add room 2 background
        const bg = this.add.image(200, 300, "background2");
        bg.setDisplaySize(1100, 700); // Stretch to fit canvas

        // Create walls (invisible collision bodies)
        const walls = this.physics.add.staticGroup();

        // Top wall
        walls.create(400, 16, null).setSize(800, 32).setVisible(false);
        // Bottom wall
        walls.create(400, 584, null).setSize(800, 32).setVisible(false);
        // Left wall
        walls.create(16, 300, null).setSize(32, 600).setVisible(false);
        // Right wall
        walls.create(784, 300, null).setSize(32, 600).setVisible(false);

        // Add door back to room 1
        const door = this.physics.add
          .staticSprite(100, 80, "door")
          .setDisplaySize(70, 110);
        door.refreshBody();
        // Add some different objects for room 2
        const pc2 = this.physics.add.staticSprite(600, 140, "portfolio-pc");
        pc2.setDisplaySize(70, 70);
        pc2.refreshBody();
        // const trophy2 = this.physics.add
        //   .staticSprite(400, 300, "trophy")
        //   .setDisplaySize(50, 50);
        // trophy2.refreshBody();
        const flowerpot1 = this.physics.add
          .staticSprite(620, 240, "flowerpot")
          .setDisplaySize(30, 40);
        const flowerpot2 = this.physics.add
          .staticSprite(620, 270, "flowerpot")
          .setDisplaySize(30, 40);
        const flowerpot3 = this.physics.add
          .staticSprite(620, 300, "flowerpot")
          .setDisplaySize(30, 40);
        const flowerpot4 = this.physics.add
          .staticSprite(50, 150, "flowerpot")
          .setDisplaySize(30, 40);
        const lamp1 = this.physics.add
          .staticSprite(240, 120, "lamp1")
          .setDisplaySize(80, 60);
        lamp1.refreshBody();
        const cupboard1 = this.physics.add
          .staticSprite(50, 350, "cupboard")
          .setDisplaySize(60, 60);
        cupboard1.refreshBody();
        const cupboard2 = this.physics.add
          .staticSprite(120, 350, "cupboard")
          .setDisplaySize(60, 60);
        cupboard2.refreshBody();
        const cupboard3 = this.physics.add
          .staticSprite(190, 350, "cupboard")
          .setDisplaySize(60, 60);
        cupboard3.refreshBody();
        const cupboard4 = this.physics.add
          .staticSprite(260, 350, "cupboard")
          .setDisplaySize(60, 60);
        cupboard4.refreshBody();
        const cupboard5 = this.physics.add
          .staticSprite(330, 350, "cupboard")
          .setDisplaySize(60, 60);
        cupboard5.refreshBody();
        const cupboard6 = this.physics.add
          .staticSprite(400, 350, "cupboard")
          .setDisplaySize(60, 60);
        cupboard6.refreshBody();
        const pokeball1 = this.physics.add
          .staticSprite(50, 330, "pokeball")
          .setDisplaySize(30, 30);
        const pokeball2 = this.physics.add
          .staticSprite(120, 330, "pokeball")
          .setDisplaySize(30, 30);
        const pokeball3 = this.physics.add
          .staticSprite(190, 330, "pokeball")
          .setDisplaySize(30, 30);
        const pokeball4 = this.physics.add
          .staticSprite(260, 330, "pokeball")
          .setDisplaySize(30, 30);
        const pokeball5 = this.physics.add
          .staticSprite(330, 330, "pokeball")
          .setDisplaySize(30, 30);
        const pokeball6 = this.physics.add
          .staticSprite(400, 330, "pokeball")
          .setDisplaySize(30, 30);
        const eevee = this.physics.add
          .staticSprite(470, 350, "eevee")
          .setDisplaySize(40, 40);
        eevee.refreshBody();
        const door2 = this.physics.add
          .staticSprite(470, 500, "door")
          .setDisplaySize(50, 40);
        door2.refreshBody();
        eevee.refreshBody();
        pokeball1.refreshBody();
        pokeball2.refreshBody();
        pokeball3.refreshBody();
        pokeball4.refreshBody();
        pokeball5.refreshBody();
        pokeball6.refreshBody();
        flowerpot1.refreshBody();
        flowerpot2.refreshBody();
        flowerpot3.refreshBody();
        flowerpot4.refreshBody();

        // Store interactive objects with their data
        this.interactiveObjects = [
          {
            sprite: door,
            type: "door",
            title: "Door to Room 1",
            content: "door",
          },
          {
            sprite: door2,
            type: "door",
            title: "Door to Room 3",
            content: "doorToRoom3",
          },
          {
            sprite: pc2,
            type: "pc",
            title: "Advanced Projects",
            content:
              "Advanced Projects:\n• AI-Powered Analytics\n• Blockchain Integration\n• Real-time Chat System\n• Machine Learning Models\n• Microservices Architecture",
          },
          {
            sprite: eevee,
            type: "pokemon",
            title: "This are my master skill ",
            content: "You can check each pokeball to know my master ability",
          },
          // {
          //   sprite: trophy2,
          //   type: "trophy",
          //   title: "Leadership",
          //   content:
          //     "🏆 Led development teams of 5+\n🏆 Mentored junior developers\n🏆 Architected scalable systems\n🏆 Delivered 20+ projects on time\n🏆 Tech talk speaker",
          // },
        ];

        // Create player
        if (data?.fromRoom === 1) {
          // Coming from room 1, place near the door
          this.player = this.physics.add.sprite(90, 130, "player_front");
          this.player.setDisplaySize(40, 40);
          this.player.refreshBody();
        } else {
          // Default position
          this.player = this.physics.add.sprite(300, 80, "player_right");
          this.player.setDisplaySize(40, 40);
          this.player.refreshBody();
        }
        this.player.setCollideWorldBounds(true);

        // Create object group for collisions for room 2
        const objectGroup = this.physics.add.staticGroup([
          door,
          pc2,
          flowerpot1,
          flowerpot2,
          flowerpot3,
          flowerpot4,
          cupboard1,
          cupboard2,
          cupboard3,
          cupboard4,
          cupboard5,
          cupboard6,
          eevee,
        ]);

        // Player collisions with walls and objects
        this.physics.add.collider(this.player, walls);
        this.physics.add.collider(this.player, objectGroup);

        // Setup controls
        this.cursors = this.input.keyboard!.createCursorKeys();
        this.wasd = this.input.keyboard!.addKeys("W,S,A,D");
        this.enterKey = this.input.keyboard!.addKey(
          Phaser.Input.Keyboard.KeyCodes.ENTER
        );

        // Add interaction text (initially hidden)
        this.interactionText = this.add
          .text(400, 50, "", {
            fontSize: "18px",
            color: "#ffffff",
            backgroundColor: "#000000",
            padding: { x: 15, y: 10 },
            align: "center",
          })
          .setOrigin(0.5)
          .setVisible(false);

        // Add instructions
        // this.add.text(
        //   20,
        //   20,
        //   "Room 2 - Use WASD or Arrow Keys to move\nGet close to objects and press ENTER to interact",
        //   {
        //     fontSize: "16px",
        //     color: "#ffffff",
        //     backgroundColor: "#000000",
        //     padding: { x: 10, y: 10 },
        //   }
        // );
      }

      update() {
        // Player movement
        const speed = 160;

        if (this.cursors.left.isDown || this.wasd.A.isDown) {
          this.player.setVelocityX(-speed);
          this.player.setVelocityY(0);
          this.player.setTexture("player_left").setDisplaySize(40, 40);
        } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
          this.player.setVelocityX(speed);
          this.player.setVelocityY(0);
          this.player.setTexture("player_right");
        } else if (this.cursors.up.isDown || this.wasd.W.isDown) {
          this.player.setVelocityY(-speed);
          this.player.setVelocityX(0);
          this.player.setTexture("player_back");
        } else if (this.cursors.down.isDown || this.wasd.S.isDown) {
          this.player.setVelocityY(speed);
          this.player.setVelocityX(0);
          this.player.setTexture("player_front");
        } else {
          this.player.setVelocity(0);
        }

        // Check proximity to interactive objects
        let nearObject = null;
        const interactionDistance = 80;

        for (const obj of this.interactiveObjects) {
          const distance = Phaser.Math.Distance.Between(
            this.player.x,
            this.player.y,
            obj.sprite.x,
            obj.sprite.y
          );

          if (distance < interactionDistance) {
            nearObject = obj;
            break;
          }
        }

        // Show/hide interaction prompt
        if (nearObject) {
          // console.log(nearObject)
          this.interactionText.setText(
            `Press ENTER to interact with ${nearObject.type.toUpperCase()}`
          );
          this.interactionText.setVisible(true);

          // Check for Enter key press
          if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
            if (nearObject.content === "door") {
              this.scene.start("GameScene", { fromRoom: 2 });
            } else if (nearObject.content == "doorToRoom3") {
              this.scene.start("GameScene3", { fromRoom: 2 });
            } else {
              // console.log(nearObject)
              this.showModal(
                nearObject.title,
                nearObject.content,
                nearObject?.image
              );
            }
          }
        } else {
          this.interactionText.setVisible(false);
        }
      }

      private showModal(title: string, content: string, image: string) {
        console.log(image);
        // Dispatch custom event to React
        window.dispatchEvent(
          new CustomEvent("showGameModal", {
            detail: { title, content, image: image },
          })
        );
      }
    }

    class GameScene3 extends Phaser.Scene {
      private player!: Phaser.Physics.Arcade.Sprite;
      private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
      private wasd!: any;
      private enterKey!: Phaser.Input.Keyboard.Key;
      private interactiveObjects: Array<{
        sprite: Phaser.GameObjects.Image;
        type: string;
        title: string;
        content: string;
        image?: string;
      }> = [];
      private interactionText!: Phaser.GameObjects.Text;

      constructor() {
        super({ key: "GameScene3" });
      }

      create(data?: { fromRoom: number }) {
        // Add room 3 background
        const bg = this.add.image(200, 300, "background3");
        bg.setDisplaySize(1100, 700); // Stretch to fit canvas

        // Create walls (invisible collision bodies)
        const walls = this.physics.add.staticGroup();

        // Top wall
        walls.create(400, 100, null).setSize(800, 200).setVisible(false);
        // Bottom wall
        walls.create(400, 584, null).setSize(800, 32).setVisible(false);
        // Left wall
        walls.create(16, 300, null).setSize(32, 600).setVisible(false);
        // Right wall
        walls.create(784, 300, null).setSize(32, 600).setVisible(false);

        // Add door back to room 1
        const door = this.physics.add
          .staticSprite(100, 180, "door")
          .setDisplaySize(70, 110);
        door.refreshBody();
        // Add some different objects for room 2
        const pc2 = this.physics.add.staticSprite(600, 230, "portfolio-pc");
        pc2.setDisplaySize(70, 70);
        pc2.refreshBody();
        // const trophy2 = this.physics.add
        //   .staticSprite(400, 300, "trophy")
        //   .setDisplaySize(50, 50);
        // trophy2.refreshBody();
        const flowerpot1 = this.physics.add
          .staticSprite(620, 240, "flowerpot")
          .setDisplaySize(30, 40);
        const flowerpot2 = this.physics.add
          .staticSprite(620, 270, "flowerpot")
          .setDisplaySize(30, 40);
        const flowerpot3 = this.physics.add
          .staticSprite(620, 300, "flowerpot")
          .setDisplaySize(30, 40);
        const flowerpot4 = this.physics.add
          .staticSprite(50, 150, "flowerpot")
          .setDisplaySize(30, 40);
        const lamp1 = this.physics.add
          .staticSprite(240, 120, "lamp1")
          .setDisplaySize(80, 60);
        lamp1.refreshBody();
        const cupboard1 = this.physics.add
          .staticSprite(50, 350, "cupboard")
          .setDisplaySize(60, 60);
        cupboard1.refreshBody();
        const cupboard2 = this.physics.add
          .staticSprite(120, 350, "cupboard")
          .setDisplaySize(60, 60);
        cupboard2.refreshBody();
        const cupboard3 = this.physics.add
          .staticSprite(190, 350, "cupboard")
          .setDisplaySize(60, 60);
        cupboard3.refreshBody();
        const cupboard4 = this.physics.add
          .staticSprite(260, 350, "cupboard")
          .setDisplaySize(60, 60);
        cupboard4.refreshBody();
        const cupboard5 = this.physics.add
          .staticSprite(330, 350, "cupboard")
          .setDisplaySize(60, 60);
        cupboard5.refreshBody();
        const cupboard6 = this.physics.add
          .staticSprite(400, 350, "cupboard")
          .setDisplaySize(60, 60);
        cupboard6.refreshBody();
        const pokeball1 = this.physics.add
          .staticSprite(50, 330, "trophy")
          .setDisplaySize(30, 30);
        const pokeball2 = this.physics.add
          .staticSprite(120, 330, "trophy")
          .setDisplaySize(30, 30);
        const pokeball3 = this.physics.add
          .staticSprite(190, 330, "trophy")
          .setDisplaySize(30, 30);
        const pokeball4 = this.physics.add
          .staticSprite(260, 330, "trophy")
          .setDisplaySize(30, 30);
        const pokeball5 = this.physics.add
          .staticSprite(330, 330, "trophy")
          .setDisplaySize(30, 30);
        const pokeball6 = this.physics.add
          .staticSprite(400, 330, "trophy")
          .setDisplaySize(30, 30);
        const eevee = this.physics.add
          .staticSprite(470, 350, "eevee")
          .setDisplaySize(50, 50);
        eevee.refreshBody();
        const door2 = this.physics.add
          .staticSprite(470, 80, "door")
          .setDisplaySize(50, 70);
        door2.refreshBody();
        eevee.refreshBody();
        pokeball1.refreshBody();
        pokeball2.refreshBody();
        pokeball3.refreshBody();
        pokeball4.refreshBody();
        pokeball5.refreshBody();
        pokeball6.refreshBody();
        flowerpot1.refreshBody();
        flowerpot2.refreshBody();
        flowerpot3.refreshBody();
        flowerpot4.refreshBody();

        // Store interactive objects with their data
        this.interactiveObjects = [
          {
            sprite: door,
            type: "door",
            title: "Door to Room 2",
            content: "doorToRoom2",
          },
          {
            sprite: door2,
            type: "door",
            title: "Door to Room 4",
            content: "doorToRoom4",
          },
          {
            sprite: pc2,
            type: "pc",
            title: "Advanced Projects",
            content:
              "Advanced Projects:\n• AI-Powered Analytics\n• Blockchain Integration\n• Real-time Chat System\n• Machine Learning Models\n• Microservices Architecture",
          },
          {
            sprite: eevee,
            type: "pokemon",
            title: "This are my master skill ",
            content: "You can check each pokeball to know my master ability",
          },
          // {
          //   sprite: trophy2,
          //   type: "trophy",
          //   title: "Leadership",
          //   content:
          //     "🏆 Led development teams of 5+\n🏆 Mentored junior developers\n🏆 Architected scalable systems\n🏆 Delivered 20+ projects on time\n🏆 Tech talk speaker",
          // },
        ];

        // Create player
        if (data?.fromRoom === 3) {
          // Coming from room 2, place near the door
          this.player = this.physics.add.sprite(90, 230, "player_front");
          this.player.setDisplaySize(40, 40);
          this.player.refreshBody();
        } else {
          // Default position
          this.player = this.physics.add.sprite(300, 280, "player_right");
          this.player.setDisplaySize(40, 40);
          this.player.refreshBody();
        }
        this.player.setCollideWorldBounds(true);

        // Create object group for collisions for room 2
        const objectGroup = this.physics.add.staticGroup([
          door,
          pc2,
          flowerpot1,
          flowerpot2,
          flowerpot3,
          flowerpot4,
          cupboard1,
          cupboard2,
          cupboard3,
          cupboard4,
          cupboard5,
          cupboard6,
          eevee,
          door2,
        ]);

        // Player collisions with walls and objects
        this.physics.add.collider(this.player, walls);
        this.physics.add.collider(this.player, objectGroup);

        // Setup controls
        this.cursors = this.input.keyboard!.createCursorKeys();
        this.wasd = this.input.keyboard!.addKeys("W,S,A,D");
        this.enterKey = this.input.keyboard!.addKey(
          Phaser.Input.Keyboard.KeyCodes.ENTER
        );

        // Add interaction text (initially hidden)
        this.interactionText = this.add
          .text(400, 50, "", {
            fontSize: "18px",
            color: "#ffffff",
            backgroundColor: "#000000",
            padding: { x: 15, y: 10 },
            align: "center",
          })
          .setOrigin(0.5)
          .setVisible(false);

        // Add instructions
        // this.add.text(
        //   20,
        //   20,
        //   "Room 2 - Use WASD or Arrow Keys to move\nGet close to objects and press ENTER to interact",
        //   {
        //     fontSize: "16px",
        //     color: "#ffffff",
        //     backgroundColor: "#000000",
        //     padding: { x: 10, y: 10 },
        //   }
        // );
      }

      update() {
        // Player movement
        const speed = 160;

        if (this.cursors.left.isDown || this.wasd.A.isDown) {
          this.player.setVelocityX(-speed);
          this.player.setVelocityY(0);
          this.player.setTexture("player_left").setDisplaySize(40, 40);
        } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
          this.player.setVelocityX(speed);
          this.player.setVelocityY(0);
          this.player.setTexture("player_right").setDisplaySize(40, 40);
        } else if (this.cursors.up.isDown || this.wasd.W.isDown) {
          this.player.setVelocityY(-speed);
          this.player.setVelocityX(0);
          this.player.setTexture("player_back").setDisplaySize(40, 40);
        } else if (this.cursors.down.isDown || this.wasd.S.isDown) {
          this.player.setVelocityY(speed);
          this.player.setVelocityX(0);
          this.player.setTexture("player_front").setDisplaySize(40, 40);
        } else {
          this.player.setVelocity(0);
        }

        // Check proximity to interactive objects
        let nearObject = null;
        const interactionDistance = 80;

        for (const obj of this.interactiveObjects) {
          const distance = Phaser.Math.Distance.Between(
            this.player.x,
            this.player.y,
            obj.sprite.x,
            obj.sprite.y
          );

          if (distance < interactionDistance) {
            nearObject = obj;
            break;
          }
        }

        // Show/hide interaction prompt
        if (nearObject) {
          // console.log(nearObject)
          this.interactionText.setText(
            `Press ENTER to interact with ${nearObject.type.toUpperCase()}`
          );
          this.interactionText.setVisible(true);

          // Check for Enter key press
          if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
            if (nearObject.content === "doorToRoom2") {
              this.scene.start("GameScene2", { fromRoom: 3 });
            } else if (nearObject.content === "doorToRoom4") {
              this.scene.start("GameScene4", { fromRoom: 3 }); // 👈 go to room 3
            } else {
              this.showModal(
                nearObject.title,
                nearObject.content,
                nearObject?.image
              );
            }
          }
        } else {
          this.interactionText.setVisible(false);
        }
      }

      private showModal(title: string, content: string, image: string) {
        console.log(image);
        // Dispatch custom event to React
        window.dispatchEvent(
          new CustomEvent("showGameModal", {
            detail: { title, content, image: image },
          })
        );
      }
    }

    // Game configuration
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 650,
      height: 800,
      parent: gameRef.current,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: false,
        },
      },
      scene: [PreloadScene, GameScene, GameScene2, GameScene3],
    };

    // Create game instance
    phaserGameRef.current = new Phaser.Game(config);

    // Cleanup function
    return () => {
      if (phaserGameRef.current) {
        phaserGameRef.current.destroy(true);
        phaserGameRef.current = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-center">Portfolio Game</h1>
        <p className="text-muted-foreground text-center">
          Explore my skills and projects in this interactive world!
        </p>
      </div>
      <div
        ref={gameRef}
        className="border-2 border-border rounded-lg overflow-hidden shadow-lg"
        style={{ width: "650px", height: "600px" }}
      />
    </div>
  );
};

export default Game;
