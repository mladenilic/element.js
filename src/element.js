const element = ({ tagName = '', content = [], attributes = {}, events = {} } = {}) => {
  let node = document.createElement(tagName || 'div');

  Object.keys(attributes).forEach((key) => node.setAttribute(key, attributes[key]));
  Object.keys(events).forEach((event) => node.addEventListener(event, events[event]));

  if (typeof content === 'string') {
    node.innerHTML = content;
  } else if (Array.isArray(content) && content.length > 0) {
    content.forEach((child) => node.append(element(child)));
  }

  return node;
};

export default element;
