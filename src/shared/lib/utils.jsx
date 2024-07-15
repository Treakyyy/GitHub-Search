import _ from 'lodash'

export const throttledFetchRepos = (fetchFunction, delay = 1000) => {
  const abortControllerRef = { current: null }

  return _.throttle((query) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    const controller = new AbortController()
    abortControllerRef.current = controller
    fetchFunction(query, controller.signal)
  }, delay)
}
