# nodejs 博客 by ACK

# 不支持IE低版本 

# 数据初始化


   db.categories.save({"name" : "首页", "parent" : "", "level" : 0, "url" : "/"})
   db.categories.save({"name" : "Java", "parent" : "首页", "level" : 1, "url" : "/Java"})
   db.categories.save({"name" : "Html", "parent" : "首页", "level" : 1, "url" : "/html"})
   db.categories.save({"name" : "C/C++", "parent" : "首页", "level" : 1, "url" : "/c"})
   db.categories.save({"name" : "数据库", "parent" : "首页", "level" : 1, "url" : "/db"})
   db.categories.save({"name" : "node", "parent" : "首页", "level" : 1, "url" : "/node"})
   db.categories.save({"name" : "生活", "parent" : "首页", "level" : 1, "url" : "/life"})
   
   db.categories.save({"name" : "Spring", "parent" : "Java", "level" : 2, "url" : "/Java/spring"})
   db.categories.save({"name" : "SpringMVC", "parent" : "Java", "level" : 2, "url" : "/Java/springmvc"})
   db.categories.save({"name" : "mybatis", "parent" : "Java", "level" : 2, "url" : "/Java/mybatis"})
   
   db.categories.save({"name" : "JavaScript", "parent" : "Html", "level" : 2, "url" : "/html/js"})
   db.categories.save({"name" : "css", "parent" : "Html", "level" : 2, "url" : "/html/css"})
   
   db.categories.save({"name" : "C", "parent" : "C/C++", "level" : 2, "url" : "/c/c"})
   db.categories.save({"name" : "C++", "parent" : "C/C++", "level" : 2, "url" : "/c/c++"})
   
   db.categories.save({"name" : "mysql", "parent" : "数据库", "level" : 2, "url" : "/db/mysql"})
   db.categories.save({"name" : "mongodb", "parent" : "数据库", "level" : 2, "url" : "/db/mongodb"})
   db.categories.save({"name" : "oracle", "parent" : "数据库", "level" : 2, "url" : "/db/oracle"})
   
   db.categories.save({"name" : "express", "parent" : "node", "level" : 2, "url" : "/node/express"})
   db.categories.save({"name" : "jade", "parent" : "node", "level" : 2, "url" : "/node/jade"})
   
   db.categories.save({"name" : "随笔", "parent" : "生活", "level" : 2, "url" : "/life/jotting"})
   
   db.categories.save({"name" : "关于", "parent" : "首页", "level" : 1, "url" : "/about"})
   
   
   
   
