'use client'

import { motion, useReducedMotion } from 'framer-motion'

/**
 * Figma ships the paddle and ball as one raster (node 2287:585, a 412x412 box)
 * whose real resolution is only ~112x51 for the paddle. It was split on its
 * alpha channel, resampled to that true grid, interpolated back up and traced
 * with potrace, so both pieces are now resolution-independent vectors.
 * Positions below are the original artwork's, against that same 412x412 box:
 *
 *   paddle crop 1244x573 -> left 18.26%  top 64.93%  width 75.5%
 *   ball   crop  244x244 -> left 32.28%  top  9.59%  width 14.81%
 *
 * The blade centre sits 29.3% across / 50% down the paddle crop, which puts the
 * ball's contact point at left 33% / top 51.66% — so the ball's painted position
 * in the source file becomes the apex of the bounce (a 284% rise of its own height).
 */

const CYCLE = 1.25
const CONTACT = 0.46

export default function PaddleJuggle() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, x: 60, rotate: 8 }}
      animate={{ opacity: 1, x: 0, rotate: 0 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden
      className="pointer-events-none relative aspect-square w-full"
    >
      {/* Warm bloom so the rig belongs to the scene */}
      <div className="absolute left-[10%] top-[28%] h-[62%] w-[86%] rounded-full bg-orange/[0.12] blur-[70px]" />

      {/* Ball — accelerates down, squashes on the blade, decelerates up */}
      <motion.div
        className="absolute left-[33%] top-[51.66%] w-[14.81%]"
        style={{ originY: 1 }}
        animate={
          reduceMotion
            ? undefined
            : {
                y: ['-284%', '0%', '-284%'],
                x: ['6%', '0%', '6%'],
                scaleX: [1, 1, 1.14, 0.97, 1],
                scaleY: [1, 1, 0.82, 1.05, 1],
              }
        }
        transition={{
          y: { duration: CYCLE, times: [0, CONTACT, 1], ease: ['easeIn', 'easeOut'], repeat: Infinity },
          x: { duration: CYCLE, times: [0, CONTACT, 1], ease: 'linear', repeat: Infinity },
          scaleX: { duration: CYCLE, times: [0, 0.42, 0.47, 0.56, 1], ease: 'easeOut', repeat: Infinity },
          scaleY: { duration: CYCLE, times: [0, 0.42, 0.47, 0.56, 1], ease: 'easeOut', repeat: Infinity },
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/ball-sphere.svg"
          alt=""
          width={244}
          height={244}
          className="h-auto w-full drop-shadow-[0_6px_14px_rgba(0,0,0,0.45)]"
        />
      </motion.div>

      {/* Paddle — taps upward on contact, rotating about the blade centre */}
      <motion.div
        className="absolute left-[18.26%] top-[64.93%] w-[75.5%]"
        style={{ originX: 0.293, originY: 0.5 }}
        animate={reduceMotion ? undefined : { y: ['0%', '0%', '-12%', '3%', '0%'], rotate: [0, 0, -6, 2, 0] }}
        transition={{
          duration: CYCLE,
          times: [0, 0.38, 0.47, 0.64, 1],
          ease: 'easeOut',
          repeat: Infinity,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/paddle-blade.svg"
          alt=""
          width={2464}
          height={1122}
          className="h-auto w-full drop-shadow-[0_24px_40px_rgba(0,0,0,0.55)]"
        />
      </motion.div>
    </motion.div>
  )
}
