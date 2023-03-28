const { registerTransforms } = require('@tokens-studio/sd-transforms');
const StyleDictionary = require('style-dictionary');

StyleDictionary.registerFormat({
  name: 'css/variables',
  formatter: function (dictionary, config) {
    return `${this.selector} {
      ${dictionary.allProperties.map(prop => `  --${prop.name}: ${prop.value};`).join('\n')}
    }`
  }
});

registerTransforms(StyleDictionary);

function sdConfig(src,out,sel) {
    return {source: [src],
    platforms: {
      css: {
        transforms: [
          //'ts/descriptionToComment',
          //'ts/resolveMath',
          //'ts/size/px',
          //'ts/size/letterspacing',
          //'ts/size/lineheight',
          //'ts/type/fontWeight',
          //'ts/color/hexrgba',
          //'ts/color/modifiers',
          'ts/typography/css/shorthand',
          'ts/shadow/shorthand',
          'name/cti/kebab',
        ],
        buildPath: 'build/css/',
        //prefix: 'co',
        files: [
          {
            destination: out,
            format: 'css/variables',
            selector: sel,
            /*options: {
              outputReferences: true
            }*/
          },
        ],
      },
    }
  }
}

StyleDictionary.extend(sdConfig('tokens/out.json','global.css',':root')).buildAllPlatforms();
StyleDictionary.extend(sdConfig('tokens/out-dark.json','dark.css','html[data-theme="dark"]')).buildAllPlatforms();