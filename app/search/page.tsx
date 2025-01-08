import SearchForm from "@/components/SearchForm";
import SearchResults from "@/components/SearchResults";

type SearchParams = Promise<{ query: string }>;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { query } = await searchParams;

  return (
    <div className="mx-auto max-w-md md:max-w-2xl xl:max-w-4xl">
      <div>
        <SearchForm />
        <SearchResults query={query} />
      </div>
    </div>
  );
}
