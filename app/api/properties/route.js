
import connectDB from "@/config/database";
import Property from "@/models/Property";

//http://localhost:3000/api/properties
export const GET = async () => {
    try {

        await connectDB();
        const properties = await Property.find({});

        return new Response(properties, { status: 200 });
    } catch (error) {
        return new Response('Something wnet wrong', { status: 500 });
    }

};