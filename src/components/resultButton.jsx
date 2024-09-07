import Link from 'next/link';

export default function ResultButton({ makeId, year, isActive, children }) {
  const isPath = Boolean(makeId && year);
  return (
    <Link
      className={`px-4 py-2 mt-4 font-semibold text-white rounded text-xl ${
        isActive
          ? 'bg-blue-500 text-white hover:bg-blue-600'
          : 'bg-gray-300 text-black'
      }`}
      href={isPath ? `/result/${makeId}/${year}` : '/'}
    >
      {children}
    </Link>
  );
}
