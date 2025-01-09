import PokemonDetail from "./PokemonDetail";

export default function Page({ params }: { params: { id: string } }) {
  return <PokemonDetail id={params.id} />;
}