export default ({ tagName = '', content = [], attributes = {}, events = {} } = {}) => {
  let element = document.createElement(tagName || 'div');

  Object.keys(attributes).forEach((key) => element.setAttribute(key, attributes[key]));
  Object.keys(events).forEach((event) => element.addEventListener(event, events[event]));

  if (typeof content === 'string') {
    element.innerHTML = content;
  } else if (Array.isArray(content) && content.length > 0) {
    content.forEach((child) => element.append(this.html(child)));
  }

  return element;
};
