//* Helper functions
const ifElse = (i, e) =>
  cond => cond ? i : e

//* Handle content to be displayed in the view
const redirect = (routes, root) => {
  const route = location.hash.split('/')[1] || ''
  const hasIndexRedirect = routes.hasOwnProperty('indexRedirect')

  const isIndex = (i, e) => ifElse(i, e)(route === '')

  //* Handle which component will be attached to the root component
  root.innerHTML =
    isIndex(
      ifElse(routes[routes.indexRedirect], '')(hasIndexRedirect),
      routes[route]
    )()
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
