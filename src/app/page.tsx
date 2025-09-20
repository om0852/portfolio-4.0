"use client"
import Image from 'next/image';
import Game from '../app/components/GameLayout';
import GameModal, { useGameModal } from '../app/components/GameModel';

const GamePage = () => {
  const { modalState, closeModal } = useGameModal();

  return (
    <>
    {/* <Image src={"/omsalunke.jpg"} alt='' width={100} height={100}/> */}
      <Game />
      <GameModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
        content={modalState.content}
      />
    </>
  );
};

export default GamePage;