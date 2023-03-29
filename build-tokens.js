const { registerTransforms } = require('@tokens-studio/sd-transforms');
const StyleDictionary = require('style-dictionary');

registerTransforms(StyleDictionary);

const sd = StyleDictionary.extend({
  source: ['tokens/out.json'],
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
          destination: 'global.css',
          format: 'css/variables',
          selector: ':root',
          options: {
            outputReferences: true
          }
        },
      ],
    },
    /*"android": {
      "transforms": ["attribute/cti", "name/cti/snake", "color/hex", "size/remToSp", "size/remToDp"],
      "buildPath": "build/android/src/main/res/values/",
      "files": [{
        "destination": "global.xml",
        "format": "android/colors"
      }]
    },*/
  },
});

sd.cleanAllPlatforms();
sd.buildAllPlatforms();