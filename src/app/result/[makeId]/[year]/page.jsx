import LinkButton from '@/components/ResultButton';

export async function generateStaticParams() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/GetMakesForVehicleType/car?format=json`,
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch makes: ${res.statusText}`);
    }
    const data = await res.json();
    const results = data.Results;

    return results.flatMap((car) =>
      Array.from({ length: new Date().getFullYear() - 2015 + 1 }, (_, i) => ({
        params: {
          makeId: car.MakeId.toString(),
          year: (2015 + i).toString(),
        },
      })),
    );
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

async function getCar(makeId, year) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`,
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch car models: ${res.statusText}`);
    }

    const data = await res.json();
    return data.Results;
  } catch (error) {
    console.error('Error fetching car data:', error);
    return [];
  }
}

export default async function Result({ params }) {
  // const makeId = params.makeId ? params.makeId : null;
  // const year = params.year ? params.makeId : null;
  // const car = await getCar(makeId, year);
  const car = await getCar(params.makeId, params.year);

  if (car.length === 0) {
    return (
      <div className='flex flex-col min-h-screen justify-center items-center text-2xl'>
        <div>No car models found for the selected make and year.</div>
        <LinkButton isActive={true}>Back</LinkButton>
      </div>
    );
  }

  return (
    <div className='flex flex-col min-h-screen justify-center items-center text-2xl'>
      {car.map((item, index) => (
        <div key={item.Model_ID ?? index}>{item.Model_Name ?? 'Unknown'}</div>
      ))}
      <LinkButton isActive={true}>Back</LinkButton>
    </div>
  );
}
