//sfc
import PropertyCard from '@/components/PropertyCard';
import Pagination from '@/components/Pagination';
import connectDB from '@/config/database';
import Property from '@/models/Property';

const PropertiesPage = async ({ searchParams = {} }) => {
  // console.log(searchParams);
  //http://localhost:3000/properties

  await connectDB();

  const { page = 1, pageSize = 3 } = await searchParams;


  const skip = (page - 1) * pageSize;

  const total = await Property.countDocuments({});

  const properties = await Property.find({}).skip(skip).limit(pageSize);

  const showPagination = total > pageSize;
  // console.log(properties);
  return (
    <section className='px-4 py-6'>
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start">
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}

        {showPagination && (
          <Pagination page={parseInt(page)} pageSize={parseInt(pageSize)} totalItems={parseInt(total)} />
        )}

      </div>
    </section>
  );
};

export default PropertiesPage;
