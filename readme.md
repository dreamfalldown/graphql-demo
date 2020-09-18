# typescript + graphql + jest 构建 todolist

### 启动
`npm run start:watch`

### 测试
`npm run test(测试之前要启动服务器)`

### 开发模式
`改变配置文件中的mode(dev和prod)是prod会进行权限验证`

### 测试用输入
```
 query getAll{
   getLists {
     _id,
     title,
     state
   }
 }

 mutation insertOne {
   insertOne(data: {
     title: "打豆豆",
     state: false
   }) {
     _id,
     title,
     state
   }
 }

 mutation updateOne {
   updateOne(
     id: "5f632733acd6c72e0c13f635", 
     state: true
   ) 
 }

 mutation deleteOne {
 	deleteOne(id: "5f632733acd6c72e0c13f635") 
 }
```