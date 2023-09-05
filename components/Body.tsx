"use client";

import { EndGameModal, RulesModal } from "@/components/Modal";
import Options from "@/components/Options";
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

      <section className="flex flex-col-reverse xl:flex-row justify-center max-w-2xl mx-auto xl:max-w-none h-full">
        <div className="flex-1 hidden xl:block" />
        <SudokuContainer grid={grid} onEndGame={onEndGame} />
        <Options time={time} />
      </section>

      {/* Footer */}
      <footer className="flex justify-center items-center font-medium text-darkGray space-x-2">
        <p className="text-xs md:text-sm">Made with ❤️ for Mobbin</p>
        <span className="text-xs md:text-sm">•</span>
        <div
          className="cursor-pointer underline text-xs md:text-sm"
          onClick={openRulesModal}
        >
          How to play?
        </div>
      </footer>
    </>
  );
};

export default Body;
