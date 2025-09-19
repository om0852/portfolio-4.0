"use client"
import Game from '../app/components/GameLayout';
import GameModal, { useGameModal } from '../app/components/GameModel';

const GamePage = () => {
  const { modalState, closeModal } = useGameModal();

  return (
    <>
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