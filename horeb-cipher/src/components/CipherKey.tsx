import React, { useState } from 'react'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'
import { AnimatePresence, motion } from "framer-motion";

type Props = {
    incrementKey: () => void;
    decrementKey: () => void;
    character: string;
}

const CipherKey = ({
    incrementKey,
    decrementKey,
    character,
}: Props) => {
    const [direction, setDirection] = useState<"up" | "down">("up");

    return (
        <div className="key">
            <div className="arrows">
                <div onMouseEnter={() => setDirection("up")} className="arrow" onClick={incrementKey}>
                    <HiChevronUp />
                </div>
                <div onMouseEnter={() => setDirection("down")} className="arrow" onClick={decrementKey}>
                    <HiChevronDown />
                </div>
            </div>
            <div className="cipher-char-group">
                <AnimatePresence>
                    <motion.p
                        key={character}
                        initial={{
                            y: direction === "up" ? 40 : -40
                        }}
                        animate={{
                            y: 0
                        }}
                        exit={{
                            y: direction === "up" ? -40 : 40
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                        }}
                    >{character}</motion.p>
                </AnimatePresence>
            </div>
        </div>
    )
}

export default CipherKey