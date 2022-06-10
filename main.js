/* 
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


var path = require('path');
var fs = require('fs');
var url = require('url');
*/

/*
 * https://github.com/microsoft/vscode/blob/ca4ceeb87d4ff935c52a7af0671ed9779657e7bd/extensions/markdown-language-features/src/slugify.ts#L26
 */
function Slug(string) {
  try {
    var stg = encodeURI(
      string.trim()
            .toLowerCase()
            .replace(/\s+/g, '-') // Replace whitespace with -
            .replace(/[\]\[\!\'\#\$\%\&\(\)\*\+\,\.\/\:\;\<\=\>\?\@\\\^\_\{\|\}\~\`。，、；：？！…—·ˉ¨‘’“”々～‖∶＂＇｀｜〃〔〕〈〉《》「」『』．〖〗【】（）［］｛｝]/g, '') // Remove known punctuators
            .replace(/^\-+/, '') // Remove leading -
            .replace(/\-+$/, '') // Remove trailing -
    );
    return stg;
  } catch (error) {
    showErrorMessage('Slug()', error);
  }
}

function makeHtml(data, title, depth) {
  try {
    // relative link to top directory
    var relativeLink = '../'.repeat(depth);
  
    // read styles
    var css_href = path.join('./', relativeLink, 'templates', 'style.css');
    var style = '<link rel=\"stylesheet\" href=\"' + css_href + '\" type=\"text/css\">';
    // style += readStyles(uri);

    // read template
    var templateFilename = path.join(__dirname, 'templates', 'template.html');
    var template = fs.readFileSync(templateFilename.replace(/^file:\/\//, ''), 'utf-8');

    // compile template
    var mustache = require('mustache');

    var view = {
      title: title,
      style: style,
      content: data,
      relativeToTop: relativeLink,
    };
    return mustache.render(template, view);
  } catch (error) {
    console.log('ERROR on makeHtml()', error);
  }
}


function convertMarkdownToHtml(filepath, text) {
  var grayMatter = require("gray-matter");
  var matterParts = grayMatter(text);

  try {
    // create `markdown-it` instance as `md`
    // using highlight.js
    try {
      var hljs = require('highlight.js');
      var md = require('markdown-it')({
        html: true,
        breaks: true,
        // linkify: true,
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              str = hljs.highlight(lang, str, true).value;
            } catch (error) {
              str = md.utils.escapeHtml(str);

              showErrorMessage('markdown-it:highlight', error);
            }
          // no `lang` provided or failed to get language by highlight.js
          } else {
            str = md.utils.escapeHtml(str);
          }
          return '<pre class="hljs"><code><div>' + str + '</div></code></pre>';
        }
      });
    } catch (error) {
      showErrorMessage('markdown-it', error);
    }

    try {
      var defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
      };
    } catch (error) {
      showErrorMessage('defaultRender return renderToken', error);
    }
    
    try {
      md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
        // convert extension `.md` to `.html`
        var token = tokens[idx];
        // console.log(token);
        var href = token.attrs[token.attrIndex('href')][1];
        var href_parts = url.parse(href, true);
        // if href_parts.href startwith 'mailto:'
        // add path
        if (href_parts.href.startsWith('mailto:')) {
          // console.log('mailto: href_parts', href_parts);
          return defaultRender(tokens, idx, options, env, self);
        }

        if (href_parts.href.startsWith('#')) {
          // console.log('before href_parts', href_parts);
          var filename = path.basename(filepath);
          href_parts.href = filename + href_parts.hash;
          href_parts.path = href_parts.href;
          // console.log('after href_parts', href_parts);

          return defaultRender(tokens, idx, options, env, self);
        }

        var ext = path.extname(href_parts.pathname);
        if (ext === '.md') {
          href_parts.pathname = href_parts.pathname.replace(ext, '.html');
          href = url.format(href_parts);
          token.attrs[token.attrIndex('href')][1] = href;
        }

        // add `target="_blank"` rel="noopener" if href is external
        var href_parts = url.parse(href, true);
        // host takes null value if href is relative
        if (href_parts.host) {
          // If you are sure other plugins can't add `target` - drop check below
          const aIndex = tokens[idx].attrIndex('target');
        
          if (aIndex < 0) {
            tokens[idx].attrPush(['target', '_blank']); // add new attribute
          } else {
            tokens[idx].attrs[aIndex][1] = '_blank';    // replace value of existing attr
          }

          // add rel noopener to prevent clickjacking
          const relIndex = tokens[idx].attrIndex("rel");

          if (relIndex < 0) {
            tokens[idx].attrPush(["rel", "noopener"]);
          } else {
            tokens[idx].attrs[relIndex][1] = "noopener";
          }
        }
        
        // pass token to default renderer.
        return defaultRender(tokens, idx, options, env, self);
      };
    } catch (error) {
      showErrorMessage('md.renderer.rules.link_open', error);
    }

    // convert the img src of the markdown
    // var defaultRender = md.renderer.rules.image;
    try {
      md.renderer.rules.image = function (tokens, idx, options, env, self) {
        var token = tokens[idx];
        var href = token.attrs[token.attrIndex('src')][1];
        href = decodeURIComponent(href).replace(/("|')/g, '');
        token.attrs[token.attrIndex('src')][1] = href;
        // set alt
        token.attrs[token.attrIndex('alt')][1] = token.content;

        // pass token to default renderer.
        return defaultRender(tokens, idx, options, env, self);
      };
    } catch (error) {
      showErrorMessage('markdown-it:image', error);
    }

    
    // convert the link href of the markdown
    // extension of the link
    // `.md` to `.html`
    // var linkdefaultRender = md.renderer.rules.link_open;
    // md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
      
    //   // pass token to default renderer.
    //   return defaultRender(tokens, idx, options, env, self);
    // };

    // checkbox
    try {
      md.use(require('markdown-it-checkbox'));
    } catch (error) {
      showErrorMessage('markdown-it-checkbox', error);
    }

    // emoji
    try {
      var emojies_defs = require(path.join(__dirname, 'data', 'emoji.json'));
        var options = {
          defs: emojies_defs
        };
      md.use(require('markdown-it-emoji'), options);
      md.renderer.rules.emoji = function (token, idx) {
        var emoji = token[idx].markup;
        var emojipath = path.join(__dirname, 'node_modules', 'emoji-images', 'pngs', emoji + '.png');
        var emojidata = fs.readFileSync(emojipath, null).toString('base64');
        if (emojidata) {
          return '<img class="emoji" alt="' + emoji + '" src="data:image/png;base64,' + emojidata + '" />';
        } else {
          return ':' + emoji + ':';
        }
      };
    } catch (error) {
      showErrorMessage('markdown-it-emoji', error);
    }

    // toc
    // https://github.com/leff/markdown-it-named-headers
    try {
      var options = {
        slugify: Slug
      }
      md.use(require('markdown-it-named-headers'), options);
    } catch (error) {
      showErrorMessage('markdown-it-named-headers', error);
    }

    // markdown-it-container
    // https://github.com/markdown-it/markdown-it-container
    try {
      md.use(require('markdown-it-container'), '', {
        validate: function (name) {
          return name.trim().length;
        },
        render: function (tokens, idx) {
          if (tokens[idx].info.trim() !== '') {
            return `<div class="${tokens[idx].info.trim()}">\n`;
          } else {
            return `</div>\n`;
          }
        }
      });
    } catch (error) {
      showErrorMessage('markdown-it-container', error);
    }

    try {
      md.use(require("markdown-it-include"), {
        root: path.dirname(filepath),
        includeRe: /:\[.+\]\((.+\..+)\)/i
      });
    } catch (error) {
      showErrorMessage('markdown-it-include', error);
    }

    try {
      return md.render(matterParts.content);
    } catch (error) {
      showErrorMessage('markdown-it render', error);
    }

  } catch (error) {
    showErrorMessage('convertMarkdownToHtml()', error);
  }
}

function exportHtml(data, filename) {
  fs.writeFile(filename, data, 'utf-8', function (error) {
    if (error) {
      showErrorMessage('exportHtml()', error);
      return;
    }
  });
}

function showErrorMessage(title, error) {
  console.error('ERROR', title + ': ' + error);
}


function walkDir(dir, exportDir, depth) {
  var dirEntry = fs.readdirSync(dir);
  for (var i = 0; i < dirEntry.length; i++) {
    var filename = dirEntry[i];
    var filepath = path.join(dir, filename);
    var exportfilepath = path.join(exportDir, filename);
    var filenameWithoutExt = path.basename(filename, path.extname(filename));

    if (fs.statSync(filepath).isDirectory()) {
      walkDir(filepath, exportfilepath, depth + 1);
    } else {
      if (path.extname(filepath) === '.md') {
        var mdtext = fs.readFileSync(filepath, 'utf-8');
        var html = makeHtml(convertMarkdownToHtml(filepath, mdtext), filenameWithoutExt, depth);

        var exportFilepath = path.join(exportDir, path.basename(filename, '.md') + '.html');
        if (!fs.existsSync(exportFilepath)) {
          // mkdir
          fs.mkdirSync(path.dirname(exportFilepath), { recursive: true });
        }

        exportHtml(html, exportFilepath);
      }
    }
  }
}

// main
const mdfilesDirName = 'mdfiles';
const exportHtmlDirName = 'docs';
function main() {
  var mdfilesDir = path.join(__dirname, mdfilesDirName);
  var exportHtmlDir = path.join(__dirname, exportHtmlDirName);
  if (!fs.existsSync(mdfilesDir)) {
    showErrorMessage('main()', 'mdfiles directory does not exist.');
    return;
  }
  if (!fs.existsSync(exportHtmlDir)) {
    showErrorMessage('main()', 'html directory does not exist.');
    return;
  }

  var depth = 0;
  walkDir(mdfilesDir, exportHtmlDir, depth);
}

main();
