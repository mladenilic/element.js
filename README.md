# element.js

_element.js_ is a tiny (**<1kB compressed and minified**) wrapper around `document.createElement` which simplifies creting large amount of [HTMLElements](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement).

Features:
1. Logical element nesting
2. Setting attributes per element
3. Adding event listeners per element

## When to use it?
- You have to dynamically generate html elements, but the need does not justify adding large templating engines.
- You have to add additional logic to generated elements in terms of event listeners.

## Install

In a browser:
```html
<script src="dist/element.min.js"></script>
```

Using npm:
```bash
$ npm install @mladenilic/element.js
```

## Usage
```js
element({
  tagName: '...',       // type of html element – default: 'div'
  attributes: {...},    // attributes to assign to element
  events: {...},        // event handlers to add to element
  content: [...]        // children to append to element
})
```

### tagName
Simply passed to `document.createElement`, if ommited `div` is used.

### attributes
An object of attributes can be passed, to add them to the created element using `element.addAttribute`. 
Each key represents name of the where value is the value of that attribute.

```js
{
  ...
  attributes: {
    class: 'class-1 class-2',
    src: '/images/element.jpg',
    'data-target': '#target'
  },
  ...
}
```

### events
An object containing event handlers to be added to the created element.

In order to pass additional parameters to `element.addEventListener`, define event handler as array of paramets (check example below).

```js
{
  ...
  events: {
    click: (e) => {
      e.preventDefault();
    
      console.log('clicked');
    },
    load: [(e) => {
      console.log('loaded');
    }, { once: true }]
  },
  ...
}
```

### content
Defines the content of the created element. If content is a string, then it is simply added as inner html of created element.
If content is array, then new html element is created for each element of the array.

```js
{
  ...
  content: [{
    tagName: 'span',
    content: 'Hello World'
  }, {
    tagName: 'span',
    content: [{
      tagName: 'span',
      content: [{
        tagName: 'span',
        content: [...]
      }]
    }]
  }],
  ...
}  
```

## Example
```js
element({
  tagName: 'div',
  attributes: {
    class: 'div-class',
    id: 'div-id'
  },
  content: [{
    tagName: 'span',
    content: 'Hello',
    attributes: { style: 'color: #0f0;' },
    events: {
      click: () => {
        console.log('Hello World');
      }
    }
  }, {
    tagName: 'span',
    content: 'World',
    attributes: { style: 'color: #f00;' }
  }]
});
```

results in (with _click_ event listener on first span element):

```html
<div class="div-class" id="div-id">
  <span style="color: #0f0;">Hello</span>
  <span style="color: #f00;">World</span>
</div>
```

## Tests

Browser tests are written using mocha. To run them:
```
$ npm run test
```
then visit **http://localhost:8080/**.
