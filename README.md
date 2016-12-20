# vrouter 🌟
`vrouter` is a simple and lightweight (`~345 Bytes gzip`) router for `vhtml`.

_(Don’t know what `vhtml` is? Check this [link](https://github.com/developit/vhtml) out)_

## Installation
`npm i —-save vrouter`



## Index:
1. [Getting started](#Getting started)
2. [Api](#api)
3. [Examples](#examples)
4. [Collaborate](#collaborate)
5. [Walkthrough](#walkthrough) 
6. [License](#license)



## Getting started
``` js
import h from 'vhtml'
import router from 'vrouter'

import PostsContainer from './PostsContainer'
import PostContainer from './PostContainer'

router(
	{
		indexRedirect: 'posts',
		'posts': <PostsContainer />,
		'post': <PostContainer />
	},
	document.querySelector('.root')
)

```



## Api
`vrouter`  has only one method: **router** which takes two arguments: 

- An object with routes: this object takes a key that equals the path of the url and a component where you want that path to point to.
- A DOM element: this is the `root` element were you expect every other element to be attached to.

Additionally, the routes object can take one argument `indexRedirect`:


| Property | Optional | Description  |
|--------|---|---|
|    `indexRedirect`  | Yes |  Takes a path that should be already defined in the router and redirects the user to this route whenever he/she enters the `/` path  |




## Examples
You can find a fully working example in the `examples` folder of the project.


- - - -

## Collaborate
This project is very small and has a very naive approach, but it does its job well. I thought it would be a good idea to include a walkthrough the code so that if you think you can improve something or you need a feature it does not provide you can have a better time getting started.

So that being said, **PR’s** are more than welcome! ✨✨✨



## Walkthrough
This project has only one file: `router` which has three parts:

* A helper function
* A DOM handling function
* Some listener functions

### Helper function
There is only one:  `ifElse` . It’s a simple if-else function that uses currying to attach a condition to it.

``` js
const ifElse = (i, e) =>
  cond => cond ? i : e
```


### DOM handling function
This function handles the logic of attaching a component element to the DOM. This function is called on the first load of the page or whenever there is a change in the hash of the url:

``` js
const redirect = (routes, root) => {
	// Extracts the hash of the url
  const route = location.hash.split('/')[1] || ''
  // Did user defined an indexRedirect on router?
	const hasIndexRedirect = routes.hasOwnProperty('indexRedirect')

	// Checks if the route is the index route
  const isIndex = (i, e) => ifElse(i, e)(route === '')

  //* Handle which component should be attached to the root component
  root.innerHTML =
    isIndex(
      ifElse(routes[routes.indexRedirect], '')(hasIndexRedirect), // If the user is in the index and there is a indexRedirect prop defined, redirect the user to the provided route
      routes[route] // Otherwise redirect the user to the selected route
    )()
}
```


### Listener functions
Finally it will attach two listeners to  `window`: a `load` event and a `hashchange` event.

Whenever any of these two events is triggered it will call the `redirect` function and perform all the logic related to the changes in the DOM.

``` js
export function router (routes, root) {
  window.addEventListener('load', () => {
    redirect(routes, root)
  }, false)

  window.addEventListener('hashchange', () => {
    redirect(routes, root)
  }, false)
}
```


## License
Released under The MIT License


