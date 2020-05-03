import React, { Component } from 'react';
import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react'
import { API, graphqlOperation } from 'aws-amplify';
import { listTodos } from './graphql/queries';
import { createTodo } from './graphql/mutations';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      todoList: []
    }
  }

  componentDidMount(){
    this.getAllTodo();
  }

  getAllTodo = async () => {
    // const todo = await API.graphql({
    //   query: createTodo,
    //   variables: {input: { todo: "example todo 4"}},
    //   // authMode: 'AWS_IAM'
    // });
    // console.log(todo)
    const allTodo = await API.graphql(graphqlOperation(listTodos))
    this.setState({todoList: allTodo.data.listTodos.items})
    console.log(allTodo)
  }

  render(){
    const {todoList} = this.state
    return (
      <div className="App">
        <header className="App-header">
          <h1>Todo List</h1>
          {todoList && todoList.map(todo => <p>{todo.todo}</p>)}
        </header>
      </div>
    )
  }
}

export default withAuthenticator(App);
