//sfc
import PropertyCard from '@/components/PropertyCard';
import properties from '@/properties.json';

const PropertiesPage = () => {
  //http://localhost:3000/properties

  console.log(properties);
  return (
    <section className='px-4 py-6'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start">
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
