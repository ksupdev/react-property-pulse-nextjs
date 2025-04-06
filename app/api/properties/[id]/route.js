
import connectDB from "@/config/database";
import Property from "@/models/Property";

//http://localhost:3000/api/properties/67f29e9dbfef2327a8cf51c7
export const GET = async (request, { params }) => {
    try {

        await connectDB();
        const property = await Property.findById(params.id);

        if (!property) return new Response('Property not found', { status: 404 })

        return new Response(property, { status: 200 });
    } catch (error) {
        return new Response('Something wnet wrong', { status: 500 });
    }

};