# ImmersiveKorean Github Actions Repository

## Using actions
```
name: Setup ImmersiveKorean environment

on:
  - deployment

jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-18.04
    steps:
    - uses: actions/checkout@v1
    - uses: actions/checkout@v1
      with:
        repository: ImmersiveKorean/actions
```
