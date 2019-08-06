const createElement = (namespace, tagName) => {
  if (namespace && namespace.length > 0) {
    return document.createElementNS(namespace, tagName);
  }

  return document.createElement(tagName || 'div');
};

const setAttribute = (node, name, value) => {
  if (typeof value === 'object' && !!value && value.namespace) {
    return node.setAttributeNS(value.namespace, name, value.value);
  }

  return node.setAttribute(name, value);
};

const render = ({ tagName = '', content = [], attributes = {}, events = {}, ref = {}, namespace = '' } = {}) => {
  let node = createElement(namespace, tagName);

  Object.keys(attributes).forEach((key) => setAttribute(node, key, attributes[key]));
  Object.keys(events).forEach((event) => node.addEventListener(...[event].concat(events[event])));

  if (typeof content === 'string') {
    node.innerHTML = content;
  } else if (Array.isArray(content) && content.length > 0) {
    content.forEach((child) => node.append(render(child)));
  }

  ref.current = node;

  return node;
};

const ref = () => {
  return Object.seal({ current: null });
};

export default { render, ref };
export { render, ref };
