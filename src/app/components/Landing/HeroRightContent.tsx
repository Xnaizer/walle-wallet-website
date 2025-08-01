// HeroRightContent.tsx
import React, { useCallback } from "react";
import { motion, Variants, PanInfo } from "framer-motion";
import CardDisplay from "../utils/CardDisplay";

interface HeroRightContentProps {
  itemVariants: Variants;
  cardPosition: { x: number; y: number };
  setCardPosition: (position: { x: number; y: number }) => void;
  isDragging: boolean;
  setIsDragging: (dragging: boolean) => void;
  isCardNearTarget: boolean;
  setIsCardNearTarget: (near: boolean) => void;
  setShowPaymentSuccess: (show: boolean) => void;
}

export default function HeroRightContent({
  itemVariants,
  cardPosition,
  setCardPosition,
  isDragging,
  setIsDragging,
  isCardNearTarget,
  setIsCardNearTarget,
  setShowPaymentSuccess
}: HeroRightContentProps) {


  const handleCardDragStart = useCallback(() => {
    setIsDragging(true);
  }, [setIsDragging]);

  const handleCardDrag = useCallback((event: any, info: PanInfo) => {
    const newX = info.offset.x;
    const newY = info.offset.y;
    const distance = Math.sqrt(Math.pow(newX + 150, 2) + Math.pow(newY, 2));
    const isNear = distance < 80;
    
    setIsCardNearTarget(isNear);
   
    setCardPosition({ x: newX, y: newY });
  }, [setIsCardNearTarget, setCardPosition]);

  const handleCardDragEnd = useCallback((event: any, info: PanInfo) => {
    setIsDragging(false);
    const newX = info.offset.x;
    const newY = info.offset.y;
    

    const distance = Math.sqrt(Math.pow(newX + 150, 2) + Math.pow(newY, 2));
    
    if (distance < 80) {
     
      setShowPaymentSuccess(true);
      setCardPosition({ x: -150, y: 0 }); 
      
      setTimeout(() => {
        setShowPaymentSuccess(false);
        setCardPosition({ x: 0, y: 0 }); 
        setIsCardNearTarget(false);
      }, 3000);
    } else {
      
      setCardPosition({ x: 0, y: 0 });
      setIsCardNearTarget(false);
    }
  }, [setIsDragging, setShowPaymentSuccess, setCardPosition, setIsCardNearTarget]);

  return (
    <motion.div 
      variants={itemVariants}
      className=" flex justify-end lg:justify-end items-center relative min-h-[500px]"
    >
 
      <motion.div
        className={`absolute top-[180px] right-[420px] z-10 bg-white border-2 rounded-xl p-4 text-center transition-all duration-300 ${
          isCardNearTarget 
            ? 'border-green-400 bg-green-50 shadow-lg' 
            : 'border-neutral-200 shadow-sm'
        }`}
        animate={{
          scale: isCardNearTarget ? 1.1 : 1,
          boxShadow: isCardNearTarget 
            ? '0 10px 25px -5px rgba(34, 197, 94, 0.3)' 
            : '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}
        transition={{ 
          duration: 0.3,
          ease: "easeOut"
        }}
      >
        <motion.div
          className="text-2xl mb-1"
          transition={{ 
            duration: 0.2,
            ease: "easeOut"
          }}
        >
          {isCardNearTarget ? '💳' : '💰'}
        </motion.div>
        <span className={`text-xs font-semibold transition-colors duration-200 ${
          isCardNearTarget ? 'text-green-600' : 'text-neutral-500'
        }`}>
          {isCardNearTarget ? 'Release!' : 'Payment'}
        </span>
        
   
        {isCardNearTarget && (
          <motion.div
            className="absolute inset-0  border-2 border-green-400 rounded-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.div>

      
      <motion.div
        className="absolute inset-0 bg-primary-200/20 rounded-3xl -z-10 pointer-events-none"
        animate={{
          opacity: isDragging ? 0.6 : (isCardNearTarget ? 0.4 : 0.2),
          scale: isDragging ? 1.1 : (isCardNearTarget ? 1.05 : 1),
        }}
        transition={{ 
          duration: 0.4,
          ease: "easeOut"
        }}
      />

     
      <motion.div
        className={`w-[350px]  flex  ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} z-20 relative`}
        drag
        dragConstraints={{ left: -5000, right: 5000, top: -500, bottom: 5000 }}
        dragElastic={0.05} 
        dragMomentum={false} 
        onDragStart={handleCardDragStart}
        onDrag={handleCardDrag}
        onDragEnd={handleCardDragEnd}
        animate={{ 
          x: cardPosition.x,
          y: cardPosition.y,
          scale: isCardNearTarget ? 1.02 : (isDragging ? 1.05 : 1),
          rotate: isDragging ? 2 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400, 
          damping: 40,    
          mass: 0.8,     
        }}
        whileHover={{ 
          scale: isDragging ? 1.05 : 1.02,
          transition: { 
            duration: 0.2,
            ease: "easeOut"
          }
        }}
        whileDrag={{ 
          scale: 1.05,
          rotate: 3,
          zIndex: 100,
          transition: {
            type: "spring",
            stiffness: 600,
            damping: 50
          }
        }}
      
        layout
        layoutId="draggable-card"
      >
        <CardDisplay />
      </motion.div>
      

    </motion.div>
  );
}