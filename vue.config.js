module.exports = {
    rules: [
        {
            test: /\.svg$/,
            loader: 'vue-svg-loader',
        },
    ],
    css: {
        loaderOptions: {
            // pass options to sass-loader
            sass: {
                // @/ is an alias to src/
                // so this assumes you have a file named `src/variables.scss`
                data: `
        @import "@/assets/scss/modules/_mixins.scss";
        @import "@/assets/scss/modules/_colors.scss";
        @import "@/assets/scss/modules/_variables.scss";
        `
            }
        }
    }
};
