# package.json에서 logo.svg rename 취소함

### package.json에서 제외함. media는 hash 포함된 이름이 static으로 제공되는 것 허용하기 위해 제외함.

```
"renamer-logo": "renamer --path-element name --find '/(\\w+)\\.[\\d\\w]+/' --replace $1 build/static/media/\*",
```

# 실행

build하여 실행하기
