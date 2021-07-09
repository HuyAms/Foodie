import React from 'react'

interface IdleAction {
  type: 'idle'
}

interface PendingAction {
  type: 'pending'
}

interface ResolvedAction<TResult> {
  type: 'resolved'
  data: TResult
}

interface RejectedAction<TError> {
  type: 'rejected'
  error: TError
}

type AsyncAction<TResult, TError> =
  | PendingAction
  | IdleAction
  | ResolvedAction<TResult>
  | RejectedAction<TError>

interface IdleState {
  status: 'idle'
  data: null
  error: null
}

interface PendingState {
  status: 'pending'
  data: null
  error: null
}

interface ResolvedState<TResult> {
  status: 'resolved'
  data: TResult
  error: null
}

interface RejectedState<TError> {
  status: 'rejected'
  data: null
  error: TError
}

type AsyncState<TResult, TError> =
  | IdleState
  | PendingState
  | ResolvedState<TResult>
  | RejectedState<TError>

type AsyncReducer<R = unknown, E = unknown> = <TResult = R, TError = E>(
  state: AsyncState<TResult, TError>,
  action: AsyncAction<TResult, TError>
) => AsyncState<TResult, TError>

const asyncReducer: AsyncReducer = (_state, action) => {
  switch (action.type) {
    case 'idle': {
      return { status: 'idle', data: null, error: null }
    }
    case 'pending': {
      return { status: 'pending', data: null, error: null }
    }
    case 'rejected': {
      return { status: 'rejected', data: null, error: action.error }
    }
    case 'resolved': {
      return { status: 'resolved', data: action.data, error: null }
    }
  }
}

function useSafeDispatch<TResult, TError>(
  dispatch: React.Dispatch<AsyncAction<TResult, TError>>
) {
  const mountedRef = React.useRef(false)

  React.useEffect(() => {
    mountedRef.current = true

    return () => {
      mountedRef.current = false
    }
  }, [])

  return React.useCallback(
    (args: AsyncAction<TResult, TError>) => {
      if (mountedRef.current) {
        dispatch(args)
      }
    },
    [dispatch]
  )
}

export function useAsync<TResult, TError>(
  initialState: AsyncState<TResult, TError> = {
    status: 'idle',
    data: null,
    error: null,
  }
) {
  const [state, unSafeDispatch] = React.useReducer(asyncReducer, initialState)

  const dispatch = useSafeDispatch(unSafeDispatch)

  const { data, error, status } = state as AsyncState<TResult, TError>

  const run = React.useCallback(
    (promise: Promise<TResult>) => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`
        )
      }

      dispatch({ type: 'pending' })

      promise.then(
        (data) => {
          dispatch({ type: 'resolved', data })
        },
        (error) => {
          dispatch({ type: 'rejected', error })
        }
      )
    },
    [dispatch]
  )

  return {
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'resolved',
    data,
    error,
    status,
    run,
  }
}
