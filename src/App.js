import React, {Component} from 'react';

import 'react-sortable-tree/style.css';
import SortableTree from "react-sortable-tree";
// import writeJsonFile from 'write-json-file';
import download from 'downloadjs';

import './app.css';

export default class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            treeData: [
              { title: "Apple" 
              },
              {
                title: 'Mango'
              }
            ],
            fruits: ["Bananna", "Grape", "Jackfruit", "Pineable", "Avocado"]
        };
    }

    downloadTree = () => {
        console.log('Sup')
        let obj = this.state.treeData;
        var data = JSON.stringify(obj);
        download(data, "tree.json", "text/plain");
    }

    addToTree = (fruit) => {
        let fruitObj = {
            title: fruit
        }
        let fruits = this.state.fruits.filter((k) => {
            return k !== fruit;
        })
        this.setState({ fruits: fruits, treeData: [...this.state.treeData, fruitObj] })
    }

    render(){
        const fruits = this.state.fruits;
        const listItems = fruits.map((fruit) =>
            <span key={fruit.title}>
                | {fruit} <button onClick={() => this.addToTree(fruit)}>+</button> | 
            </span>
        );

        return(
            <div>
                <div >
                    {listItems}
                </div>
                <div >
                    {/* Hey YO  */}
                    <div style={{ height: 500 }}>
                        <SortableTree
                            treeData={this.state.treeData}
                            onChange={treeData => this.setState({ treeData })}
                        />
                    </div>
                </div>
                <div>
                    <button onClick={this.downloadTree}>Download Tree</button>
                </div>
            </div>
        )
    }
}