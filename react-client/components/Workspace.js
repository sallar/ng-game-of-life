import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import styled from "styled-components";
import { useGame } from "../utils/game";
import { setCanvasSize, drawGrid, drawCells } from "../utils/canvas";
import { stats } from "../utils/stats";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr 50px;
`;

const CanvasContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Toolbar = styled.div`
  background-color: #f9f9f9;
  border-top: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default () => {
  const [isPlaying, setPlaying] = useState(false);
  const canvasRef = useRef(null);
  const { width, height, getCells, tick } = useGame();

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    setCanvasSize(canvas, width, height);
    drawGrid(canvas, width, height);
    drawCells(canvas, width, height, getCells());
  }, [canvasRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    let raf;
    console.log(isPlaying, raf);
    const loop = () => {
      stats.begin();
      tick();
      drawGrid(canvas, width, height);
      drawCells(canvas, width, height, getCells());
      stats.end();
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
    };
  }, [canvasRef, isPlaying]);

  return (
    <Container>
      <CanvasContainer>
        <canvas ref={canvasRef} />
      </CanvasContainer>
      <Toolbar>
        <button type="button" onClick={() => setPlaying(!isPlaying)}>
          Play {isPlaying ? "true" : "false"}
        </button>
      </Toolbar>
    </Container>
  );
};
