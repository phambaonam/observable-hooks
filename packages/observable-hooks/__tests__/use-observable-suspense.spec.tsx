import { useObservableSuspense, ObservableResource } from '../src'
import React, { Suspense } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { of, Subject, BehaviorSubject, EMPTY } from 'rxjs'

function timer(delay = 0) {
  return new Promise<undefined>(resolve => setTimeout(resolve, delay))
}

async function actSuspense(action: () => any = timer) {
  return act(async () => {
    await action() // Suspender resolved
    await timer() // re-render
  })
}

type SuspenseState = 'pending' | 'success' | 'error' | ''

describe('useObservableSuspense', () => {
  let container: HTMLDivElement = (null as unknown) as HTMLDivElement

  function renderHook<TInput, TOuput extends TInput>(
    resource: ObservableResource<TInput, TOuput>
  ) {
    const result: {
      value?: TOuput | Error
      renderCount: number
      getStatus: () => SuspenseState
    } = {
      renderCount: 0,
      getStatus: () => (container.textContent || '').trim() as SuspenseState
    }

    class ErrorBoundary extends React.Component {
      state = { hasError: false }

      static getDerivedStateFromError(error: Error) {
        result.value = error
        return { hasError: true }
      }

      render() {
        return this.state.hasError ? 'error' : this.props.children
      }
    }

    function Child() {
      result.renderCount += 1
      result.value = undefined
      result.value = useObservableSuspense(resource)
      return <>success</>
    }

    function Wrapper() {
      return (
        <ErrorBoundary>
          <Suspense fallback="pending">
            <Child />
          </Suspense>
        </ErrorBoundary>
      )
    }

    act(() => {
      render(<Wrapper />, container)
    })

    return result
  }

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    unmountComponentAtNode(container)
    container.remove()
    container = (null as unknown) as HTMLDivElement
  })

  it('should trigger Suspense on init when no sync value is emitted', async () => {
    const input$ = new Subject<number>()
    const inputResource = new ObservableResource(input$)
    const result = renderHook(inputResource)
    expect(result.renderCount).toBe(1)
    expect(result.value).toBeUndefined()
    expect(result.getStatus()).toBe('pending')

    await actSuspense(() => input$.next(1))

    expect(result.renderCount).toBe(2)
    expect(result.value).toBe(1)
    expect(result.getStatus()).toBe('success')
  })

  it('should not trigger Suspense on init when sync values are emitted', async () => {
    const input$ = of(1, 2, 3, 4)
    const inputResource = new ObservableResource(input$)
    const result = renderHook(inputResource)
    expect(result.renderCount).toBe(1)
    expect(result.value).toBe(4)
    expect(result.getStatus()).toBe('success')

    await actSuspense()

    expect(result.renderCount).toBe(1)
    expect(result.value).toBe(4)
    expect(result.getStatus()).toBe('success')
  })

  it('should trigger Suspense when a non-success value is emitted during success state', async () => {
    const input$ = new BehaviorSubject<number>(1)
    const inputResource = new ObservableResource(
      input$,
      (value: number) => value !== 2
    )
    const result = renderHook(inputResource)
    expect(result.renderCount).toBe(1)
    expect(result.value).toBe(1)
    expect(result.getStatus()).toBe('success')

    await actSuspense(() => input$.next(2))

    expect(result.renderCount).toBe(2)
    expect(result.value).toBeUndefined()
    expect(result.getStatus()).toBe('pending')

    await actSuspense(() => input$.next(3))

    expect(result.renderCount).toBe(3)
    expect(result.value).toBe(3)
    expect(result.getStatus()).toBe('success')
  })

  it('should trigger Suspense only once when same values are emitted', async () => {
    const input$ = new Subject<number>()
    const inputResource = new ObservableResource(input$)
    const result = renderHook(inputResource)
    expect(result.renderCount).toBe(1)
    expect(result.value).toBeUndefined()
    expect(result.getStatus()).toBe('pending')

    await actSuspense(() => input$.next(4))
    await actSuspense(() => input$.next(4))
    await actSuspense(() => input$.next(4))

    expect(result.renderCount).toBe(2)
    expect(result.value).toBe(4)
    expect(result.getStatus()).toBe('success')

    await actSuspense(() => input$.next(3))
    await actSuspense(() => input$.next(3))
    await actSuspense(() => input$.next(3))

    expect(result.renderCount).toBe(3)
    expect(result.value).toBe(3)
    expect(result.getStatus()).toBe('success')

    await actSuspense(() => input$.next(6))
    await actSuspense(() => input$.next(5))
    await actSuspense(() => input$.next(5))

    expect(result.renderCount).toBe(5)
    expect(result.value).toBe(5)
    expect(result.getStatus()).toBe('success')
  })

  it('should not trigger Suspense when a non-success value is emitted during pending state', async () => {
    const input$ = new Subject<number>()
    const inputResource = new ObservableResource(
      input$,
      (value: number) => value === 3
    )
    const result = renderHook(inputResource)
    expect(result.renderCount).toBe(1)
    expect(result.value).toBeUndefined()
    expect(result.getStatus()).toBe('pending')

    await actSuspense(() => input$.next(1))

    expect(result.renderCount).toBe(1)
    expect(result.value).toBeUndefined()
    expect(result.getStatus()).toBe('pending')

    await actSuspense(() => input$.next(2))

    expect(result.renderCount).toBe(1)
    expect(result.value).toBeUndefined()
    expect(result.getStatus()).toBe('pending')

    await actSuspense(() => input$.next(3))

    expect(result.renderCount).toBe(2)
    expect(result.value).toBe(3)
    expect(result.getStatus()).toBe('success')
  })

  it('should force update when success values are emitted during success state', async () => {
    const input$ = new BehaviorSubject<number>(1)
    const inputResource = new ObservableResource(input$)
    const result = renderHook(inputResource)
    expect(result.renderCount).toBe(1)
    expect(result.value).toBe(1)
    expect(result.getStatus()).toBe('success')

    await actSuspense(() => input$.next(2))

    expect(result.renderCount).toBe(2)
    expect(result.value).toBe(2)
    expect(result.getStatus()).toBe('success')

    await actSuspense(() => input$.next(3))

    expect(result.renderCount).toBe(3)
    expect(result.value).toBe(3)
    expect(result.getStatus()).toBe('success')
  })

  it('should do nothing when the Observable completes during success state', async () => {
    const input$ = new BehaviorSubject<number>(1)
    const inputResource = new ObservableResource(input$)
    const result = renderHook(inputResource)
    expect(result.renderCount).toBe(1)
    expect(result.value).toBe(1)
    expect(result.getStatus()).toBe('success')

    await actSuspense(() => input$.complete())

    expect(result.renderCount).toBe(1)
    expect(result.value).toBe(1)
    expect(result.getStatus()).toBe('success')
  })

  describe('Error tests', () => {
    let topLevelErrors = []
    function handleTopLevelError(event: ErrorEvent) {
      topLevelErrors.push(event.error)
      // Prevent React logging
      event.preventDefault()
    }

    beforeAll(() => {
      window.addEventListener('error', handleTopLevelError)
    })

    afterAll(() => {
      window.removeEventListener('error', handleTopLevelError)
    })

    beforeEach(() => {
      topLevelErrors = []
    })

    it('should throw error when the Observable is initially empty', async () => {
      const inputResource = new ObservableResource(EMPTY)
      const result = renderHook(inputResource)
      // ErrorBoundary rerendering
      expect(result.renderCount).toBe(2)
      expect(result.value).toBeInstanceOf(Error)
      expect(result.getStatus()).toBe('error')
      expect(topLevelErrors.length).toBe(1)
    })

    it('should throw error when the Obdervable emits errors during pending state', async () => {
      const input$ = new Subject<number>()
      const inputResource = new ObservableResource(input$)
      const result = renderHook(inputResource)
      expect(result.renderCount).toBe(1)
      expect(result.value).toBeUndefined()
      expect(result.getStatus()).toBe('pending')
      expect(topLevelErrors.length).toBe(0)

      await actSuspense(() => input$.error(new Error('oops')))

      // 1. Suspense rerendering
      // 2. useObservableSuspense throws the error
      // 3. ErrorBoundary rerendering
      expect(result.renderCount).toBe(3)
      expect(result.value).toBeInstanceOf(Error)
      expect((result.value as Error).message).toBe('oops')
      expect(result.getStatus()).toBe('error')
      expect(topLevelErrors.length).toBe(1)
    })

    it('should throw error when the Obdervable emits errors during success state', async () => {
      const input$ = new BehaviorSubject<number>(1)
      const inputResource = new ObservableResource(input$)
      const result = renderHook(inputResource)
      expect(result.renderCount).toBe(1)
      expect(result.value).toBe(1)
      expect(result.getStatus()).toBe('success')
      expect(topLevelErrors.length).toBe(0)

      await actSuspense(() => input$.error(new Error('oops')))

      // 1. useObservableSuspense force update
      // 2. useObservableSuspense throws the error
      // 3. ErrorBoundary rerendering
      expect(result.renderCount).toBe(3)
      expect(result.value).toBeInstanceOf(Error)
      expect((result.value as Error).message).toBe('oops')
      expect(result.getStatus()).toBe('error')
      expect(topLevelErrors.length).toBe(1)
    })
  })
})
