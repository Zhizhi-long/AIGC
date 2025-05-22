/**
 * @param {string} eventName
 * @param {any} value
 */
function iframePostMessage (eventName, value) {
  let parent = window.parent
  while (parent.parent !== parent) {
    parent = parent.parent
  }
  parent.postMessage({ eventName, value }, '*')
}

export { iframePostMessage }
