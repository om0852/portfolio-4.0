"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  image?: string;
  socialLink?:string
}

const GameModal = ({
  isOpen,
  onClose,
  title,
  content,
  image,
  ...props
}: GameModalProps) => {
  if (!isOpen) return null;
  console.log("Hii")
  useEffect(()=>{
      console.log(image, title, content, props);
  
  },[title])

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div 
          className="relative w-full max-w-md animate-in fade-in zoom-in-95"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Main Dialog Box with Pokemon FireRed Style */}
          <div 
            className="relative bg-white rounded-lg p-1"
            style={{
              backgroundColor: '#f8f8f8',
              boxShadow: '0 0 0 2px #000000, 0 0 0 4px #6890f0, 0 0 0 6px #000000',
              imageRendering: 'pixelated',
            }}
          >
            {/* Inner Blue Box */}
            <div 
              className="relative p-6 rounded"
              style={{
                backgroundColor: '#6890f0',
                border: '2px solid #000000',
                boxShadow: 'inset 0 0 0 2px #7898f8',
              }}
            >
              {/* White Content Box */}
              <div 
                className="bg-white rounded p-4"
                style={{
                  backgroundColor: '#f8f8f8',
                  border: '2px solid #000000',
                  boxShadow: 'inset 0 0 0 1px #b8b8b8',
                  fontFamily: '"Courier New", monospace',
                }}
              >
                {/* Title Section */}
                {title && (
                  <div 
                    className="mb-3 pb-2"
                    style={{
                      borderBottom: '2px solid #000000',
                    }}
                  >
                    <h2 
                      className="text-lg font-bold uppercase tracking-wider"
                      style={{
                        color: '#000000',
                        textShadow: '1px 1px 0 #d8d8d8',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {title}
                    </h2>
                  </div>
                )}

                {/* Content Section */}
                <div 
                  className="text-sm leading-relaxed whitespace-pre-line"
                  style={{
                    color: '#000000',
                    lineHeight: '1.6',
                  }}
                >
                  {content}
                </div>

                {/* Image Section */}
                {(title === "Profile Image" || image) && (
                  <div className="mt-4 flex justify-center">
                    <div 
                      className="relative"
                      style={{
                        border: '2px solid #000000',
                        padding: '4px',
                        backgroundColor: '#ffffff',
                        boxShadow: '2px 2px 0 #585858',
                      }}
                    >
                      <Image 
                        src={image || "/omsalunke.jpg"} 
                        className="block"
                        width={300} 
                        height={225}  
                        alt="" 
                        style={{
                          imageRendering: 'auto',
                          maxWidth: '100%',
                          height: 'auto',
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Action Button (A to continue) */}
                <div className="mt-4 flex justify-end items-center gap-2">
                     <span 
                    className="text-xs uppercase"
                    style={{
                      color: '#585858',
                      fontWeight: 'bold',
                    }}
                  >
                    Visit
                  </span>
                  <span 
                    className="text-xs uppercase"
                    style={{
                      color: '#585858',
                      fontWeight: 'bold',
                    }}
                  >
                    Press
                  </span>
                  <button
                    onClick={onClose}
                    className="px-3 py-1 text-xs font-bold uppercase transition-transform hover:scale-105 active:scale-95"
                    style={{
                      backgroundColor: '#e85858',
                      color: '#ffffff',
                      border: '2px solid #000000',
                      borderRadius: '4px',
                      boxShadow: '2px 2px 0 #000000',
                      letterSpacing: '0.05em',
                    }}
                    onMouseDown={(e) => {
                      e.currentTarget.style.boxShadow = '1px 1px 0 #000000';
                      e.currentTarget.style.transform = 'translate(1px, 1px)';
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.boxShadow = '2px 2px 0 #000000';
                      e.currentTarget.style.transform = 'translate(0, 0)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '2px 2px 0 #000000';
                      e.currentTarget.style.transform = 'translate(0, 0)';
                    }}
                  >
                    A
                  </button>
                  <span 
                    className="text-xs uppercase"
                    style={{
                      color: '#585858',
                      fontWeight: 'bold',
                    }}
                  >
                    to close
                  </span>
                </div>
              </div>

              {/* Corner Decorations (Pokemon-style corners) */}
              <div 
                className="absolute top-0 left-0 w-2 h-2"
                style={{
                  backgroundColor: '#000000',
                  clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                }}
              />
              <div 
                className="absolute top-0 right-0 w-2 h-2"
                style={{
                  backgroundColor: '#000000',
                  clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
                }}
              />
              <div 
                className="absolute bottom-0 left-0 w-2 h-2"
                style={{
                  backgroundColor: '#000000',
                  clipPath: 'polygon(0 0, 0 100%, 100% 100%)',
                }}
              />
              <div 
                className="absolute bottom-0 right-0 w-2 h-2"
                style={{
                  backgroundColor: '#000000',
                  clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                }}
              />
            </div>
          </div>

          {/* Animated Arrow (pointing down like in Pokemon) */}
          <div 
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 animate-bounce"
            style={{
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '8px solid #000000',
            }}
          />
        </div>
      </div>

      {/* Global styles for pixelated font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        
        .pokemon-text {
          font-family: 'Press Start 2P', cursive;
          -webkit-font-smoothing: none;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </>
  );
};

export const useGameModal = () => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "",
    content: "",
    image:"",
    socialLink:""
  });

  useEffect(() => {
    const handleShowModal = (event: CustomEvent) => {
      console.log(event.detail)
      const { title, content,image,socialLink } = event.detail;
      setModalState({
        isOpen: true,
        title,
        content:"omsaunkeklcndn",
        image:"omsalunke",
        socialLink:socialLink
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