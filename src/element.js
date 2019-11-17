const createElement = (namespace, tagName) => {
  if (namespace && namespace.length > 0) {
    return document.createElementNS(namespace, tagName);
  }

  return document.createElement(tagName || 'div');
};

const setAttribute = (node, name, value) => {
  if (typeof value === 'object' && value.namespace) {
    return node.setAttributeNS(value.namespace, name, value.value);
  }

  return node.setAttribute(name, value);
};

const render = ({ content = [], ref = {}, ...options } = {}) => {
  let node = createElement(options.namespace, options.tagName);

  Object.entries(options.style || {}).forEach(([prop, value]) => node.style[prop] = value);
  Object.entries(options.attributes || {}).forEach(([key, value]) => setAttribute(node, key, value));
  Object.entries(options.events || {}).forEach(([event, handler]) => node.addEventListener(...[event].concat(handler)));

  if (typeof content === 'string') {
    node.innerHTML = content;
  } else if (Array.isArray(content) && content.length > 0) {
    content.forEach(child => node.append(render(child)));
  }

  ref.current = node;

  return node;
};

const ref = () => {
  return Object.seal({ current: null });
};

export default { render, ref };
export { render, ref };
