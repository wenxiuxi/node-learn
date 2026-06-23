# 基于哪个环境构建的
FROM node:20
# 容器里的工作目录，workdir
WORKDIR /app
# 先复制package.js，安装依赖
COPY package*.json ./
RUN npm install
# 复制所有剩下的代码
COPY . .
# 容器对外暴露的端口
EXPOSE 3000
# 启动命令
CMD ["node","server.js"]