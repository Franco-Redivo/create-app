import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'

import ErrorBoundary from 'Components/ErrorBoundary'

const render = (element) => {
  const container = document.createElement('div')
  document.body.appendChild(container)

  act(() => {
    ReactDOM.render(element, container)
  })

  return container
}

const cleanup = (container) => {
  ReactDOM.unmountComponentAtNode(container)
  container.remove()
}

describe('ErrorBoundary', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('renders children when there is no error', () => {
    const container = render(
      <ErrorBoundary>
        <p>Safe content</p>
      </ErrorBoundary>
    )

    expect(container.textContent).toContain('Safe content')

    cleanup(container)
  })

  it('shows the fallback when a child throws', () => {
    const originalError = console.error
    console.error = jest.fn()

    const Thrower = () => {
      throw new Error('boom')
    }

    const container = render(
      <ErrorBoundary>
        <Thrower />
      </ErrorBoundary>
    )

    expect(container.textContent).toContain('An error occurred!')

    cleanup(container)
    console.error = originalError
  })
})