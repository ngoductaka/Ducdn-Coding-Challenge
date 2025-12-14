// Mock transformer for Vanilla Extract .css.ts files in Jest
// This handles styleVariants and other Vanilla Extract exports

module.exports = {
    process() {
        return {
            code: `
        module.exports = new Proxy({}, {
          get(target, prop) {
            if (prop === '__esModule') {
              return true;
            }
            // For styleVariants, return an object with common size keys
            if (prop.includes('Size') || prop.includes('Gap')) {
              return new Proxy({}, {
                get(target, key) {
                  return prop + '_' + key;
                }
              });
            }
            // For regular styles, return the prop name as string
            return prop;
          }
        });
      `,
        };
    },
};
