module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended', // Usa la configuración recomendada de ESLint
    'plugin:vue/recommended', // Usa la configuración recomendada de ESLint para Vue
    'plugin:vue/essential',
    'plugin:vue/strongly-recommended',
  ],
  // Agrega reglas personalizadas si es necesario
  rules: {
    // Ejemplo de regla personalizada: permitir console.log en el código
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // Regla para evitar la barra diagonal de auto-cierre
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
        },
      },
    ],
  },
  parserOptions: {
    ecmaVersion: 2021, // Asegúrate de que estás utilizando una versión de ECMAScript compatible con import
    sourceType: 'module', // Permite la sintaxis de módulos ES6
  },
}
