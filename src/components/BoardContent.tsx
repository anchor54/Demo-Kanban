import Column from "./Column";

export default function BoardContent({ boardData, openEditDialog }: { boardData: any, openEditDialog: any }) {
    return (
        <div className="flex space-x-4 p-5">
          {boardData.columns.map((column: any, columnIdx: number) => (
            <Column key={column.id} column={column} onClick={(taskIdx: number) => openEditDialog(columnIdx, taskIdx)} />
          ))}
        </div>
    )
}