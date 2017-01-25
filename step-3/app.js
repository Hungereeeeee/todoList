
import Vue from 'vue'
import './style.css'
var app=new Vue({
	el:'#app',
	data:{
		newTodo:'',
        todoList:[]
	},
    created:function(){
	    window.onbeforeunload = ()=>{
	        let listDataStr=JSON.stringify(this.todoList)
            let inputDataStr=JSON.stringify(this.newTodo)
            window.localStorage.setItem('myTodos',listDataStr)
            window.localStorage.setItem('myNewTo',inputDataStr)
        }
        let oldListStr=window.localStorage.getItem('myTodos')
        let oldListData=JSON.parse(oldListStr)
        let oldInputStr=window.localStorage.getItem('myNewTo')
        let oldInputData=JSON.parse(oldInputStr)
        this.todoList=oldListData || []
        this.newTodo=oldInputData || ''
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
