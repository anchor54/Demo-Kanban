import { useState } from 'react';
import { EditTaskDialog } from './components/EditTaskDialog';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import BoardContent from './components/BoardContent';
import { CreateBoardDialog } from './components/CreateBoardDialog';

// Mock data for demonstration
const _boardsData = [
  {
    id: 'board1',
    title: 'Project Alpha',
    columns: [
      {
        id: 'column-1',
        title: 'TODO',
        tasks: [
          { id: 'task-1', name: 'Task One' },
          { id: 'task-2', name: 'Task Two' },
        ]
      },
      {
        id: 'column-2',
        title: 'DOING',
        tasks: [
          { id: 'task-1', name: 'Task One' },
          { id: 'task-2', name: 'Task Two' },
          { id: 'task-3', name: 'Task Three' },
        ]
      },
      {
        id: 'column-3',
        title: 'DONE',
        tasks: []
      }
    ]
  },
  {
    id: 'board2',
    title: 'Project Beta',
    columns: [
      {
        id: 'column-1',
        title: 'TODO',
        tasks: [
          { id: 'task-1', name: 'Task 1' },
          { id: 'task-2', name: 'Task 2' },
          { id: 'task-3', name: 'Task 3' },
        ]
      },
      {
        id: 'column-2',
        title: 'DOING',
        tasks: [
          { id: 'task-1', name: 'Task 1' },
          { id: 'task-3', name: 'Task 3' },
        ]
      },
      {
        id: 'column-3',
        title: 'DONE',
        tasks: [
          { id: 'task-3', name: 'Task 3' },
        ]
      }
    ]
  }
];

const App = () => {
  const [currentBoardIdx, setCurrentBoardIdx] = useState(0);
  const [currentTaskIdx, setCurrentTaskIdx] = useState(null);
  const [currentColumnIdx, setCurrentColumnIdx] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showCreateBoardModal, setShowCreateBoardModal] = useState(false);
  const [boardsData, setBoardsData] = useState(_boardsData);

  function addTask(taskName: string, newColumnIdx: number) {
    console.log(currentTaskIdx, currentColumnIdx, newColumnIdx)
    if (currentTaskIdx == null) {
      setBoardsData((prevBoardsData) => {
        const newBoardsData = [...prevBoardsData];
        newBoardsData[currentBoardIdx].columns[newColumnIdx].tasks.push({ id: `task-${newBoardsData[currentBoardIdx].columns[currentColumnIdx].tasks.length + 1}`, name: taskName });
        closeDialog();
        return newBoardsData;
      })
      return;
    }
    setBoardsData((prevBoardsData) => {
      const newBoardsData = [...prevBoardsData];
      console.log(newBoardsData[currentBoardIdx].columns[newColumnIdx].tasks[currentTaskIdx], currentTaskIdx, currentColumnIdx, currentBoardIdx)
      newBoardsData[currentBoardIdx].columns[newColumnIdx].tasks.push({ id: `task-${newBoardsData[currentBoardIdx].columns[newColumnIdx].tasks.length + 1}`, name: taskName });
      newBoardsData[currentBoardIdx].columns[currentColumnIdx].tasks.splice(currentTaskIdx, 1);
      closeDialog();
      return newBoardsData;
    })
  }

  function deleteTask() {
    if (currentTaskIdx == null) return;
    setBoardsData((prevBoardsData) => {
      const newBoardsData = [...prevBoardsData];
      newBoardsData[currentBoardIdx].columns[currentColumnIdx].tasks.splice(currentTaskIdx, 1);
      closeDialog();
      return newBoardsData;
    })
  }

  function closeDialog() {
    setShowModal(false);
    setCurrentTaskIdx(null);
    setCurrentColumnIdx(0);
  }

  function openDialog(currentTaskIdx?: number) {
    setCurrentColumnIdx(0);
    setCurrentTaskIdx(currentTaskIdx);
    setShowModal(true);
  }

  function openCreateBoardDialog() {
    setShowCreateBoardModal(true);
  }

  function closeCreateBoardDialog() {
    setShowCreateBoardModal(false);
  }

  function onAddBoard(boardName: string) {
    setBoardsData((prevBoardsData) => {
      const newBoardsData = [...prevBoardsData];
      newBoardsData.push({
        id: `board-${newBoardsData.length + 1}`,
        title: boardName,
        columns: [
          {
            id: 'column-1',
            title: 'TODO',
            tasks: []
          },
          {
            id: 'column-2',
            title: 'DOING',
            tasks: []
          },
          {
            id: 'column-3',
            title: 'DONE',
            tasks: []
          }
        ]
      });
      closeCreateBoardDialog();
      return newBoardsData;
    })
  }

  return (
    <>
    <div className="flex h-screen">
      <Sidebar
        boardData={boardsData}
        selectedBoardIdx={currentBoardIdx}
        onBoardItemClicked={(idx: number) => setCurrentBoardIdx(idx)}
        onBoardCreate={openCreateBoardDialog}
      />
      <div className="flex-grow bg-bg-primary">
        <Header openDialog={openDialog} />
        <BoardContent
          boardData={boardsData[currentBoardIdx]}
          openEditDialog={(columnIdx: number, taskIdx: number) => {
            setCurrentColumnIdx(columnIdx);
            setCurrentTaskIdx(taskIdx);
            setShowModal(true);
          }}
        />
        <div className="flex space-x-4"></div>
      </div>
    </div>
    {showModal &&
      <EditTaskDialog
        task={(currentTaskIdx == null) ? null : boardsData[currentBoardIdx].columns[currentColumnIdx].tasks[currentTaskIdx]}
        currentColumn={currentColumnIdx}
        columns={boardsData[currentBoardIdx].columns.map((column: any) => column.title)}
        onAdd={(taskName: string, columnIdx: number) => {
          addTask(taskName, columnIdx);
        }}
        onDelete={() => deleteTask()}
        onClose={closeDialog}
      />}
      {showCreateBoardModal &&
        <CreateBoardDialog
          onAddBoard={(name: string) => onAddBoard(name)}
          onClose={closeCreateBoardDialog} />
      }
    </>
  );
};



export default App;
