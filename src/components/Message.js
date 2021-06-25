const Message = ({ error = false, loading = false, children = null }) => (
  <div
    className={`text-center rounded-md max-w-max mx-auto py-3 px-12 ${
      error ? 'text-red-500 bg-red-100' : 'text-gray-500 bg-gray-100'
    }`}
  >
    {loading ? <p className="animate-pulse">{children}</p> : children}
  </div>
);

export default Message;
