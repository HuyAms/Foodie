import { useAsync } from '../hook'
import { renderHook, act } from '@testing-library/react-hooks'

function deferred<T>() {
  type ResolveFn = (value: T | PromiseLike<T>) => void
  type RejectFn = (error?: any) => void

  let resolve: ResolveFn | undefined
  let reject: RejectFn | undefined

  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })

  return { promise, resolve, reject }
}

const defaultState = {
  isIdle: true,
  isLoading: false,
  isError: false,
  isSuccess: false,
  setData: expect.any(Function),
  setError: expect.any(Function),
  data: null,
  error: null,
  status: 'idle',
  run: expect.any(Function),
}

const pendingState = {
  ...defaultState,
  status: 'pending',
  isIdle: false,
  isLoading: true,
}

const resolvedState = {
  ...defaultState,
  status: 'resolved',
  isIdle: false,
  isSuccess: true,
}

const rejectedState = {
  ...defaultState,
  status: 'rejected',
  isIdle: false,
  isError: true,
}

test('calling run with a promise which resolves', async () => {
  const { promise, resolve } = deferred<any>()

  const { result } = renderHook(() => useAsync())
  expect(result.current).toEqual(defaultState)

  let p: Promise<any>
  act(() => {
    p = result.current.run(promise)
  })

  expect(result.current).toEqual(pendingState)

  const resolvedValue = Symbol('resolved value')
  await act(async () => {
    resolve!(resolvedValue)
    await p
  })

  expect(result.current).toEqual({
    ...resolvedState,
    data: resolvedValue,
  })
})

test('calling run with a promise which rejects', async () => {
  const { promise, reject } = deferred()

  const { result } = renderHook(() => useAsync())
  expect(result.current).toEqual(defaultState)

  let p: Promise<any>
  act(() => {
    p = result.current.run(promise)
  })

  expect(result.current).toEqual(pendingState)

  const rejectedValue = Symbol('rejected value')
  await act(async () => {
    reject!(rejectedValue)
    await p.catch(() => {
      // ignore error
    })
  })

  expect(result.current).toEqual({
    ...rejectedState,
    error: rejectedValue,
  })
})

test('can specify an initial state', async () => {
  const mockData = Symbol('result value')
  const { result } = renderHook(() =>
    useAsync<Symbol, Error>({
      status: 'resolved',
      data: mockData,
      error: null,
    })
  )

  expect(result.current).toEqual({
    ...resolvedState,
    data: mockData,
  })
})

test('can set the data', async () => {
  const { result } = renderHook(() => useAsync())

  const mockData = Symbol('mock data')
  act(() => result.current.setData(mockData))

  expect(result.current).toEqual({
    ...resolvedState,
    data: mockData,
  })
})

test('can set the error', async () => {
  const { result } = renderHook(() => useAsync())

  const mockError = Symbol('rejected value')
  act(() => result.current.setError(mockError))

  expect(result.current).toEqual({
    ...rejectedState,
    error: mockError,
  })
})

test('No state updates happen if the component is unmounted while pending', async () => {
  const { promise, resolve } = deferred<any>()
  const { result, unmount } = renderHook(() => useAsync())

  const spiedConsoleError = jest.spyOn(console, 'error')

  let p: Promise<any>
  act(() => {
    p = result.current.run(promise)
  })

  unmount()

  await act(async () => {
    resolve!(Symbol('resolved value'))
    await p
  })

  expect(spiedConsoleError).not.toHaveBeenCalled()
  spiedConsoleError.mockRestore()
})
