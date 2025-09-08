'use client'

import React, { useRef, useEffect, useState } from 'react'
import {
  useScroll,
  useTransform,
  motion,
  MotionValue,
} from 'framer-motion'
import Image from 'next/image'

/**
 * ContainerScroll — scroll-based animated container
 */
export const ContainerScroll = ({
  titleComponent,
}: {
  titleComponent: React.ReactNode
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const [isMobile, setIsMobile] = useState(false)

  // ✅ Handle responsive logic
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // ✅ Transform values
  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0])
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0.85, 0.95] : [1.05, 1]
  )
  const translate = useTransform(scrollYProgress, [0, 1], [0, -120])

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-[120vh] items-center justify-center px-6"
    >
      <div
        className="relative w-full py-32"
        style={{ perspective: '1200px' }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale} translate={translate} />
      </div>
    </div>
  )
}

/**
 * Header — scroll-animated title
 */
export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>
  titleComponent: React.ReactNode
}) => {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="max-w-4xl mx-auto mb-12 text-center"
    >
      {titleComponent}
    </motion.div>
  )
}

/**
 * Card — scroll-animated card with image
 */
export const Card = ({
  rotate,
  scale,
  translate,
}: {
  rotate: MotionValue<number>
  scale: MotionValue<number>
  translate: MotionValue<number>
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        translateY: translate,
        boxShadow:
          '0 10px 25px rgba(0,0,0,0.25), 0 40px 60px rgba(0,0,0,0.15)',
      }}
      className="relative mx-auto -mt-10 h-[28rem] w-full max-w-5xl rounded-[24px] bg-neutral-900 p-4 md:h-[38rem]"
    >
      <div className="relative h-full w-full overflow-hidden rounded-2xl">
        <Image
          src="/temp-banner.png"
          alt="banner image"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 800px"
          className="rounded-2xl object-cover border-4 border-white/10"
        />
      </div>
    </motion.div>
  )
}
