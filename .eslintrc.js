module.exports = {
    env: {
        node: true,
    },
    extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "plugin:vue/vue3-essential", "prettier"],
    rules: {
        "vue/require-default-prop": "off",
    },
};
