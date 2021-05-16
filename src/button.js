import React from 'react';

export default class Button extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);

        if(this.props.val === "C" || this.props.val === "CE"){
            this.name = "clean";
        }else if(this.props.val === "BG"){
            this.name = "background-change";
        }else if(typeof this.props.val === "string"){
            this.name = "character";
        }else{
            this.name = "number";
        }
    }

    handleClick(){
        this.props.input(this.props.val);
    }

    render(){
        return(
            <td className={this.name} onClick={this.handleClick}>
                {this.props.val}
            </td>
        );
    }
}