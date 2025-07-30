import { render } from '@testing-library/react'

describe('Smoke Test', () => {
  it('should run a basic test to verify Jest setup', () => {
    expect(true).toBe(true)
  })

  it('should render a basic React component', () => {
    const TestComponent = () => <div>Test Component</div>
    const { getByText } = render(<TestComponent />)
    expect(getByText('Test Component')).toBeInTheDocument()
  })
})