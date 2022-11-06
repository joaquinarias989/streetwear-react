function Loading ({ box = true, size = 'lg' }) {
  const spinnerClass = size !== 'lg' ? `spinner spinner-${size}` : 'spinner'

  return box
    ? (
    <div className='spinner-container'>
      <div className={spinnerClass}></div>
    </div>
      )
    : (
    <div className={spinnerClass}></div>
      )
}

export default Loading
