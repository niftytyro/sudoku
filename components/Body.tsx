"use client";

import { EndGameModal, RulesModal } from "@/components/Modal";
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
    isOpen: isEndGameModalOpen,
    onClose: closeEndGameModa,
    onOpen: openEndGameModa,
  } = useModal();

  const onEndGame = useCallback(() => {
    stopTimer();
    openEndGameModa();
  }, [stopTimer, openEndGameModa]);

  return (
    <>
      <RulesModal
        isOpen={isRulesModalOpen}
        onClose={closeRulesModal}
        onOpen={openRulesModal}
      />
      <EndGameModal
        isOpen={isEndGameModalOpen}
        onClose={closeEndGameModa}
        onOpen={openEndGameModa}
        time={time}
      />

      <section className="flex justify-center h-full">
        <div className="flex-1" />
        <SudokuContainer grid={grid} onEndGame={onEndGame} />
        <SideBar showRulesModal={openRulesModal} time={time} />
      </section>
    </>
  );
};

export default Body;
