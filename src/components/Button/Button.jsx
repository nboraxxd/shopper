export default function Button({ children, loading, ...rest }) {
  return (
    <button
      className="btn btn-sm btn-dark flex items-center disabled:cursor-not-allowed disabled:opacity-70"
      disabled={loading}
      {...rest}
    >
      {loading === true && (
        <span className="mr-2 inline-block h-[20px] w-[20px] animate-spin rounded-[50%] border-[3px] border-solid border-gray-100 border-b-transparent"></span>
      )}
      {children}
    </button>
  )
}
