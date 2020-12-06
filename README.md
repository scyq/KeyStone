# 软件界面原型自动生成器

**Author:** 

@scyq 

@ShengqiCao

**Content**

- [软件界面原型自动生成器](#软件界面原型自动生成器)
  - [Files](#files)



## How to Use

0. 本项目暂时没有搭建后端服务器，前端暂时由GitHub Pages托管，后端请自行在本地搭建服务器配合使用。

1. 确保您的机器联网且**安装了Python3**；

2. 安装Python3依赖`fastapi`和`uvicorn`（如果确保机器有以下的库，可跳过）

   1. ```shell
      pip install fastapi
      ```

   2. ```shell
      pip install uvicorn
      ```

3. 如果想要在本地机器使用前端，则遵循3.1。如果想直接查看我们部署的前端，只需要配合您搭建的本地服务器，请遵循3.2。

   1. **前端运行在本地机器上**

      1. Clone 本仓库；

      2. 确保您的电脑**有node**；

      3. 进入项目根目录后，在终端输入

      4. ```shell
         cd react_component
         npm install --dependencies
         .... 安装完毕后 ....
         cd ..
         ./run.sh
         ```

      5. 至此，本地后端服务器已经在本地运行了

      6. 在项目根目录下，在终端输入

      7. ```shell
         cd react_component
         npm start 
         ```

      8. 可以看见已经成功打开了新的网页，**hope you like it!**

   2. **前端使用我们部署的GitHub Pages**

      1. 前端在[GitHub Pages](https://scyq.github.io/Software-Interface-Prototype-Automatic-Generator/)可以直接访问，在没有建立本地服务器的情况下，只能静态功能，无法实现自定义功能；

      2. 打开终端输入

      3. ```shell
         uvicorn main:app --reload --port 9999
         ```

      4. 已经可以在网页端愉快的使用了，**hope you like it!**

   以上步骤，对源码和网络熟悉的使用者可以自行修改NaviBar.js中的后端端口和本地服务器的后端端口进行通信。或者将后端代码部署在自己的服务器上进行通信。

   未来会部署在服务器上，免去繁琐的安装过程。

   以上步骤如果出现问题，请务必确保Python3、fastapi、uvicore、node的正确安装。

## Files

*Ignore the node_modules*

- run.sh 运行本地服务器的脚本



## Framework

- React
  - Material-UI
- fastapi
- http.server



## Algorithm

- Color Thief
  - 颜色提取算法

