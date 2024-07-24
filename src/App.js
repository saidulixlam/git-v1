import React, { useRef, useState, useEffect } from 'react';

export default function SignupForm() {
  const nameRef = useRef();
  const ageRef = useRef();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const age = ageRef.current.value;

    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age }),
      });

      if (response.ok) {
        fetchUsers();
      } else {
        console.error('Failed to add user');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }

    nameRef.current.value = '';
    ageRef.current.value = '';
  };

  return (
    <div className="text-white max-w-md mx-auto mt-20 p-6 border border-gray-300 rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Signup Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium ">Name:</label>
          <input
            type="text"
            ref={nameRef}
            placeholder="Enter your name"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Age:</label>
          <input
            type="number"
            ref={ageRef}
            placeholder="Enter your age"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign Up
        </button>
      </form>
      <h2 className="text-xl font-bold text-center mt-8">User List</h2>
      <ul className="mt-4 space-y-2 bg-slate-600 rounded-md text-white">
        {users.map((user, index) => (
          <li key={index} className="break-before-all p-2 rounded-md">
            {user.name} - {user.age} years old
          </li>
        ))}
      </ul>
    </div>
  );
}
