
import Vue from 'vue'
import './style.css'
import AV from 'leancloud-storage'

var APP_ID = 'HKdGCYqLWA5XNUuLfGECqY2i-gzGzoHsz';
var APP_KEY = 'yEOXDSvH1pLVtsXes7eldicF';

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
        window.onbeforeunload = ()=>{
	        let listDataStr=JSON.stringify(this.todoList)
            let inputDataStr=JSON.stringify(this.newTodo)
            window.localStorage.setItem('myTodos',listDataStr)
            window.localStorage.setItem('myNewTo',inputDataStr)

            let signDataStr=JSON.stringify(this.msg)
            window.localStorage.setItem('mySign',signDataStr)
        }
        let oldListStr=window.localStorage.getItem('myTodos')
        let oldListData=JSON.parse(oldListStr)
        let oldInputStr=window.localStorage.getItem('myNewTo')
        let oldInputData=JSON.parse(oldInputStr)
        this.todoList=oldListData || []
        this.newTodo=oldInputData || ''

        let oldSign=window.localStorage.getItem('mySign')
        let oldSingData=JSON.parse(oldSign)
        this.msg=oldSingData||''

        this.currentUser=this.getCurrentUser()

    },
    methods:{
	    addTodo:function(){
	        let date=new Date()
            let time = setTime(date)
            console.log(this.newTodo)
            if(this.newTodo != ''){
                this.todoList.push({
                    title:this.newTodo,
                    createdAt:time,
                    done: false
                })
            }
            console.log(this.createdAt)
            this.newTodo=''
        },
        removeTodo:function(todo){
	        let index=this.todoList.indexOf(todo)
            this.todoList.splice(index,1)
        },
        signUp:function(){
            let user = new AV.User()
            user.setUsername(this.formData.username)
            user.setPassword(this.formData.password)
            user.signUp().then((loginedUser) =>{
                this.currentUser = this.getCurrentUser()
                this.msg=loginedUser.getUsername()
            }, function (error) {
                alert('注册失败')
            });
        },
        login:function(){
            AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser) => {
                this.currentUser = this.getCurrentUser()
                console.log(loginedUser.getUsername())
                this.msg=this.formData.username
            }, function (error) {
                alert('登录失败')
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
        test:function(){
            console.log(this.formData.username)
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
