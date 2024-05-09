export default function Column({ column, onClick }: { column: any, onClick: any }) {
  return (
    <div className="flex-1 p-4">
      <h2 className="text-lg text-text-inactive mb-6 tracking-widest">{column.title} ({column.tasks.length})</h2>
      {column.tasks.map((task: any, idx: number) => (
        <div key={task.id} className="bg-bg-secondary p-6 rounded-lg mb-6 shadow cursor-pointer" onClick={() => onClick(idx)}>
          <div className="text-white font-bold text-lg">{task.name}</div>
        </div>
      ))}
    </div>
  );
};