import React, { Component } from 'react';
import {connect} from 'react-redux';
import Swal from 'sweetalert2'


class Subscribers extends Component{

    state={ 
            query: ['search by first or last name']
        }

    componentDidMount=()=>{
        this.props.dispatch({type: 'GET_CLIENT_LIST'});
    }

    // edit users access level
    accessChange=(id, level)=>{
        if (level === 1) {
            Swal.fire('Admin Access Cannot Be Changed')
            return
        }
        else{
            this.props.dispatch({type:"EDIT_ACCESS", payload:{id,level}})
        }
    }
       
    // currently predictive text only follows first and last name, need to have table conditionally render by this
    getPredictions=(value)=>{
        const firstNameList = this.props.reduxState.admin.clientList.map(subscriber=>{
            return (subscriber.firstname + ", ");
        })
        const lastNameList = this.props.reduxState.admin.clientList.map(subscriber=>{
            return (subscriber.lastname + ", ");
        })
        const combined = firstNameList.concat(lastNameList)
          if (value.length > 0) {
            let filteredList = combined.filter(name => name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
            this.setState({query: filteredList});
        }
        if (value.length === 0) {
            this.setState({
                query: ['search by first or last name']
            })
        }
    }
  
    handleChange=()=>{
        const value = this.search.value
        this.setState({prediction: value})
        this.getPredictions(value);
    }


    render(){
        return (
            <>
                <h2>Subscribers using SvenPlans:</h2>
                <form className="form">
                    <li>
                        <label> Search</label>
                        <input type="text" placeholder="search subscriber list" 
                        ref={input => this.search = input} onChange={this.handleChange}/>
                        {/* <span><input className="btn-sml"type="submit" value="Submit Query"/></span> */}
                        <span><h2>{this.state.query}</h2></span>
                    </li>
                </form>
                <table id="clientTable" className="tbl-lg">
                    <thead className="sticky">
                        <tr>
                            <th className="sticky">Company</th>
                            <th className="sticky">Name</th>
                            <th className="sticky">Email</th>
                            <th className="sticky">Phone</th>
                            <th className="sticky">Access Level</th>
                            <th className="sticky">Permissions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.reduxState.admin.clientList.map(subscriber => (
                            <tr key={subscriber.id}>
                                <td>{subscriber.company}</td>
                                <td>{subscriber.firstname} {subscriber.lastname}</td>
                                <td>{subscriber.email}</td>
                                <td>{subscriber.phone}</td>
                                <td>{subscriber.level}:
                                { subscriber.level ===3 &&
                                'Project User'}
                                {subscriber.level ===2 &&
                                'Workflow Creator'}
                                    {subscriber.level === 1 &&
                                        'Application Administrator'}
                                </td>
                                {(this.props.reduxState.user.currentUser.id !== subscriber.id) 
                                ?
                                    <td><button className="btn-sml" key={subscriber.id} onClick={() => this.accessChange(subscriber.id, subscriber.level)} 
                                        name='subscriber.clientid'>Grant/Revoke Enterprise Access</button></td>
                                :
                                    <td>Cannot Change Personal Access Level</td>
                                }
                            </tr>))}              
                    </tbody>
                </table>
            </>
        );
    }
}

const putReduxStateOnProps=(reduxState)=>({
    reduxState
  });
  
export default connect(putReduxStateOnProps)(Subscribers);
