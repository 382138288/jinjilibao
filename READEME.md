## 项目结构 
    
## 环境搭建
    工具node  npm  gulp  bower
    1、npm install（建议用cnpm）
    2、bower install
    3、gulp

## 代码提交    
    1、代码提交时请忽略文件夹node_modules和src/bower_components

    2、打包发布时仅提交文件夹dist

## gulp-asset-rev
    执行npm install后需要修改该插件源文件中index.js   第80行替换为
    src = src.replace(verStr, '') + verStr;

## 资源引用
    为了解决缓存问题，配合gulp-asset-rev插件，资源引用均使用绝对路径，如：
        1、scss中 background: url('/images/home/foot banner.png');
        2、html中 <script src="/main.js"></script>

## sass compass 在 gulp 下的错误:
#   events.js:163
#      throw er; // Unhandled 'error' event
#     ^
##  Error: You need to have Ruby and Compass installed and in your system PATH for this task to work.
#解决方案：
    ruby下载地址：https://rubyinstaller.org/downloads/
    ruby版本：Ruby 2.5.0-1 (x64) 
    安装时勾选 UTF-8 选项 
    安装完成后 Ruby环境下安装 sass & compass ： 
        gem install sass
		gem install compass

## bower 安装
    npm install bower
    bower install 的内容依赖需要到index.html 中加载进来

## 项目说明

1) 样式环境使用Ruby环境下统一编译sass文件的方式
2) 直接生产环境开发：
		反向代理使用NGXIN
		ngxin设置：
			打开 nginx/conf/nginx.conf 文件
			1—— code 60 - 64
				upstream pc{
			        server 后台服务器地址;
			    }
			2—— code 77 - 78
				 set $htdocs 前端项目路径\dist 文件;
        		 listen 前台访问端口号;



## 文件部署功能注解
		文件：src
				|
				|_ css : 样式
				|			
				|_ fonts:文字图标
				|
				|_ html : 页面切片
				|
				|_ images : 静态图片资源
				|
				|_ js : 代码
				|
				|_ static : baidu分享插件
				|
				|_ vendor : 插件组件依赖

## 頁面sass注入
	需要在路徑 src\sass\screen.scss 中 import 你所添加的局部sass文件，文件名需要加 "_" , gulp 就只更新screen主文件变化



