const createElement = (namespace, tagName) => {
  if (namespace && namespace.length > 0) {
    return document.createElementNS(namespace, tagName);
  }

  return document.createElement(tagName || 'div');
};

const setAttribute = (node, namespace, name, value) => {
  if (namespace && namespace.length > 0) {
    return node.setAttributeNS(namespace, name, value);
  }

  return node.setAttribute(name, value);
};

const element = ({ tagName = '', content = [], attributes = {}, events = {}, namespace = '' } = {}) => {
  let node = createElement(namespace, tagName);

  Object.keys(attributes).forEach((key) => setAttribute(node, namespace, key, attributes[key]));
  Object.keys(events).forEach((event) => node.addEventListener(...[event].concat(events[event])));

  if (typeof content === 'string') {
    node.innerHTML = content;
  } else if (Array.isArray(content) && content.length > 0) {
    content.forEach((child) => node.append(element(child)));
  }

  return node;
};

export default element;
