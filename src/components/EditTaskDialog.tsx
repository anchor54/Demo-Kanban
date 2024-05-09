import { useState } from "react";

export const EditTaskDialog = ({ task, currentColumn, columns, onAdd, onClose, onDelete }: { task: any, currentColumn: number, columns: any, onAdd: any, onClose: any, onDelete: any }) => {
    const [taskName, setTaskName] = useState(task != null ? task.name : '');
    const [columnIdx, setColumnIdx] = useState(currentColumn);
    const [error, setError] = useState(null);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (taskName.trim() === '') {
            setError('Task name cannot be empty');
            return;
        }
        onAdd(taskName, columnIdx);
    };

    const onInputChange = (e: any) => {
        setTaskName(e.target.value);
        setError(null);
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
            <div className="bg-bg-secondary p-8 rounded-xl w-1/2" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl text-white mb-6">Add New Task</h2>
                        {task != null && (
                            <div className="flex justify-center items-center mb-8">
                                <button type="button" className="text-white cursor-pointer bg-red-600 hover:bg-red-900 rounded px-6 py-2 mr-10" onClick={onDelete}>Delete</button>
                                <select
                                    value={columnIdx}
                                    className="bg-bg-secondary border-2 border-text-inactive px-10 py-3 text-white rounded-lg w-full"
                                    onChange={e => setColumnIdx(parseInt(e.target.value))}
                                >
                                    {columns.map((column: string, index: number) => (<option value={index}>{column}</option>))}
                                </select>
                            </div>
                        )}
                    </div>
                    <input 
                        value={taskName} 
                        className={`bg-bg-secondary border-2 ${error !== null ? 'border-red-500 bg-red-200' : 'border-text-inactive'} p-4 text-white rounded-lg w-full mb-8`} 
                        type="text" 
                        placeholder="Enter task name" 
                        onChange={onInputChange}
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="flex justify-end">
                        <button type="submit" className="bg-bg-purple hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" disabled={task != null && task.name == taskName && columnIdx == currentColumn}>{task != null ? 'Edit Task' : 'Add Task'}</button>
                        <button type="button" className="bg-bg-purple hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}