# element.js

_element.js_ is a tiny wrapper around `document.createElement` / `document.createElementNS` which simplifies creating large amount of [HTMLElements](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement).

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

## Methods:

```js
import element from '@mladenilic/element.js';

let ref = element.ref();  // Create reference that can be passed
                          // to `element.render` call

element.render({
  tagName: '...',         // type of html element – default: 'div'
  attributes: {...},      // attributes to assign to element
  style: {...},           // styles assigned to element
  events: {...},          // event handlers to add to element
  content: [...],         // children to append to element
  ref: ref                // Get a reference to created element
});
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

### style
Use style object to apply styles to the created element

```js
{
  ...
  style: {
    display: 'block',
    marginLeft: '20px'
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
    style: { color: '#0f0' },
    events: {
      click: () => {
        console.log('Hello World');
      }
    }
  }, {
    tagName: 'span',
    content: 'World',
    style: { color: '#f00' }
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

## Namespaces
element.js supports creating elements and attributes with specific namespaces which allows generating SVGs as well:
```js
element({
  namespace: 'http://www.w3.org/2000/svg',
  tagName: 'svg',
  content: [{
    namespace: 'http://www.w3.org/2000/svg',
    tagName: 'use',
    attributes: {
      'xlink:href': {
        namespace: 'http://www.w3.org/1999/xlink',
        value: '#icon-star'
      }
    },
  }]
});
```

## Tests

Browser tests are written using mocha. To run them:
```
$ npm run test
```
then visit **http://localhost:8080/**.
