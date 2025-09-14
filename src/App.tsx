import React from 'react';
import BookList from './components/BookList';

export default function App() {
  return (
    <div className="bg-background text-neutral min-h-screen">
      <h1 className="text-primary text-3xl font-bold p-4">AX Tracker Bible</h1>
      <BookList />
    </div>
  );
}