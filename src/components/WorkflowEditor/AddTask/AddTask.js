import React from 'react';
import { connect } from 'react-redux';
import Swal from "sweetalert2"

import AddTask1 from './subcomponents/AddTask1';
import AddTask2 from './subcomponents/AddTask2';
import AddTask3 from './subcomponents/AddTask3';
import AddTask4 from './subcomponents/AddTask4';
import AddTaskReview from './subcomponents/AddTaskReview';


// brings the user through creation steps for a new task 
function AddTask(props) {
    // only show delete button if task exists
    const deleteTask=()=>{
        Swal.fire({
            title: `Are you sure you want to delete this task?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
            if (result.value) {
                Swal.fire(
                'Deleted!',
                `This Task has been removed from this Phase`,
                'success'
                );
                props.dispatch({type: 'REMOVE_TASK', payload: {
                    id: props.phase.id, 
                    task: props.taskID
                }});
                props.dispatch({ type: 'GO_HOME_STEP' });
                if(props.edit === true){
                    props.dispatch({type: 'TOGGLE_EDIT_TASK'});
                }
                if(props.add === true){
                    props.dispatch({type: 'TOGGLE_ADD_TASK'});
                }
            }
        })
    }

    return (
        <>
           {props.edit === true 
           ?
            <>
                <h2>Edit Task</h2> 
                <div className="side-button" onClick={deleteTask}><button className="btn-sml-delete">Delete Task</button></div>
            </>
            :
            <h2>Add Task To Phase</h2>
           }
            
            {props.taskStep === 1 && <AddTask1 />}
            {props.taskStep === 2 && <AddTask2 />}
            {props.taskStep === 3 && <AddTask3 />}
            {props.taskStep === 4 && <AddTask4 />}
            {props.taskStep === 5 && <AddTaskReview />}

        </>
    );
}


const mapStateToProps = state => ({
    user: state.user,
    task: state.workflow.taskInProgress,
    taskStep: state.workflow.stepOfTaskCreation,
    phase: state.workflow.storeCurent.phase,
    taskID: state.workflow.storeCurent.task,
    edit: state.workflow.storeCurent.editTask,
    add: state.workflow.storeCurent.addTask 
});

export default connect(mapStateToProps)(AddTask);

