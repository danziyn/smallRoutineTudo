//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    search_mess: "",
    todos: [
      {
        name: 'Learn HTML',
        control: false
      },
      {
        name: 'Learn JavaScript',
        control: true
      },
      {
        name: 'Learn CSS',
        control: false
      }
    ],
    leftcount: 2,
    // 全选状态
    AllCompleted: false
  },
  // 输入框内容查找
  inputchange(e) {
    // console.log(e.detail)
    this.setData({
      search_mess: e.detail.value
    })
  },
  // 点击回调函数
  btnclick() {
    let todoscopy = this.data.todos
    if(this.data.search_mess) {
      todoscopy.push({
      name: this.data.search_mess,
      control: false
      })
      this.setData({
        todos: todoscopy,
        search_mess: '',
        leftcount: this.data.leftcount += 1
      })
    }    
  },
  // 切换某个任务的选中状态
  controlclick(e) {
    var todos = this.data.todos[e.currentTarget.dataset.index]
    todos.control = !todos.control
    // console.log(this.data.leftcount, todos.control ? -1 : 1, this.data.leftcount + todos.control ? -1 : 1)
    let leftcount = this.data.leftcount + Number(todos.control ? -1 : 1)
    this.setData({
      todos: this.data.todos,
      leftcount: leftcount
    })
  },
  // 全选
  toggleAll() {
    this.data.AllCompleted = !this.data.AllCompleted
    var todos = this.data.todos
    let that = this
    todos.map((item) => {
      item.control = that.data.AllCompleted
    })
    this.setData({
      todos: this.data.todos
    })
  },
  removeitem(e) {
    console.log(e.currentTarget.dataset.index)
    var todos = this.data.todos
    let leftcount = this.data.leftcount
    if(!todos[e.currentTarget.dataset.index].control) {
      leftcount -= 1
    }
    todos.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      todos: this.data.todos,
      leftcount: leftcount
    })
  },
  // 清除完成列表
  clearlist() {
    let todos = this.data.todos.filter((item) => {
      return !item.control
    })
    this.setData({
      todos: todos,
      leftcount: todos.length
    })
  }
})
