import { useEffect, useRef } from 'react'

export function useScrollTracking() {
  const tracked = useRef({ 25: false, 50: false, 75: false, 100: false })

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) return

      const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100)

      const thresholds = [25, 50, 75, 100]
      for (const threshold of thresholds) {
        if (scrollPercent >= threshold && !tracked.current[threshold]) {
          tracked.current[threshold] = true
          window.umami?.track('scroll-depth', { depth: `${threshold}%` })
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
}

export function useSectionTracking(sectionIds) {
  const tracked = useRef(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !tracked.current.has(entry.target.id)) {
            tracked.current.add(entry.target.id)
            window.umami?.track('section-view', { section: entry.target.id })
          }
        }
      },
      { threshold: 0.3 }
    )

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [sectionIds])
}

export function trackClick(eventName, data = {}) {
  window.umami?.track(eventName, data)
}
