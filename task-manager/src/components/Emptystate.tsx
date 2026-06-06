interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({
  message = 'No tasks found. Create one to get started!',
}: EmptyStateProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-12 text-center border border-gray-200">
      <div className="text-5xl mb-4">📭</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">No Tasks</h3>
      <p className="text-gray-600">{message}</p>
    </div>
  );
}
