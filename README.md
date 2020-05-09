# reef-router
A simple, single page router for [Reef](https://github.com/cferdinandi/reef) by Chris Ferdinandi.

## Use
First steps is to download either reef-router.js or reef-router.min.js from `dist/`, and import it into your project's `index.html`, just after Reef itself:
```html
<div id="app"></div>

<script src="reef.min.js"></script>
<script src="reef-router.min.js"></script>
```
If you want, you can also install it through `npm` or `yarn`:
```
npm install reef-router
yarn add reef-router
```

Next, you'll need to create a (or modify an existing) Reef app to act as the main renderer. For it to work, you'll need to include two things:
* An if/else or switch/case block for each page, returning the content to render
* A `page` prop with the page you want to be shown by default
```js
const app = new Reef('#app', {
	template: (props) => {
		if (props.page === 'homepage') {
			return `This is the homepage`;
		}

		if (props.page === 'about') {
			return `This is the about me page`;
		}
	},

	data: {
		page: 'homepage'
	}
});
```

Then, you can create a ReefRouter, giving it the main renderer and a list of pages:
```js
const router = new ReefRouter({
	main: app,
	pages: {
		'homepage': 'Home',
		'about': 'About me'
	}
});
```

And of course, not forgetting to render it:
```js
app.render();
```

You're done! Now, you can navigate between the pages by adding `?p=<page id>` to your address bar. But that's not really good user experience, isn't it? You can use any element to create clickable links to go between pages, using the `id`, `router-page` and `onclick` attributes. Here's an example using `<a>` links:
```html
<a id="link-homepage" router-page="homepage" onclick="router.change('link-homepage');">Home</a>

<a id="link-about" router-page="about" onclick="router.change('link-about');">About me</a>
```
Technically, any element would work - `<button>`s, `<span>`s or even images.

## Options
The `ReefRouter` class accepts an object of options. You only need `main` and `pages` to create a router, but there are more options you can provide to customize it:
```js
new ReefRouter({
    // The main renderer appliation that has the 'page' data param
    main: app,
    
    // An object of pages, in the id:title format
	pages: {
		'homepage': 'Home',
		'about': 'About me'
    },

    // The default page (what page to use if none is provided)
    // This defaults to the first entry of the pages object above if none is provided
    defaultPage: 'homepage',

    // A basic name for your application
    appName: 'My App',

    // Whether to update the page title or not based on the active page
    updatePageTitle: true,
    
    // If enabled, this is the format to use for the page title
    // {title} is the page title
    // {id} is the page ID
    // {appName} is the appName option provided
    pageTitleFormat: '{title} | {appName}',


});
```

## Why?
Reef is designed to be a simple rendering-only library.

It's great at that, but without any sort of routing functionality, isn't great for complex or multi-page applications. While it isn't flash, reef-router adds a simple and light way to do so without clogging Reef too much.

Of course, this is meant to just add some easy functionality for making multiple pages in your application, but it's not a fully fledged router, and never will be.

## In-depth explanation
reef-router works off the HTML5 history API, by storing a state for each page change. It then uses the query parameter `p` to indicate the page, and makes it possible to directly navigate to pages.

It also relies on using a data param of the main app renderer to indicate the page to Reef. Then, you can use an if/else or switch/case block to indicate what page to render.

It's technically possible to jump into the reef-router class and change what query param to use, such as changing it to use `page`, or to change the data param it uses for the page, such as changing it to use `currentPage`.

With how it renders the page (using the aforementioned if/else or switch/case block), you can stil use things like nested components and stores exactly the same.

## Bugs/issues/contribution
Report any bugs or issues you find to the GitHub issues page.

The actual router itself is simple enough that anyone that knows enough about JavaScript, Reef and the history API should be able to open the file and add to it if needed.

## License
(c) 2020 ThatTonybo. Licensed under the MIT License.