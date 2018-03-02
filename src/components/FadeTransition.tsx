import * as React from 'react'
import Transition from 'react-transition-group/Transition'

interface IFadeTransitionProps {
  children: JSX.Element
  in?: boolean
  duration?: number
}

export default class FadeTransition extends React.Component<IFadeTransitionProps> {
  render () {
    const { children, duration = 3000, in: inProp } = this.props
    const defaultStyle = {
      transition: `opacity ${duration}ms ease-in`,
      opacity: 0
    }

    const transitionStyles = {
      entering: { opacity: 1 },
      entered: { opacity: 1 }
    }

    return (
      <Transition
        in={inProp}
        timeout={duration}
      >
        {(status: string) => {
          const currentStyles = transitionStyles[status]
          return React.cloneElement(children, {
            style: { ...defaultStyle, ...currentStyles }
          })
        }}
      </Transition>
    )
  }
}
