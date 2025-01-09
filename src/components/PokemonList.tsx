import React, { useEffect, useState, useRef } from 'react';
import PokemonCard from './PokemonCard';

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

interface PokemonListProps {
  limit?: number;
  selectedType?: string;
  searchQuery?: string;
}

const PokemonList: React.FC<PokemonListProps> = ({ 
  limit = 50,
  selectedType = '', 
  searchQuery = '' 
}) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPokemons([]);
    setPage(1);
  }, [selectedType, searchQuery, limit]);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.append('limit', limit.toString());
        queryParams.append('page', page.toString());
        if (selectedType) queryParams.append('types[]', selectedType);
        if (searchQuery) queryParams.append('name', searchQuery);
        
        const response = await fetch(`https://nestjs-pokedex-api.vercel.app/pokemons?${queryParams.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch pokemons');
        }
        const data = await response.json();
        setPokemons(prev => [...prev, ...data]);
      } catch (error) {
        console.error('Error fetching pokemons:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [limit, selectedType, searchQuery, page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      <div ref={loaderRef} className="h-10">
        {loading && <div className="text-center py-4">Chargement...</div>}
      </div>
    </div>
  );
};

export default PokemonList;