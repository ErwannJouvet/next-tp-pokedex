import React, { useEffect, useState, Fragment } from 'react';
import { Search } from 'lucide-react';
import { Listbox, Transition } from '@headlessui/react';
import Image from 'next/image';

interface NavbarProps {
  onSearch: (value: string) => void;
  onTypeChange: (type: string) => void;
  onLimitChange: (limit: string) => void;
}

interface Type {
  id: number;
  name: string;
  image: string;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, onTypeChange, onLimitChange }) => {
  const [types, setTypes] = useState<Type[]>([]);
  const [selectedType, setSelectedType] = useState<Type | null>(null);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch('https://nestjs-pokedex-api.vercel.app/types');
        const data = await response.json();
        setTypes(data);
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    };

    fetchTypes();
  }, []);

  return (
    <nav className="w-full bg-red-500 p-4 shadow-lg">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-4">

          <div className="flex items-center text-white text-2xl font-bold">
            <span className="mr-2"></span>
            Pokedex
          </div>
          
          <div className="flex flex-1 gap-4 w-full md:w-auto">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
                onChange={(e) => onSearch(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
            
            <Listbox value={selectedType} onChange={(type) => {
              setSelectedType(type);
              onTypeChange(type?.id.toString() || '');
            }}>
              <div className="relative w-48">
                <Listbox.Button className="relative w-full px-4 py-2 rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-red-300">
                  <span className="flex items-center gap-2">
                    {selectedType ? (
                      <>
                        <Image 
                          src={selectedType.image}
                          alt={selectedType.name}
                          width={20}
                          height={20}
                        />
                        {selectedType.name.charAt(0).toUpperCase() + selectedType.name.slice(1)}
                      </>
                    ) : (
                      'Type'
                    )}
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 z-10">
                    <Listbox.Option
                      key="all"
                      value={null}
                      className={({ active }) =>
                        `${active ? 'bg-red-100' : ''} cursor-pointer select-none relative py-2 px-4`
                      }
                    >
                      All
                    </Listbox.Option>
                    {types.map((type) => (
                      <Listbox.Option
                        key={type.id}
                        value={type}
                        className={({ active }) =>
                          `${active ? 'bg-red-100' : ''} cursor-pointer select-none relative py-2 px-4`
                        }
                      >
                        <div className="flex items-center gap-2">
                          <Image 
                            src={type.image}
                            alt={type.name}
                            width={20}
                            height={20}
                          />
                          {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                        </div>
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>

            <select
              className="px-4 py-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-red-300"
              onChange={(e) => onLimitChange(e.target.value)}
              defaultValue={50}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;