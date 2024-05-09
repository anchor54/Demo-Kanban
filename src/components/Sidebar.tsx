export default function Sidebar({boardData, selectedBoardIdx, onBoardItemClicked, onBoardCreate }: {boardData: any, selectedBoardIdx: number, onBoardItemClicked: any, onBoardCreate: any }) {
    return (
        <div className="w-1/5 bg-bg-secondary text-white border-r border-text-inactive">
            <h1 className="p-10 text-4xl font-bold">kanban</h1>
            <div className="text-lg text-text-inactive mb-4 tracking-widest pl-8">ALL BOARDS ({boardData.length})</div>
            <ul className="mt-4 space-y-2">
                {
                    boardData.map((board: any, index: number) => (
                        <li key={board.id} className={`cursor-pointer py-4 text-lg hover:bg-gray-700 rounded-r-3xl my-3 mr-20 ${selectedBoardIdx === index ? 'bg-bg-purple' : ''}`} onClick={() => onBoardItemClicked(index)}>
                            <span className="font-bold ml-16">{board.title}</span>
                        </li>
                    ))
                }
                <li className={'cursor-pointer py-4 text-lg my-10 mr-20'} onClick={onBoardCreate}>
                    <span className="text-xl ml-16 text-bg-purple">+ Create New Board</span>
                </li>
            </ul>
        </div>
    )
}