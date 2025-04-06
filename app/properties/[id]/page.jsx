// 'use client'
const PropertyPage = async ({ params }) => {
  // http://localhost:3000/properties/100
  const { id } = await params;
  return <div>Property Page {id}</div>;
};

export default PropertyPage;
