export async function NotFound(props) {
  return (  
    <div role="status" className="flex items-center justify-center px-4 py-6 m-6 rounded-md shadow-md bg-red-500/40">
        <div className="text-red-900 dark:text-red-200">{props.message}</div>
    </div>
  )
}
