### css-loader
加载css文件，并且转换为commonjs对象
### style-loader
将样式通过<style></style>标签插入到<head>中
```
{
  module:{
    rules:[
      {
        test:/.css/,
        use:[
          "style-loader",
          "css-loader"
        ]
      }
    ]
  }
}
```
### 解析less和Sass
安装less-loader less
因为less-loader是需要依赖less的
npm i less-loader less

```
{
  module:{
    rules:[
      {
        test:/.css/,
        use:[
          "style-loader",
          "css-loader",
          "less-loader"
        ]
      }
    ]
  }
}
```

### 解析图片，字体
#### file-loader
   {
        test:/.(png|jpe?g|gif|webp)$/,
        use:'file-loader'
      },
      {
        test:/.(woff|woff2|eot|ttf|otf)$/,
        use:'file-loader'
      }
修改配置文件的图片规则，添加一个name配置（名称）属性和outputpath属性（位置）：

  {
            test: /\.(png|svg|gif|jpe?g)$/,
            use: {
                loader:'file-loader',
                options:{
                    name: '[name].[hash:6].[ext]',
                    outputPath: 'img'
                }
            }
        }

为什么我的字体并没有生效？

### url-loader
可以解析图片和字体，可以配置较小资源自动base64
{
        test:/.(png|jpe?g|gif|webp)$/,
        use:[{
          loader:'url-loader',
          options:{
            limit:10240
          }
        }]
      },
