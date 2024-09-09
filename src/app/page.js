'use client';

import LinkButton from '@/components/ResultButton';
import React from 'react';

export default function Home() {
  const [items, setItems] = React.useState([]);
  const [selectedMake, setSelectedMake] = React.useState('');
  const [selectedYear, setSelectedYear] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const handleMakeChanges = (event) => {
    setSelectedMake(event.target.value);
  };

  const handleYearChanges = (event) => {
    setSelectedYear(event.target.value);
  };

  const yearRange = React.useMemo(() => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 2015; year <= currentYear; year++) {
      years.push(year);
    }
    return years;
  });

  async function getCars() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/GetMakesForVehicleType/car?format=json`,
      );

      if (!res.ok) {
        throw new Error('Failed to fetch makes');
      }

      const data = await res.json();
      setItems(data.Results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getCars();
  }, []);

  const isOptionsSetted = Boolean(selectedMake && selectedYear);

  return (
    <div className='flex min-h-screen px-3 justify-center items-center '>
      <div className='flex flex-col items-center'>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className='text-red-500'>Error: {error}</p>
        ) : (
          <>
            <div className='flex flex-col gap-y-4 pb-20 md:flex-row gap-x-20'>
              <div className='flex flex-col items-center'>
                <h2 className='text-2xl'>Select Vehicle Make</h2>
                <select
                  className='w-80 border-2 text-center'
                  value={selectedMake}
                  onChange={handleMakeChanges}
                >
                  <option value=''>--Select a Make--</option>
                  {items.map((make) => (
                    <option key={make.MakeId} value={make.MakeId}>
                      {make.MakeName}
                    </option>
                  ))}
                </select>
              </div>

              <div className='flex flex-col items-center'>
                <h2 className='text-2xl'>Select Year</h2>
                <select
                  className='w-80 border-2 text-center'
                  value={selectedYear}
                  onChange={handleYearChanges}
                >
                  <option value=''>--Select a Year--</option>
                  {yearRange.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <LinkButton
              isActive={isOptionsSetted}
              makeId={selectedMake}
              year={selectedYear}
            >
              Next
            </LinkButton>
          </>
        )}
      </div>
    </div>
  );
}
