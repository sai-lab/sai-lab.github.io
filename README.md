# md-html

convert markdown to html

nested markdown supported

## usage

1. locate markdown files to `mdfiles/*`

1. install dependencies

    ```
    ./node.sh npm install
    ```

1. convert

    ```
    ./node.sh npm start
    ```

1. html file is exported to `html/*`

## tips

to write the link that containes space, use `-` instead of space.  
like:

```
X [space in link](#space in link)

O [space in link](#space-in-link)
```

newline script:

1. trim trailing white space
1. search pattern: `^[^<\n# -][^\n]+\n`
1. select all: `Ctrl+Shift+L`
1. `→` `←` `SpaceSpace`

## special thanks

Most of the code is appropriated from this repository.

[vscode-markdown-pdf](https://github.com/yzane/vscode-markdown-pdf)
