'use client';

import { useState } from 'react';
import { handleSubmit } from '#/src/server/usernameHandler';

export default function Page() {
  const [username, setUsername] = useState(''); // Declare a state variable...

  return (
    <body className="bg-gray-800 text-center">
      <div className="grid grid-flow-row items-center max-h-sm justify-center gap-8 my-24">
        <h1 className="text-4xl text-white">Discord Profile Grabber</h1>
        <input
          placeholder='Enter a username here'
          value={username} // ...force the input's value to match the state variable...
          onChange={e => setUsername(e.target.value)} // ... and update the state variable on any edits!
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleSubmit(username)}
        >Submit</button>
      </div>
    </body>
  )
}
