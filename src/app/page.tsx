'use client';
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import PokemonList from '@/components/PokemonList';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [limit, setLimit] = useState('50');

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
  };

  const handleLimitChange = (limit: string) => {
    setLimit(limit);
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar 
        onSearch={handleSearch}
        onTypeChange={handleTypeChange}
        onLimitChange={handleLimitChange}
      />
      <PokemonList
        limit={parseInt(limit)}
        selectedType={selectedType}
        searchQuery={searchQuery}
      />
    </main>
  );
}