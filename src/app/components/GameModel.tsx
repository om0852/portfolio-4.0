"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import Image from "next/image";

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  image?:string;
 }

const GameModal = ({
  isOpen,
  onClose,
  title,
  content,
  image,
  ...props
}: GameModalProps) => {
  console.log(image,title,content,props)
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="whitespace-pre-line text-base">
          {content}
          {title=="Profile Image" && <Image src={"/omsalunke.jpg"} className="mx-auto" width={400} height={300}  alt="" />}{" "}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export const useGameModal = () => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "",
    content: "",
  });

  useEffect(() => {
    const handleShowModal = (event: CustomEvent) => {
      const { title, content } = event.detail;
      setModalState({
        isOpen: true,
        title,
        content,
      });
    };

    window.addEventListener("showGameModal", handleShowModal as EventListener);

    return () => {
      window.removeEventListener(
        "showGameModal",
        handleShowModal as EventListener
      );
    };
  }, []);

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return {
    modalState,
    closeModal,
  };
};

export default GameModal;
