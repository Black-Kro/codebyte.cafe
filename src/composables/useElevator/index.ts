export const useElevator = () => {
  let animation: any
  let duration: null | number
  let startTime: null | number
  let startPosition: null | number
  const endPosition = 0
  let elevating = false

  const mainAudio = new Audio('/music/elevator.mp3')
  mainAudio.setAttribute('preload', 'true')
  mainAudio.setAttribute('loop', 'true')
  mainAudio.volume = 0.1

  const endAudio = new Audio('/music/ding.mp3')
  endAudio.setAttribute('preload', 'true')
  endAudio.volume = 0.05

  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2
    if (t < 1) return c / 2 * t * t + b
    t--
    return -c / 2 * (t * (t - 2) - 1) + b
  }

  const animationFinished = () => {
    resetPosition()

    if (mainAudio) {
      mainAudio.pause()
      mainAudio.currentTime = 0
    }

    if (endAudio)
      endAudio.play()
  }

  const animateLoop = (time) => {
    if (!startTime)
      startTime = time

    const timeSoFar = time - (startTime || 0)
    const easedPosition = easeInOutQuad(
      timeSoFar,
      startPosition,
      endPosition - (startPosition || 0),
      duration,
    )

    window.scrollTo(0, easedPosition)

    if (timeSoFar < (duration || 0))
      animation = requestAnimationFrame(animateLoop)
    else
      animationFinished()
  }

  const resetPosition = () => {
    startTime = 0
    startPosition = 0
    elevating = false
  }

  const elevate = () => {
    if (elevating)
      return

    elevating = true
    startPosition = document.documentElement.scrollTop || document.body.scrollTop

    duration = Math.abs(endPosition - startPosition) * 1.5
    requestAnimationFrame(animateLoop)

    if (mainAudio)
      mainAudio.play()
  }

  const onWindowBlur = () => {
    if (elevating) {
      cancelAnimationFrame(animation)
      resetPosition()

      if (mainAudio) {
        mainAudio.pause()
        mainAudio.currentTime = 0
      }

      window.scrollTo(0, endPosition)
    }
  }

  window.addEventListener('blur', onWindowBlur, false)

  return {
    elevate,
  }
}
