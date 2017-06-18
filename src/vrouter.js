// Handle content to be displayed in the view
const redirect = (routes, root) => {
  const route = location.hash.split('/')[1] || ''

  const _getIndex = () => {
    if (routes.hasOwnProperty('indexRedirect')) {
      return routes[routes.indexRedirect]
    }
    return ''
  }

  const _getRoute = (index, other) => {
    if (route === '') {
      return index
    }
    return other
  }

  // Handle which component will be attached to the root component
  root.innerHTML = _getRoute(_getIndex(), routes[route])
}

/**
 * Router fn
 * @param routes: Object: routes object
 * @param root: DOM node: element to append components to
 */
export default function router (routes, root) {
  window.addEventListener('load', () => {
    redirect(routes, root)
  }, false)

  window.addEventListener('hashchange', () => {
    redirect(routes, root)
  }, false)
}
