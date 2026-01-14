import { useState, type ChangeEvent } from 'react'

export default function HelloWorld() {
  const defaultWorld = 'world'
  const [name, setName] = useState(defaultWorld)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.value !== '') {
      setName(event.target.value)
    } else {
      setName(defaultWorld)
    }
  }

  return (
    <div className='flex flex-col gap-2 rounded border p-4'>
      <h1>Hello {name}!</h1>
      <input
        type='text'
        onChange={handleChange}
        placeholder='Type something...'
        className='rounded border p-2'
      />
    </div>
  )
}
