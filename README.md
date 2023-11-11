# Description
This project is being to developed to allow for the batch automation of photos
being grouped based on the faces within the image. The project will use face-api.js

Identified Bugs:
    When uploading a duplicate image, it overrides within the bucket but adds an additional
    reference to the profiles imageRefs causing the image to be called twice

Current Features:

Potential Features:
    File upload
    Bulk file upload
    Alternate file types ie .heic, need to verify if works on its own

    Facial recognition
    Face library
    Firebase backend for face library?

    Image grouping/tagging based on recognised faces
    To be processed stack for unrecognised faces

    Creating new entries based on the face library
    Viewing the face library
    Image cropping to mimimise waste within the face library
    Adding to the face library
    Verifying faces match within the face library

To be considered:
    Animal detection
    Similar photo detection
    Video detection

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
