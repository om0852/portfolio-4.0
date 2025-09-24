"use client";
import { useEffect, useRef } from "react";
import * as Phaser from "phaser";
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
        this.load.image("background4", "/background/bg4.png");

        //pokemon
        this.load.image("chansey", "/pokemon/chansey.gif");
        this.load.image("bulbizarre", "/pokemon/bulbizarre.gif");
        this.load.image("pikachu", "/pokemon/pikachu.gif");
        this.load.image("politoed", "/pokemon/politoed.gif");
        this.load.image("turtwig", "/pokemon/turtwig.gif");

        //social media icon
        this.load.image("github", "/githubicon.png");
        this.load.image("instagram", "/instagramicon.png");
        this.load.image("whatsapp", "/whatsappicon.png");
        this.load.image("leetcode", "/leetcodeicon.png");
        this.load.image("linkedin", "/linkedinicon.png");

        //objects
        this.load.image("telephonebooth", "/telephonebooth.png");
        this.load.image("portfolio-pc", "/pokemon-pc.png");
        this.load.image("portfolio-bed", "/pokemon-bed.png");
        this.load.image("photoframe", "/photoframe.png");
        this.load.image("photoframe2", "/photoframe2.png");
        this.load.image("photoframe3", "/photoframe3.png");
        this.load.image("mirror", "/mirror.png");
        this.load.image("plant2", "/plant2.png");
        this.load.image("door", "/door.png");
        this.load.image("snorlax-rightside", "/snorlax-rightside.png");
        this.load.image("omsalunke", "/omsalunke.jpg");
        this.load.image("sidelamp", "/sidelamp.png");
        this.load.image("lamp1", "/lamp1.png");
        this.load.image("lamp2", "/lamp2.png");
        this.load.image("chair1", "/chair1.png");
        this.load.image("chair2", "/chair2.png");
        this.load.image("table1", "/table1.png");
        this.load.image("table2", "/table2.png");
        this.load.image("tablefan", "/tablepan.png");
        this.load.image("telephone", "/telephone.png");
        this.load.image("eggtoy", "/eggtoy.png");
        this.load.image("bookstack", "/books.png");
        this.load.image("trophy", "/tropy.png");
        this.load.image("trophy2", "/trophy2.png");
        this.load.image("smallsofa", "/smallsofa.png");
        this.load.image("smalllamp", "/smalllamp.png");
        this.load.image("eevee", "/eevee.png");
        this.load.image("flowerpot", "/flowerpot.png");
        // this.load.image("flowerpot2", "/flowerpot2.png");
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

        //room 1 text

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
        let door1Name = this.add.text(460, 60, "skills", {
          color: "#fff",
          fontSize: "12px",
          backgroundColor: "#000",
        });
        let pcName = this.add.text(10, 60, "My Projects", {
          color: "#000",
        });
        let pcDirection = this.add.text(30, 80, "⬇️⬇️", {
          color: "#000",
        });

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
          .text(130, 10, "", {
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
        const data = { title, content,image,socialLink:"hiii" };
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
        walls.create(400, 20, null).setSize(800, 120).setVisible(false);
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
        const label = this.add.text(100, 100, "Hello World!", {
          fontSize: "30px",
          fontStyle: "bolder",
          color: "#000000",
          fontFamily: "Arial",
        });

        // If you want to move or update it later
        label.setText("My Skill..");
        label.setPosition(280, 50);
        const flowerpot1 = this.physics.add
          .staticSprite(620, 440, "flowerpot")
          .setDisplaySize(30, 40);
        const flowerpot2 = this.physics.add
          .staticSprite(620, 480, "flowerpot")
          .setDisplaySize(30, 40);
        const flowerpot3 = this.physics.add
          .staticSprite(620, 520, "flowerpot")
          .setDisplaySize(30, 40);
        const flowerpot4 = this.physics.add
          .staticSprite(30, 150, "flowerpot")
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
          .staticSprite(150, 350, "cupboard")
          .setDisplaySize(60, 60);
        cupboard2.refreshBody();
        const cupboard3 = this.physics.add
          .staticSprite(250, 350, "cupboard")
          .setDisplaySize(60, 60);
        cupboard3.refreshBody();
        const cupboard4 = this.physics.add
          .staticSprite(350, 350, "cupboard")
          .setDisplaySize(60, 60);
        cupboard4.refreshBody();
        const cupboard5 = this.physics.add
          .staticSprite(450, 350, "cupboard")
          .setDisplaySize(60, 60);
        cupboard5.refreshBody();
        const cupboard6 = this.physics.add
          .staticSprite(550, 350, "cupboard")
          .setDisplaySize(60, 60);
        cupboard6.refreshBody();
        const pokeball1 = this.physics.add
          .staticSprite(50, 330, "pokeball")
          .setDisplaySize(30, 30);
        const pokeball2 = this.physics.add
          .staticSprite(150, 330, "pokeball")
          .setDisplaySize(30, 30);
        const pokeball3 = this.physics.add
          .staticSprite(250, 330, "pokeball")
          .setDisplaySize(30, 30);
        const pokeball4 = this.physics.add
          .staticSprite(350, 330, "pokeball")
          .setDisplaySize(30, 30);
        const pokeball5 = this.physics.add
          .staticSprite(450, 330, "pokeball")
          .setDisplaySize(30, 30);
        const pokeball6 = this.physics.add
          .staticSprite(550, 330, "pokeball")
          .setDisplaySize(30, 30);
        const eevee = this.physics.add
          .staticSprite(50, 220, "eevee")
          .setDisplaySize(40, 40);
        eevee.refreshBody();
        const door2 = this.physics.add
          .staticSprite(470, 580, "door")
          .setDisplaySize(60, 5);
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

        //text for room 2
        this.add
          .text(470, 460, "Acheivements", {
            color: "#000",
          })
          .setAngle(90);
        this.add
          .text(450, 480, "->", {
            color: "#000",
          })
          .setAngle(90);
        this.add
          .text(450, 540, "->", {
            color: "#000",
          })
          .setAngle(90);

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
          {
            sprite: pokeball1,
            type: "pokeball",
            title: "React & Next.js",
            content:
              "expert in React.js ecosystem with tools like Redux and Zustand, and building modern SSR apps with Next.js",
          },

          {
            sprite: pokeball2,
            type: "pokeball",
            title: "Backend Development",
            content:
              "proficient in Node.js, Express.js, and efficient API design for scalable applications",
          },

          {
            sprite: pokeball3,
            type: "pokeball",
            title: "Blockchain & Solidity",
            content:
              "skilled in blockchain development and writing smart contracts using Solidity",
          },

          {
            sprite: pokeball4,
            type: "pokeball",
            title: "UI/UX & Styling",
            content:
              "experienced in user experience design and frontend styling using Tailwind CSS, Sass, and pure CSS",
          },

          {
            sprite: pokeball5,
            type: "pokeball",
            title: "Databases",
            content:
              "expert in SQL (MySQL, PostgreSQL, Oracle) and NoSQL solutions (MongoDB, Redis) for data management",
          },

          {
            sprite: pokeball6,
            type: "pokeball",
            title: "Mobile Development",
            content:
              "proficient in building cross-platform apps using React Native",
          },
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
          .text(130, 10, "", {
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
          .staticSprite(100, 170, "door")
          .setDisplaySize(70, 100);
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
          .staticSprite(620, 400, "plant2")
          .setDisplaySize(30, 40);
        const flowerpot2 = this.physics.add
          .staticSprite(620, 480, "flowerpot")
          .setDisplaySize(30, 40);
        const flowerpot3 = this.physics.add
          .staticSprite(620, 540, "plant2")
          .setDisplaySize(30, 40);
        const flowerpot5 = this.physics.add
          .staticSprite(620, 620, "flowerpot")
          .setDisplaySize(30, 40);
        const flowerpot4 = this.physics.add
          .staticSprite(30, 210, "flowerpot")
          .setDisplaySize(30, 40);
        const flowerpot6 = this.physics.add
          .staticSprite(60, 210, "flowerpot")
          .setDisplaySize(30, 40);
        const photoframe = this.physics.add
          .staticSprite(240, 150, "photoframe2")
          .setDisplaySize(50, 50);
        photoframe.refreshBody();
        const tablefan = this.physics.add
          .staticSprite(350, 200, "tablefan")
          .setDisplaySize(50, 60);
        tablefan.refreshBody();
        const cupboard1 = this.physics.add
          .staticSprite(60, 350, "cupboard")
          .setDisplaySize(60, 60);
        cupboard1.refreshBody();
        const cupboard2 = this.physics.add
          .staticSprite(60, 550, "cupboard")
          .setDisplaySize(60, 60);
        cupboard2.refreshBody();
        const cupboard3 = this.physics.add
          .staticSprite(180, 350, "cupboard")
          .setDisplaySize(60, 60);
        cupboard3.refreshBody();
        const cupboard4 = this.physics.add
          .staticSprite(180, 550, "cupboard")
          .setDisplaySize(60, 60);
        cupboard4.refreshBody();
        const cupboard5 = this.physics.add
          .staticSprite(300, 350, "cupboard")
          .setDisplaySize(60, 60);
        cupboard5.refreshBody();
        const cupboard6 = this.physics.add
          .staticSprite(300, 550, "cupboard")
          .setDisplaySize(60, 60);
        cupboard6.refreshBody();
        const pokeball1 = this.physics.add
          .staticSprite(60, 330, "trophy")
          .setDisplaySize(30, 30);
        const pokeball2 = this.physics.add
          .staticSprite(60, 530, "trophy")
          .setDisplaySize(30, 30);
        const pokeball3 = this.physics.add
          .staticSprite(180, 330, "trophy")
          .setDisplaySize(30, 30);
        const pokeball4 = this.physics.add
          .staticSprite(180, 530, "trophy")
          .setDisplaySize(30, 30);
        const pokeball5 = this.physics.add
          .staticSprite(300, 330, "trophy")
          .setDisplaySize(30, 30);
        const pokeball6 = this.physics.add
          .staticSprite(300, 530, "trophy")
          .setDisplaySize(30, 30);
        const eevee = this.physics.add
          .staticSprite(20, 440, "turtwig")
          .setDisplaySize(50, 40);
        eevee.refreshBody();
        const door2 = this.physics.add
          .staticSprite(470, 170, "door")
          .setDisplaySize(80, 100);
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
        flowerpot5.refreshBody();
        flowerpot6.refreshBody();

        //text for room3
        this.add.text(80, 140, "Skills", {
          color: "#fff",
          backgroundColor: "#000",
          fontSize: "12px",
        });
        this.add.text(440, 140, "Contact\nMe", {
          color: "#fff",
          align: "center",
          backgroundColor: "#000",
          fontSize: "12px",
        });

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
          .text(130, 10, "", {
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
    class GameScene4 extends Phaser.Scene {
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
        super({ key: "GameScene4" });
      }

      create(data?: { fromRoom: number }) {
        // Add room 3 background
        const bg = this.add.image(200, 300, "background4");
        bg.setDisplaySize(1100, 700); // Stretch to fit canvas

        // Create walls (invisible collision bodies)
        const walls = this.physics.add.staticGroup();

        // Top wall
        walls.create(400, 18, null).setSize(800, 200).setVisible(false);
        // Bottom wall
        walls.create(400, 584, null).setSize(800, 32).setVisible(false);
        // Left wall
        walls.create(16, 300, null).setSize(32, 600).setVisible(false);
        // Right wall
        walls.create(784, 300, null).setSize(32, 600).setVisible(false);

        // Add door back to room 1
        const door = this.physics.add
          .staticSprite(100, 80, "door")
          .setDisplaySize(70, 100);
        door.refreshBody();
        // Add some different objects for room 2
        const pc2 = this.physics.add.staticSprite(600, 120, "portfolio-pc");
        pc2.setDisplaySize(70, 70);
        pc2.refreshBody();
        // const trophy2 = this.physics.add
        //   .staticSprite(400, 300, "trophy")
        //   .setDisplaySize(50, 50);
        // trophy2.refreshBody();
        const flowerpot1 = this.physics.add
          .staticSprite(620, 400, "plant2")
          .setDisplaySize(30, 40);
        const flowerpot2 = this.physics.add
          .staticSprite(620, 480, "flowerpot")
          .setDisplaySize(30, 40);
        const flowerpot3 = this.physics.add
          .staticSprite(620, 540, "plant2")
          .setDisplaySize(30, 40);
        const flowerpot5 = this.physics.add
          .staticSprite(620, 620, "flowerpot")
          .setDisplaySize(30, 40);
        const flowerpot4 = this.physics.add
          .staticSprite(30, 210, "flowerpot")
          .setDisplaySize(30, 40);
        const flowerpot6 = this.physics.add
          .staticSprite(60, 210, "flowerpot")
          .setDisplaySize(30, 40);
        const photoframe = this.physics.add
          .staticSprite(240, 40, "photoframe2")
          .setDisplaySize(50, 50);
        photoframe.refreshBody();
        const tablefan = this.physics.add
          .staticSprite(350, 120, "telephonebooth")
          .setDisplaySize(50, 70);
        tablefan.refreshBody();
        const cupboard1 = this.physics.add
          .staticSprite(60, 350, "leetcode")
          .setDisplaySize(60, 60);
        cupboard1.refreshBody();
        const cupboard2 = this.physics.add
          .staticSprite(60, 500, "github")
          .setDisplaySize(60, 60);
        cupboard2.refreshBody();
        const cupboard3 = this.physics.add
          .staticSprite(180, 350, "linkedin")
          .setDisplaySize(60, 60);
        cupboard3.refreshBody();
        const cupboard4 = this.physics.add
          .staticSprite(180, 500, "whatsapp")
          .setDisplaySize(60, 60);
        cupboard4.refreshBody();
        const cupboard5 = this.physics.add
          .staticSprite(300, 350, "instagram")
          .setDisplaySize(60, 60);
        cupboard5.refreshBody();
        const eevee = this.physics.add
          .staticSprite(20, 120, "chansey")
          .setDisplaySize(50, 40);
        eevee.refreshBody();
        const door2 = this.physics.add
          .staticSprite(470, 80, "door")
          .setDisplaySize(80, 100);
        door2.refreshBody();
        eevee.refreshBody();

        flowerpot1.refreshBody();
        flowerpot2.refreshBody();
        flowerpot3.refreshBody();
        flowerpot4.refreshBody();
        flowerpot5.refreshBody();
        flowerpot6.refreshBody();

        //text for room4
        this.add.text(90, 60, "Back", {
          color: "#fff",
          backgroundColor: "#000",
          fontSize: "12px",
          align: "center",
        });
        this.add.text(460, 60, "Home", {
          color: "#fff",
          align: "center",
          backgroundColor: "#000",
          fontSize: "12px",
        });

        // Store interactive objects with their data
        this.interactiveObjects = [
          {
            sprite: door,
            type: "door",
            title: "Door to Room 3",
            content: "doorToRoom3",
          },
          {
            sprite: door2,
            type: "door",
            title: "Door to Room 1",
            content: "doorToRoom1",
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
        if (data?.fromRoom === 4) {
          // Coming from room 3, place near the door
          this.player = this.physics.add.sprite(50, 120, "player_front");
          this.player.setDisplaySize(40, 40);
          this.player.refreshBody();
        } else {
          // Default position
          this.player = this.physics.add.sprite(50, 120, "player_right");
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
          .text(130, 10, "", {
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
            if (nearObject.content === "doorToRoom3") {
              this.scene.start("GameScene3", { fromRoom: 4 });
            } else if (nearObject.content === "doorToRoom1") {
              this.scene.start("GameScene", { fromRoom: 4 }); // 👈 go to room 1
            } else {
              this.showModal(
                nearObject.title,
                nearObject.content,
                "image",
                "helloomm"
              );
            }
          }
        } else {
          this.interactionText.setVisible(false);
        }
      }

      private showModal(
        title: string,
        content: string,
        image: string,
        socialLink: string
      ) {
        console.log(image);
        // Dispatch custom event to React
        window.dispatchEvent(
          new CustomEvent("showGameModal", {
            detail: { title, content, image: image, socialLink },
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
      scene: [PreloadScene, GameScene, GameScene2, GameScene3, GameScene4],
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
