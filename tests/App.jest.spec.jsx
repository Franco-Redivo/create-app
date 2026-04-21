/* eslint-env jest */

import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router-dom'

import App from 'Components/App'
import Router from 'Components/Router'

jest.mock('Utilities/services/messages', () => ({
  getMessages: jest.fn().mockResolvedValue([]),
  postMessage: jest.fn(),
  deleteMessage: jest.fn(),
}))

const render = async (element) => {
  const container = document.createElement('div')
  document.body.appendChild(container)

  await act(async () => {
    ReactDOM.render(element, container)
  })

  return container
}

const cleanup = (container) => {
  ReactDOM.unmountComponentAtNode(container)
  container.remove()
}

describe('App shell', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('renders the shared layout and front page', async () => {
    const container = await render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    expect(container.textContent).toContain('Welcome')
    expect(container.querySelector('a[href="/messages"]')).not.toBeNull()
    expect(container.querySelectorAll('img[alt="toska"]').length).toBe(2)

    cleanup(container)
  })

  it('renders the message view for the messages route', async () => {
    const container = await render(
      <MemoryRouter initialEntries={['/messages']}>
        <Router />
      </MemoryRouter>,
    )

    expect(container.textContent).toContain('Messages')
    expect(container.querySelector('input#message')).not.toBeNull()

    cleanup(container)
  })
})
