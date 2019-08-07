# FuzHtml
Cross platform tool to fuse multiple child html templates into parent html

The project is a fork of [Simple HTML Template](https://github.com/phonglk/simple-html-template). Originally meant to support only *macOS*.

I have made it cross-platform, so that it could work same on Windows & macOS. I have also introduced a nice CLI to it along with few changes in the structure & way it works. In future, I'm planning to add more features to it. 

## Code usage
You need to use below statement inside your parent html file like this

```html
<include src="./child.html" />
```

Here in the `src` attribute you need to put the path of the child html file.

So that whenever this code gets exectued by *fuzhtml*, the content of the parent html file will replace `<include ... />` tag with the content of child html file.

If there are tabs/spaces before included tag then every line of the replaced content will be prefixed by same spaces/tabs to maintain the indentation.

## CLI usage
You can run the `fuzhtml` command as shown below

### Help
```
$ npx fuzhtml -h
Options:
  -h, --help           show help information
  -v, --version        show version details
  -w, --watch          rebuild in watch mode
  -s, --src            set source directory's path
```
where you'll see the available options.

### Version
```
$ npx fuzhtml -v

 FUZHTML
 Version 2.0.0
 Cross platform tool to fuse multiple child html templates into parent html
    
```

### Compile
```
$ npx fuzhtml -s=./html
```

### Watch & compile
```
$ npx fuzhtml -w -s=./html
```

## Configuration
To customise output of the compilation, please place `fuzhtml.config.json` inside the template folder (such as "./html")

Please take a look at `example/html/fuzhtml.config.json` for example

### Default configuration
```js
{
  "outDir": "./compiled",
  "ignores": [/^partial$/, /^compiled$/, /\.compiled\.html$/],
  "include": /\.html$/,
}
```

## Sample
To compile the existing sample, use this

```
$ node fuzhtml -s=./sample/html/
```

## Purpose
It makes use of chunk of html code by reusing it as html partials.

This especially useful for while building client-side projects in javascript.

Since there is no abnormal syntax that broke your html file although a bit of automation fuses those partials together, so your html file won't look different than regular hmtl file syntax.
