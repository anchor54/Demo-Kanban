import { useState } from "react";

export const CreateBoardDialog = ({ onAddBoard, onClose }: { onAddBoard: any, onClose: any }) => {
    const [boardName, setBoardName] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (boardName.trim() === '') {
            setError('Board name cannot be empty');
            return;
        }
        onAddBoard(boardName);
        onClose()
    };

    const onInputChange = (e: any) => {
        setBoardName(e.target.value);
        setError(null);
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
            <div className="bg-bg-secondary p-8 rounded-xl w-1/2" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl text-white mb-6">Add New Board</h2>
                    <input 
                        value={boardName} 
                        className={`bg-bg-secondary border-2 ${error !== null ? 'border-red-500 bg-red-200' : 'border-text-inactive'} p-4 text-white rounded-lg w-full mb-8`} 
                        type="text" 
                        placeholder="Enter board name" 
                        onChange={onInputChange}
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="flex justify-end">
                        <button type="submit" className="bg-bg-purple hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Add Board</button>
                        <button type="button" className="bg-bg-purple hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}