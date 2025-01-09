import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
  sprite: string;
  types: PokemonType[];
}

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
    return (
      <Link href={`/${pokemon.id}`} className="block">
        <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
          <div className="text-right text-gray-500 mb-2">#{pokemon.pokedexId}</div>
          <div className="relative w-full h-40 mb-4">
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              fill
              className="object-contain"
            />
          </div>
          <h2 className="text-xl font-bold mb-2 capitalize">{pokemon.name}</h2>
          <div className="flex gap-2">
            {pokemon.types.map((type) => (
              <div 
                key={type.id}
                className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded"
              >
                <Image
                  src={type.image}
                  alt={type.name}
                  width={20}
                  height={20}
                />
                <span className="capitalize">{type.name}</span>
              </div>
            ))}
          </div>
        </div>
      </Link>
    );
  };
  
export default PokemonCard;