"use client";

import { GameFinishedModal, RulesModal } from "@/components/Modal";
import SideBar from "@/components/SideBar";
import SudokuContainer from "@/components/SudokuContainer";
import useModal from "@/hooks/useModal";
import useTimer from "@/hooks/useTimer";
import React, { useCallback, useEffect } from "react";

interface BodyProps {
  grid: string;
}

const Body: React.FC<BodyProps> = ({ grid }) => {
  const { time, stopTimer } = useTimer();

  const {
    isOpen: isRulesModalOpen,
    onClose: closeRulesModal,
    onOpen: openRulesModal,
  } = useModal();
  const {
    isOpen: isGameFinishedModalOpen,
    onClose: closeGameFinishedModal,
    onOpen: openGameFinishedModal,
  } = useModal();

  const onGameFinish = useCallback(() => {
    stopTimer();
    openGameFinishedModal();
  }, [stopTimer, openGameFinishedModal]);

  return (
    <>
      <RulesModal
        isOpen={isRulesModalOpen}
        onClose={closeRulesModal}
        onOpen={openRulesModal}
      />
      <GameFinishedModal
        isOpen={isGameFinishedModalOpen}
        onClose={closeGameFinishedModal}
        onOpen={openGameFinishedModal}
        time={time}
      />

      <section className="flex justify-center h-full">
        <div className="flex-1" />
        <SudokuContainer grid={grid} onGameFinish={onGameFinish} />
        <SideBar showRulesModal={openRulesModal} time={time} />
      </section>
    </>
  );
};

export default Body;
