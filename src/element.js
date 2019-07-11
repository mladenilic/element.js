const createElement = (namespace, tagName) => {
  if (namespace && namespace.length > 0) {
    return document.createElementNS(namespace, tagName);
  }

  return document.createElement(tagName || 'div');
};

const element = ({ tagName = '', content = [], attributes = {}, events = {}, namespace = '' } = {}) => {
  let node = createElement(namespace, tagName);

  Object.keys(attributes).forEach((key) => node.setAttribute(key, attributes[key]));
  Object.keys(events).forEach((event) => node.addEventListener(...[event].concat(events[event])));

  if (typeof content === 'string') {
    node.innerHTML = content;
  } else if (Array.isArray(content) && content.length > 0) {
    content.forEach((child) => node.append(element(child)));
  }

  return node;
};

export default element;
