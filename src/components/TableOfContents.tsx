import { TocItem } from "../utils/generateTOC";

interface Props {
  toc: TocItem[];
}

const TableOfContents = ({ toc }: Props) => {
  if (toc.length === 0) return null;

  return (
    <div className="border-l border-gray-300 dark:border-gray-700 pl-4 text-sm space-y-2">
      <h2 className="text-lg font-semibold mb-2">Table of Contents</h2>
      <ul className="space-y-1">
        {toc.map((item) => (
          <li key={item.id} className={`ml-${(item.depth - 1) * 4}`}>
            <a
              href={`#${item.id}`}
              className="text-gray-700 dark:text-gray-300 hover:underline"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
