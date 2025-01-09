'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface PokemonType {
  id: number;
  name: string;
  image: string;
}

interface Pokemon {
  id: number;
  pokedexId: number;
  name: string;
  image: string;
  types: PokemonType[];
  stats: {
    HP: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
  };
  evolutions: {
    name: string;
    pokedexId: number;
  }[];
}

interface PokemonDetailProps {
  id: string;
}

export default function PokemonDetail({ id }: PokemonDetailProps) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://nestjs-pokedex-api.vercel.app/pokemons/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch pokemon');
        }
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        setError('Une erreur est survenue lors du chargement du pokémon');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  if (error || !pokemon) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <button
        onClick={() => router.back()}
        className="mb-8 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
      >
        ← Retour
      </button>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
          <span className="text-xl text-gray-500">#{pokemon.pokedexId}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="relative w-full md:w-1/2 h-80">
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {pokemon.types.map((type) => (
              <div 
                key={type.id}
                className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded"
              >
                <Image
                  src={type.image}
                  alt={type.name}
                  width={24}
                  height={24}
                />
                <span className="capitalize">{type.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Statistiques</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(pokemon.stats).map(([stat, value]) => (
              <div key={stat} className="bg-gray-50 p-4 rounded">
                <div className="text-gray-600 capitalize mb-1">
                  {stat.replace('_', ' ')}
                </div>
                <div className="text-xl font-bold">{value}</div>
              </div>
            ))}
          </div>
        </div>

        {pokemon.evolutions?.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Évolutions</h2>
            <div className="flex flex-wrap gap-4">
              {pokemon.evolutions.map((evolution) => (
                <div 
                  key={evolution.pokedexId}
                  className="bg-gray-50 p-4 rounded text-center cursor-pointer hover:bg-gray-100"
                  onClick={() => router.push(`/${evolution.pokedexId}`)}
                >
                  <div className="capitalize font-bold">{evolution.name}</div>
                  <div className="text-gray-500">#{evolution.pokedexId}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}