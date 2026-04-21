"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface TestimonialCardProps {
  id: string;
  logo: ReactNode;
  companyName: string;
  category: string;
  quote: string;
  author?: string;
  role?: string;
  isExpanded: boolean;
  isHighlight?: boolean;
  onHover: () => void;
  onClick: () => void;
}

export function TestimonialCard({
  logo,
  companyName,
  category,
  quote,
  author,
  role,
  isExpanded,
  isHighlight,
  onHover,
  onClick,
}: TestimonialCardProps) {
  const expandTransition = {
    type: "spring" as const,
    stiffness: 170,
    damping: 22,
    mass: 1,
  };

  const revealEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  // Variants for staggered entrance
  const cardVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: isHighlight ? 0.55 : 0.45,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={onHover}
      onClick={onClick}
      layout
      className={`relative cursor-pointer overflow-hidden border-zinc-800 bg-black 
        border border-white/10 rounded-none bg-zinc-950/90 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur
        md:rounded-none md:border-y md:border-l md:border-zinc-800 first:md:border-l-0
        flex flex-col w-full group`}
      animate={{
        flex: isExpanded ? 2.2 : 1,
        borderColor: isExpanded ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)",
        backgroundColor: isExpanded ? "rgba(10,10,10,0.98)" : "rgba(5,5,5,0.94)",
        transition: expandTransition,
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        animate={{
          opacity: isExpanded ? 1 : 0.45,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.12),transparent_34%)]" />
      </motion.div>

      <motion.div
        className="absolute left-0 top-0 z-10 h-px w-full overflow-hidden"
        animate={{
          scaleX: isExpanded ? 1 : 0,
          opacity: isExpanded ? 1 : 0,
          originX: isExpanded ? 0 : 1,
        }}
        transition={{
          scaleX: expandTransition,
          opacity: { duration: 0.2, ease: "easeOut" },
        }}
      >
        <div className="h-full w-full bg-[linear-gradient(90deg,#0d47a1_0%,#0f6ccf_18%,#19b7d8_42%,#d8dbe7_68%,#f3a4b3_84%,#d92d4c_100%)]" />
      </motion.div>

      <div className="flex h-full flex-col justify-between p-6 md:p-8">
        {/* Top: Logo */}
        <div className="mb-6 flex items-start justify-between md:mb-10">
          <motion.div
            className="h-6 w-auto text-white/75 md:h-8"
            animate={{ opacity: isExpanded ? 1 : 0.72, y: isExpanded ? 0 : 2 }}
            transition={{ duration: 0.32, ease: revealEase }}
          >
            {logo}
          </motion.div>
          {/* Mobile indicator */}
          {/* <div className="md:hidden">
            <motion.svg
              animate={{ rotate: isExpanded ? 180 : 0 }}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              className="text-zinc-500"
            >
              <path d="M5 7.5L10 12.5L15 7.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </div> */}
        </div>

        {/* Middle: Content */}
        <div className="flex flex-1 flex-col justify-start overflow-hidden pt-2 md:pt-6">
          <motion.div
            animate={{
              opacity: isExpanded ? 1 : 0,
            }}
            transition={{
              opacity: { duration: isExpanded ? 0.24 : 0.12, delay: isExpanded ? 0.42 : 0, ease: "easeOut" },
            }}
            className="max-w-lg overflow-hidden pr-2 md:pr-6"
            aria-hidden={!isExpanded}
          >
            <motion.div className="pb-6">
              <p className="mb-6 text-[15px] leading-7 tracking-[-0.02em] text-zinc-300 md:text-[16px] md:leading-[29px] md:tracking-[-0.03em] font-sans">
                {quote}
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom: Label */}
        <div className="mt-auto flex items-end justify-between overflow-hidden border-t border-white/8 pt-5">
          <div className="min-w-0">
            <motion.h3
              className="origin-left font-serif text-[22px] font-normal leading-tight tracking-[-0.04em] text-[#e6e6e6] whitespace-nowrap md:text-[24px] md:leading-[44px] md:tracking-[-0.05em]"
              animate={{
                scale: isExpanded ? 0.8 : 1,
                opacity: isExpanded ? 0.92 : 1,
              }}
              transition={{ duration: isExpanded ? 0.28 : 0.2, ease: revealEase }}
            >
              {companyName}
            </motion.h3>
            <motion.p
              className="mt-2 text-[14px] font-normal tracking-[-0.02em] text-zinc-500 whitespace-nowrap font-sans md:text-[16px] md:leading-[38px] md:tracking-[-0.03em]"
              animate={{
                opacity: isExpanded ? 0 : 0.82,
                y: isExpanded ? 6 : 0,
              }}
              transition={{ duration: isExpanded ? 0.16 : 0.24, ease: "easeOut" }}
            >
                {category}
            </motion.p>
          </div>
          <motion.div
            className="pl-4 text-right"
            animate={{
              opacity: isExpanded && author ? 1 : 0,
              y: isExpanded && author ? 0 : 8,
            }}
            transition={{
              opacity: { duration: isExpanded ? 0.26 : 0.14, delay: isExpanded ? 0.08 : 0, ease: "easeOut" },
              y: { duration: isExpanded ? 0.3 : 0.16, ease: revealEase },
            }}
          >
            {author && (
              <>
              <p className="font-medium text-white whitespace-nowrap">{author}</p>
              <p className="text-xs text-zinc-500 whitespace-nowrap md:text-sm">{role}</p>
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* Dynamic Rainbow Gradient Bar (shows on currently expanded card) */}
      <motion.div
        className="absolute bottom-0 left-0 h-1.5 w-full overflow-hidden md:h-4"
        animate={{
          scaleX: isExpanded ? 1 : 0,
          opacity: isExpanded ? 1 : 0,
          originX: isExpanded ? 0 : 1,
        }}
        transition={{
          scaleX: expandTransition,
          opacity: { duration: 0.2, ease: "easeOut" },
        }}
      >
        <div className="h-full w-full bg-[linear-gradient(90deg,#0d47a1_0%,#0f6ccf_18%,#19b7d8_42%,#d8dbe7_68%,#f3a4b3_84%,#d92d4c_100%)]" />
      </motion.div>
    </motion.div>
  );
}
