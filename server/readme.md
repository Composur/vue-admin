# 如果已安装 Docker

在`server`目录下执行

```
cd ./server
docker-compose up -d
```

配置信息

<table>
<tr>
<td>数据库</td>
<td>MongoDB</td>
</tr>
<tr>
  <td>数据库</td>
  <td>admin</td>
  </tr>
  <tr>
  <td>数据库用户名</td>
  <td>admin</td>
  </tr>
  <tr>
  <td>数据库端口号</td>
  <td>admin</td>
  </tr>
  <tr>
  <td>数据库密码</td>
  <td>无</td>
  </tr>
  </table>
  
# Docker

## 安装

[Mac](https://yeasy.gitbook.io/docker_practice/install/mac)

## 使用

1. 在一个空白目录中，建立一个文本文件，并命名为 [Dockerfile](https://yeasy.gitbook.io/docker_practice/image/build)

2. 添加以下内容

   ```dockerfile
   FROM nginx
   RUN echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html
   ```

3. [启动](https://yeasy.gitbook.io/docker_practice/container/run)

   ```dockerfile
   #.是指向当前路径
   docker run -t -d -p 8080:80 yourname .
   ```

4. [查看](https://yeasy.gitbook.io/docker_practice/image/list)

   1. 查看构建的镜像

      ```dockerfile
      docker images
      ```

   2. 查看启动的镜像

      ```dockerfile
      docker ps
      ```

5. 浏览器访问 `http://localhost:8080/`
