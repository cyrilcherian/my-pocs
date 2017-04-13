import React, { Component } from 'react';
class TodoList extends Component {
    constructor() {
        super();
        this.state = { items: [] };
    }
    componentWillMount() {
        fetch("http://swapi.co/api/people/?format=json", { method: 'get' })
            .then(response => response.json())
            .then(({ count, results }) => { console.log(count, results); this.setState({ items: results }); })
    }
    filter(e){
        this.setState({filter: e.target.value});
    }
    render() {
        let data = this.state.items;
        if (this.state.filter){
            data = data.filter((d) => d.name.toLowerCase().startsWith(this.state.filter.toLowerCase()));
        }
        return (
            <div>
                <ul>
                    {data.map((item) => <li key={item.name}>{item.name}</li>)}
                </ul>
                <input type="text" onChange={this.filter.bind(this)}/>
            </div>

        );
    }
}
export default TodoList;