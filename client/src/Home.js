import { Component } from 'react'
import './Home.css'
import { MdDelete } from 'react-icons/md'

const ItemList = ({ parent, item }) => (
    <div key={item.list_id} className="list">
        <span>
            <a href={"/todo/" + item.list_id}>{item.name}</a>
        </span>
        <span>
            <MdDelete onClick={parent.deleteList.bind(parent, item.list_id)} size={20}/>
        </span>
    </div>
);

const NewTodo = ({}) => (
    <>
    <h3>Add new todo list:</h3>
    <form method="POST" action="/api/todo">
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
    </>
)


class Home extends Component {
    constructor() {
        super()
        this.state = {items: []};
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <div className="app">
            <h3>Todo Lists:</h3>
            <div className="lists">
                    {this.state.items.map(item => (
                            <ItemList item={item} parent={this}/>
                        )
                    )}
            </div>
            <NewTodo />
            </div>
        )
    }

    deleteList(id) {
        fetch('http://localhost:3001/api/todo/list/' + id, {
            method: 'DELETE'
        }).then(response => {
            if (response.status !== 200) {
                throw response.status;
            } else {
                this.setState({items: this.state.items.filter(item => item.list_id !== id)});
            }
        });
    }

    fetchData() {
        fetch(`http://localhost:3001/api/todo/`, {
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
export default Home;
