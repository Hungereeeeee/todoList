
import Vue from 'vue'
import AV from 'leancloud-storage'

var APP_ID = 'duexCuHy6EXqvmhiq0Kr1MvG-gzGzoHsz';
var APP_KEY = 'qtHWW6gW8vfOsnJ5ARNCNfVw';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

var app=new Vue({
	el:'#app',
	data:{
	    actionType:'signUp',
        formData:{
            username:'',
            password:''
        },
		newTodo:'',
        todoList:[],
        currentUser:null,
        msg:''
	},
    created:function(){
        this.currentUser=this.getCurrentUser()
        this.fetchTodos()
    },
    watch:{
        // todoList.done:function(){
        //     this.updateTodos();
        // }
    },
    methods:{
        fetchTodos: function(){
            if(this.currentUser){
                this.msg= this.currentUser.username;
                var query = new AV.Query('AllTodos');
                query.find()
                    .then((todos) => {
                        console.log(todos)
                        let avAllTodos = todos[0]
                        let id = avAllTodos.id
                        this.todoList = JSON.parse(avAllTodos.attributes.content)
                        this.todoList.id = id
                    },function(error){
                        console.error(error)
                    })
            }
        },
        updateTodos:function(){
            let listDataStr=JSON.stringify(this.todoList)
            let AVTodos = AV.Object.createWithoutData('AllTodos',this.todoList.id);
            AVTodos.set('content',listDataStr)
            AVTodos.save().then(() => {
                console.log('更新成功')
            })
        },
        saveTodos:function(){
            let listDataStr=JSON.stringify(this.todoList)
            var AVTodos = AV.Object.extend('AllTodos');
            // 新建一个 Todo 对象
            var avTodos = new AVTodos();

            // 新建一个 ACL 实例
            var acl = new AV.ACL();
            acl.setReadAccess(AV.User.current(),true);
            acl.setWriteAccess(AV.User.current(),true);
            // 将 ACL 实例赋予 Post 对象

            avTodos.set('content', listDataStr);
            avTodos.setACL(acl);
            avTodos.save().then((todo) => {
                // 成功保存之后，执行其他逻辑.
                this.todoList.id = todo.id // 一定要记得把 id 挂到 this.todoList 上，否则下次就不会调用 updateTodos 了
                console.log('保存成功')
            }, function (error) {
                // 异常处理
                alert('保存失败')
            });
        },
        saveOrUpdateTodos: function(){
          if(this.todoList.id){
              this.updateTodos()
          }else{
              this.saveTodos()
          }
        },
	    addTodo:function(){
	        let date=new Date()
            let time = setTime(date)
            if(this.newTodo != ''){
                this.todoList.push({
                    title:this.newTodo,
                    createdAt:time,
                    done: false
                })
            }
            this.newTodo=''
            this.saveOrUpdateTodos()
        },
        removeTodo:function(todo){
	        let index=this.todoList.indexOf(todo)
            this.todoList.splice(index,1)
            this.saveOrUpdateTodos()
        },
        signUp:function(){
            let user = new AV.User()
            user.setUsername(this.formData.username)
            user.setPassword(this.formData.password)
            user.signUp().then((loginedUser) =>{
                this.currentUser = this.getCurrentUser()
                this.msg=loginedUser.getUsername()
            }, function (error) {
                alert(error)
            });
        },
        login:function(){
            AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser) => {
                this.currentUser = this.getCurrentUser()
                console.log(loginedUser.getUsername())
                this.msg=loginedUser.getUsername()
                this.fetchTodos()
            }, function (error) {
                alert(error)
            });
        },
        getCurrentUser:function(){
            let current = AV.User.current()
            if(current){
                let {id, createdAt, attributes: {username}}=current
                return {id, username, createdAt}
            }else{
                return null
            }
        },
        logout:function () {
            AV.User.logOut()
            this.currentUser=null
            window.location.reload()
        },
        finish:function (todo) {
            let index=this.todoList.indexOf(todo)
            this.todoList[index].done=!this.todoList[index].done;
            this.updateTodos()
        }
    }
})
function setTime(date){
    let year =date.getFullYear()
    let month = date.getMonth()+1
    let day = date.getDate()
    let hour= date.getHours()
    let min=date.getMinutes()
    let time = year+'年'+month+'月'+day+'日'+hour+'时'+min+'分'
    return time
}
