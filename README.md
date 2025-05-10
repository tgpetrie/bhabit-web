# BHABIT Web App

This is the official React-based web app for BHABIT – the rebellious, chaotic memecoin project.

## Features

- AOS animations for smooth UI transitions
- BHABIT branding & styling
- Ready for Vercel or GitHub Pages deployment

## Install & Run

```bash
npm install
npm start
```

## Build for Production

```bash
npm run build
```

## Fix Audit Warnings

```bash
npm audit fix
npm audit fix --force  # optional, may break things
```

## Patch Instructions

If you encounter issues with outdated loaders or packages:
```bash
npm install @svgr/webpack@6.5.1 --save-dev
npm install resolve-url-loader@5.0.0 --save-dev
npm install --save-dev patch-package postinstall-postinstall
npx patch-package svgo css-select resolve-url-loader
```

Then rerun:
```bash
npm run build
```