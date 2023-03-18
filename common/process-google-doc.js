import imageDataURI from "image-data-uri";
const lookupImgObject = async (id, objects) => {
  if (objects[id]){
    const object = objects[id]. inlineObjectProperties.embeddedObject;
    const dataURI = await imageDataURI.encodeFromURL(object.imageProperties.contentUri);
    return {
      uri: dataURI,
      h: object.size.height.magnitude,
      w: object.size.width.magnitude,
    };
  }
}

const createImage = async (id, objects) => {
  const imgData = await lookupImgObject(id,objects);
  return `<img style="max-height: ${imgData.h/20}em; max-width: ${imgData.w/20}em;" src="${imgData.uri}" />`
}

const decorateContent = (content, textStyle) => {
  let decorations = [];
  if (textStyle.underline) decorations.push("underline");
  if (textStyle.bold) decorations.push("bold");
  if (textStyle.italic) decorations.push("italicdecorator")
  const openTags = decorations.map((dec) => `<${dec}>`).join("");
  const closeTags = decorations.map((dec) => `</${dec}>`).join("");
  return `${openTags}${content}${closeTags}`;
}

const createLink = (content, link) => {
  return `<a href=${link.url} rel="noreferrer noopener" target="_blank">${content}</a>`;
}

const createElement = async (el, objects) => {
  const {textRun, inlineObjectElement } = {...el};
  const { content, textStyle } = {...textRun};
  if(content){
    const decoratedContent = decorateContent(content, textStyle);
    if(textStyle.link && textStyle.link.url){
      return createLink(decoratedContent, textStyle.link);
    } else {
      return decoratedContent;
    }
  } else if (inlineObjectElement){
    const id = inlineObjectElement.inlineObjectId;
    return createImage(id, objects);
  }
};

const createParagraph = async (par, objects) => {
  let elementPromises = [];
  par.elements.forEach((el) => {
    elementPromises.push(createElement(el, objects));
  });
  return Promise.all(elementPromises)
    .then((elements) => {
      const namedStyleMap = (name) => {
        const namedStyleList = {
          NORMAL_TEXT: "p",
          TITLE: "h1",
          HEADING_1: "h1",
          SUBTITLE: "h1",
          HEADING_2: "h2",
          HEADING_3: "h2",
        };
        let mappedStyle = namedStyleList[name];
        return mappedStyle ? mappedStyle : "p";
      };
      let parType;
      if(par.bullet){
        parType = "li";
      } else {
        parType = namedStyleMap(par.paragraphStyle.namedStyleType);
      }
      return `<${parType}>${elements.join("")}</${parType}>`;
    })
    .catch((e) => console.log(e));
};

const processData = async (data) => {
  // const dataURI = await imageDataURI.encodeFromURL(
  //   "https://lh6.googleusercontent.com/o0-w-2KVX__k1AotlCG6ytaccWA39dYbZMDWImtkIYbMdxL_GY7O_BfhIlsxO4etKf-AfQs3RgLb3BJ06KriCtHPJSJjOoolJWe2pe2kbMzI2rI3bgoiQB7h9l4STiUq1ygNC13MxmQVrW2hNWSuAhcFvRmwlngr"
  // );
  // let output = {
  // ...data,
  //uri: dataURI
  // };
  let outputPromises = [];
  const content = data.body.content;
  const objects = data.inlineObjects;
  Object.values(content).forEach((docItem) => {
    const par = docItem.paragraph;
    if (par && par.elements) {
      outputPromises.push(createParagraph(par, objects));
    }
  });

  return Promise.all(outputPromises)
    .then((paragraphs) => paragraphs)
    .catch((e) => console.log(e));
};

export default processData;