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
  })
  const [isMobile, setIsMobile] = useState(false)

  // ✅ Handle responsive logic
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // ✅ Transform values
  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0])
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0.7, 0.9] : [1.05, 1]
  )
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <div
      ref={containerRef}
      className="relative flex h-[80rem] items-center justify-center p-20"
    >
      <div
        className="relative w-full py-40"
        style={{ perspective: '1000px' }}
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
      className="max-w-5xl mx-auto text-center"
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
          '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
      }}
      className="mx-auto -mt-12 h-[30rem] w-full max-w-5xl rounded-[30px] bg-[#222222] p-6 shadow-2xl md:h-[40rem]"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100 p-4 transition-all">
        <Image
          src="/temp-banner.png"
          alt="bannerImage"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 800px"
          className="rounded-2xl border-8 object-cover"
        />
      </div>
    </motion.div>
  )
}
