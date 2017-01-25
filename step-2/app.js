
import Vue from 'vue'

var app=new Vue({
	el:'#app',
	data:{
		message:'Hello World!'
	}
})
var app2=new Vue({
	el:'#app-2',
	data:{
		rawHtml:'<h1>HTML</h1>'
	}
})
var app3 = new Vue({
    el: '#app-3',
    data: {
        message: 'Hello Vue.js!'
    },
    methods: {
        reverseMessage: function () {
            this.message = this.message.split('').reverse().join('')
        }
    }
})
var vm = new Vue({
    el: '#example',
    data: {
        message: 'Hello'
    },//缓存
    computed: {
        // a computed getter
        reversedMessage: function () {
            // `this` points to the vm instance
            return this.message.split('').reverse().join('')
        }
    }
})
var demo = new Vue({
    el: '#demo',
    data: {
        firstName: 'Foo',
        lastName: 'Bar'
    },
    computed: {
        fullName: {
            // getter
            get: function () {
                return this.firstName + ' ' + this.lastName
            },
            // setter
            set: function (newValue) {
                var names = newValue.split(' ')
                this.firstName = names[0]
                this.lastName = names[names.length - 1]
            }
        }
    }
})
var app4=new Vue({
	el:'#app-4',
	data:{
		isActive:true,
		hasError:true,
		styleObject:{
			color:'red',
			fontSize:'13px'
		}
	}
})
var example1 = new Vue({
    el: '#example-1',
    data: {
        xxx: [
            {message: 'Foo' },
            {message: 'Bar' }
        ]
    }
})
var example2 = new Vue({
    el: '#example-2',
    data: {
        counter: 0
    }
})
var example3 = new Vue({
    el: '#example-3',
    data: {
        name: 'Vue.js'
    },
    // 在 `methods` 对象中定义方法
    methods: {
        greet: function (event) {
            // `this` 在方法里指当前 Vue 实例
            console.log('Hello ' + this.name + '!')
            // `event` 是原生 DOM 事件
            console.log(event.target)
        },
        warn: function (message, event) {
            // 现在我们可以访问原生事件对象
            if (event) event.preventDefault()
            alert(message)
        }
    }
})
