import { render } from "react-dom";
import React, { useRef, useEffect, useState } from "react";
import InputManager from "./InputManager.js";

import "./App.css";
import Player from "./Player.js";
import World from "./World.js";

const ReactRogue = ({ width, height, tilesize }) => {
  const canvasRef = React.useRef();

  //  const [player,setPlayer] = useState(new Player(1,2,tilesize));
  const [world, setWorld] = useState(new World(width, height, tilesize));

  let inputManager = new InputManager();
  const handleInput = (action, data) => {
    //  console.log(`handle input : ${action} : ${JSON.stringify(data)}`);
    //let newPlayer = new Player();
    let newWorld = new World();

    // console.log("↓world");
    //  console.log(world);

    //console.log("↓newWorld");
    // console.log(newWorld);

    Object.assign(newWorld, world);
    //   newWorld = world;

    //  console.log("↓newWorld更新後");
    // console.log(newWorld);

    newWorld.movePlayer(data.x, data.y);
    setWorld(newWorld);

    //  setPlayer(newPlayer);
  };

  useEffect(() => {
    //   console.log('create map');
    let newWorld = new World();
    Object.assign(newWorld, world);
    newWorld.createCellularMap();
    newWorld.moveToSpace(world.player);

    setWorld(newWorld);
  }, []);

  useEffect(() => {
    //   console.log('Bind input');
    inputManager.bindKeys();
    inputManager.subscribe(handleInput);
    return () => {
      inputManager.unbindKeys();
      inputManager.unsubscribe(handleInput);
    };
  });

  useEffect(() => {
    //   console.log("Draw to canvas");
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, width * tilesize, height * tilesize);
    world.draw(ctx);
    //  player.draw(ctx);
  });

  return (
    <div>
      <canvas
        className="canvas"
        ref={canvasRef}
        width={width * tilesize}
        height={height * tilesize}
        style={{ border: "1px solid black" }}
      ></canvas>
    </div>
  );
};

export default ReactRogue;
