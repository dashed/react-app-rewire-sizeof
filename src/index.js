// @flow

// 3rd-party imports

const { loaderNameMatches, getLoader } = require("react-app-rewired");

// types

type ConfigType = {
    module: {
        rules: {
            // omitted
        }
    }
};

type OptionsType = {
    +before?: (config: ConfigType) => ConfigType,
    +after?: (config: ConfigType) => ConfigType
};

// helpers

function identity<T>(x: T): T {
    return x;
}

const urlLoaderMatcher = function(rule): bool {
    return loaderNameMatches(rule, "url-loader");
};

// rewire

const rewireSizeofLoader = (config: ConfigType, options: OptionsType = {}): ConfigType => {
    const { before = identity, after = identity } = options;

    config = before(config);

    // find url-loader and replace it with sizeof-loader

    const loader_rule = getLoader(config.module.rules, urlLoaderMatcher);
    loader_rule.loader = require.resolve("sizeof-loader");

    config = after(config);

    return config;
};

module.exports = rewireSizeofLoader;
