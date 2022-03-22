/* eslint-disable */
const PATH = require('path');
const dirTree = require("directory-tree-md");
import att from "../constants/attributes.json";

const AttributeOptions = (() => {

  const ROOT_DIR =
    __dirname.indexOf("directory-script") > -1
      ? "../texturepunx-web/src/assets/"
      : "../../";
  const ATTR_DIR = ROOT_DIR + "images/ui/character-creator/attributes";

  var categories = {};
console.log(ATTR_DIR);
try {
  const tree = dirTree(ATTR_DIR, null, null, (item, PATH, stats) => {
    console.log(item);
    const absPath = item.path
      .split("/")
      .slice(item.path.split("/").indexOf("src") + 1)
      .join("/");

    const category = {
      name: item.name,
      options: item.children.map((option, i) => {
        return {
          fileName: option.name,
          name: option.name
            .replace(option.extension, "")
            .replace(item.name, ""),
          path: absPath + "/" + option.name,
        };
      }),
    };
    categories[category.name] = category;
  });
} catch(e) {
  console.log(e);
}
  return categories;
})();

const defaultAttributes = {
  ANTENNA: "",
  BACKGROUNDS:"BACKGROUND",
  BEARDS: "",
  BINDI: "",
  CHOKERS: "",
  DEVO: "",
  EYES: "",
  HAIR: "",
  HEADPHONES: "",
  HEADS: "white regular",
  HOODIES: "",
  MASKBOTTOM: "",
  MASKS: "",
  MOUTHS: "",
  NOSES: "",
  ROBOTHEAD: "",
  ROBOTNECK: "",
  VAPES: "",
};

const generateCss = () => {

  let css = "";
  let keys = Object.keys(att);

  for (var i = 0; i < keys.length; i++) {
    let sectCss = "";
    let base = " #" + att[keys[i]].name;
    att[keys[i]].options.map((opt, i) => {
      sectCss +=
        base + " " + opt.name + "{background-image:url(" + opt.path + ")}";
    });
    console.log(sectCss);
    css = css + sectCss;
  }
  return css;
}

export { AttributeOptions, defaultAttributes };
