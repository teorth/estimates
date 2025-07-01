export default function LoadingState({
  message,
}: {
  message: string;
}) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="flex items-center justify-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500" />
        <span className="ml-2 text-indigo-600">{message}</span>
      </div>
    </div>
  );
}
