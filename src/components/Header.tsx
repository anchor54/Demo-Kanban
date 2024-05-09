export default function Header({ openDialog }: { openDialog: any }) {
    return (
        <div className="flex bg-bg-secondary justify-between items-center p-8 border-b border-text-inactive">
          <h1 className="text-white text-2xl font-bold">Platform Launch</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-bg-purple text-white text-lg font-bold rounded-full px-8 py-4" onClick={() => openDialog(null)}>+ Add New Task</button>
            <div className="text-white text-xl cursor-pointer">⋮</div>
          </div>
        </div>
    )
}