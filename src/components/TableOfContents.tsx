interface TocItem {
  id: string;
  text: string;
  depth: number;
}

const TableOfContents = ({ toc }: { toc: TocItem[] }) => {
  if (toc.length === 0) return null;

  return (
    <aside className="sticky top-20 hidden lg:block w-64 text-sm px-4 py-6 border-l dark:border-gray-800">
      <h2 className="font-bold mb-4 text-gray-800 dark:text-white">Table of Contents</h2>
      <ul className="space-y-2">
        {toc.map((item) => (
          <li
            key={item.id}
            className={`ml-${(item.depth - 2) * 4} text-gray-600 dark:text-gray-400 hover:text-orange-500`}
          >
            <a href={`#${item.id}`}>{item.text}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default TableOfContents;
