module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport":{
      viewportWidth: 375,//视窗的宽度，对应设计稿的宽度
      viewportHeight: 667,//视窗的高度，对应设计稿的高度
      unitPrecision: 5,//指定'px'转换为视窗单位值的小数位数(很多时候无法整除)
      viewportUnit: 'vw',//指定需要装换成的视窗单位，建议用vw
      selectorBlackList: ['ignore','tab-bar','tab-bar-item'],//指定不需要装换的类，可以给不需要装换的类加类名ignore，这样就可以直接写一个ignore
      minPixelValue: 1,//小于等于'1px'不装换为视窗单位
      mediaQuery: false,//允许在媒体查询中装换'px'
      exclude:[/Tabbar/]//里面必须使用正则，匹配文件
    }
  }
}
