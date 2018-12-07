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

将生成的 `build/` 目录提交到网站根目录，并在你的静态服务器上做以下配置：

### nginx

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

或

```nginx
error_page 404 =200 /index.html;
```

### apache

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```
