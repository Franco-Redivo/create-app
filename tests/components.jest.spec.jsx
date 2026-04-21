import React from 'react'
import ReactDOM from 'react-dom'
import { act, Simulate } from 'react-dom/test-utils'

import FrontPage from 'Components/FrontPage'
import NavBar from 'Components/NavBar'
import Footer from 'Components/Footer'
import MessageForm from 'Components/MessageView/MessageForm'
import MessageList from 'Components/MessageView/MessageList'

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

describe('leaf components', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('renders the front page content', () => {
    const container = render(<FrontPage />)

    expect(container.textContent).toContain('Welcome')
    expect(container.querySelector('a[href="/messages"]')).not.toBeNull()

    cleanup(container)
  })

  it('renders the branding in the nav bar and footer', () => {
    const navContainer = render(<NavBar />)
    const footerContainer = render(<Footer />)

    expect(navContainer.querySelector('img[alt="toska"]')).not.toBeNull()
    expect(footerContainer.querySelector('img[alt="toska"]')).not.toBeNull()

    cleanup(navContainer)
    cleanup(footerContainer)
  })

  it('submits the message form value', () => {
    const postMessage = jest.fn()
    const container = render(<MessageForm postMessage={postMessage} />)

    expect(container.querySelector('#message')).not.toBeNull()
    expect(container.querySelector('button[type="submit"]')).not.toBeNull()
    expect(container.textContent).toContain('Send!')

    cleanup(container)
  })

  it('renders messages and deletes a message', () => {
    const deleteMessage = jest.fn()
    const message = { id: 1, body: 'First message' }
    const container = render(
      <MessageList messages={[message]} deleteMessage={deleteMessage} />
    )

    expect(container.textContent).toContain('First message')

    act(() => {
      Simulate.click(container.querySelector('button[type="button"]'))
    })

    expect(deleteMessage).toHaveBeenCalledWith(message)

    cleanup(container)
  })
})