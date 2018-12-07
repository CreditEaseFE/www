# www

[![GPL-3.0](https://img.shields.io/badge/license-GPL--3.0-blue.svg)](LICENSE)
[![Build Status](https://travis-ci.org/mtdhb/www.svg?branch=master)](https://travis-ci.org/mtdhb/www)

<https://mtdhb.org>

## 开发

环境要求 Node.js 9.x 以上，最好是 10.x

```bash
npm i
npm run dev
```

## 发布

```bash
npm run build
```

将生成的 `build/` 目录提交到网站根目录，并在你的静态服务器上做[相关配置](https://github.com/mtdhb/mtdhb/issues/135)
