import React from 'react'
import { Fireworks } from 'fireworks/lib/react'


function fx() {
  let fxProps = {
    count: 3,
    interval: 800,
    colors: ['#FFD662FF', '#ff6f69', '#3CAEA3'],
    calc: (props, i) => ({
      ...props,
      x: (i + 1) * (window.innerWidth / 3) - (i + 1) * 100,
      y: 200 + Math.random() * 100 - 50 + (i === 2 ? -80 : 1)
    })
  }

  return (
    <div>
      <Fireworks {...fxProps} />
      <h1>Happy New Year!</h1>
    </div>
  )
}

export default fx;