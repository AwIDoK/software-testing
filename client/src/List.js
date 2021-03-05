import {Component} from 'react'
import './List.css'


class List extends Component {
    constructor() {
        super()
        this.state = {items: []}
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <div className="app">
            <h3>Todo:</h3>
            <div className="todos">
                    {this.state.items.map(item => (
                            <div key={item.todo_id} className="todo">
                            <span> <button type="button" className={"link-button" + (item.completed ? " done": "")} onClick={this.markTodo.bind(this, item.todo_id, item.completed)}>{item.name}</button></span>
                            </div>
                        )
                    )}
            </div>
            <h3>Add new todo</h3>
            <form method="POST" action={"/api/todo/list/" + this.props.match.params.id}>
                <table>
                    <tbody>
                        <tr>
                            <td><label>Name:</label></td>
                            <td><input type="text" name="name"/></td>
                        </tr>
                    </tbody>
                </table>
                <input type="submit" value="add"/>
            </form>
            </div>
        )
    }

    markTodo(id, completed) {
        fetch('http://localhost:3001/api/todo/list/' + this.props.match.params.id + "/mark", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                todo_id: id,
                completed: !completed
            })
        }).then(response => {
            if (response.status !== 200) {
                throw response.status;
            } else {
                this.fetchData();
            }
        });
    }

    fetchData() {
        fetch(`http://localhost:3001/api/todo/list/` + this.props.match.params.id, {
            accept: 'application/json',
        }).then(response => {
            if (response.status !== 200) {
                throw response.status;
            } else {
                response.json().then(items => {
                    this.setState({items: items})
                })
            }
        });
    }

}
export default List;
