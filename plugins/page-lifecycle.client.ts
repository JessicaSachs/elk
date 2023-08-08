import lifecycle from 'page-lifecycle/dist/lifecycle.mjs'
import { ELK_PAGE_LIFECYCLE_FROZEN } from '~/constants'
import { closeDatabases } from '~/utils/elk-idb'

export default defineNuxtPlugin(() => {
  const state = ref(lifecycle.state)
  const frozenListeners: (() => void)[] = []
  const frozenState = useLocalStorage(ELK_PAGE_LIFECYCLE_FROZEN, false)

  lifecycle.addEventListener('statechange', (evt) => {
    if (evt.newState === 'hidden' && evt.oldState === 'frozen') {
      frozenState.value = false
      nextTick().then(() => window.location.reload())
      return
    }

    if (evt.newState === 'frozen') {
      frozenState.value = true
      frozenListeners.forEach(listener => listener())
    }
    else {
      state.value = evt.newState
    }
  })

  const addFrozenListener = (listener: () => void) => {
    frozenListeners.push(listener)
  }

  addFrozenListener(() => {
    // eslint-disable-next-line no-console
    console.log('window', window)
    // eslint-disable-next-line no-console
    console.log('navigator', window.navigator)
    // eslint-disable-next-line no-console
    console.log('service worker', window.navigator.serviceWorker)
    if (useAppConfig().pwaEnabled && window.navigator?.serviceWorker?.controller)
      window.navigator?.serviceWorker?.controller.postMessage(ELK_PAGE_LIFECYCLE_FROZEN)

    closeDatabases()
  })

  return {
    provide: {
      pageLifecycle: reactive({
        state,
        addFrozenListener,
      }),
    },
  }
})
