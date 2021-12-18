# 실행하기

## Reactjs와 django 따로 시행

src 폴더로 이동하여 runserver 시행

```
cd src
python manage.py runserver
```

src > react 폴더로 이동하여 yarn start 혹은 npm start

```
cd react
yarn start
```

## Reactjs 파일 build하여 django에서 시행

Reactjs 파일 build한 후 django static folder로 이동시켜야 함

react 폴더로 이동한 후 아래 코드 시행

```
yarn collect-dev
```

만약 production 단계라면 collectstatic까지 같이 시행해야 함
이를 위해 아래 코드 시행

```
yarn collect
```

# package.json

scripts 부분에서 renamer와 copyfiles를 이용하여 js, css, media 파일을 django static folder로 이동시킴

collectstatic script는 production 단계에서 nginx에게 제공할 static file을 만듬

```
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject",
    "collect": "react-scripts build && npm run build-rename && npm run copy-buildfiles && npm run collectstatic",
    "collect-dev": "react-scripts build && npm run build-renamer && npm run copy-build",
    "build-renamer": "npm run renamer-js && npm run renamer-css",
    "renamer-css": "renamer --path-element name --find '/main\\.[\\d\\w]+/' --replace react_ui build/static/css/*.css",
    "renamer-js": "renamer --path-element name --find '/main\\.[\\d\\w]+/' --replace react_ui build/static/js/*.js",
    "copy-build": "npm run rm-media && npm run copy-media && npm run copy-css && npm run copy-js",
    "rm-media": "rimraf ../staticfiles/media/*",
    "copy-media": "copyfiles -f build/static/media/* ../staticfiles/media/",
    "copy-js": "copyfiles -f build/static/js/*.js ../staticfiles/js/",
    "copy-css": "copyfiles -f build/static/css/*.css ../staticfiles/css/",
    "collectstatic": "python ../manage.py collectstatic --no-input"
  }

```

아래 항목은 package.json에서 제외함.
media는 hash 포함된 이름이 static으로 제공되는 것 허용해 볼 예정
다른 방법이 있을지 확인 필요

```
    "renamer-logo": "renamer --path-element name --find '/([\\w\\d]+)\\.[\\d\\w]+/' --replace $1 build/static/media/\*",
```
