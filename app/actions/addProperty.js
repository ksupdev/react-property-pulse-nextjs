'use server';

import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';


async function addProperty(formData) {

    await connectDB();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
        throw new Error('User ID is required');
    }

    const { userId } = sessionUser;

    // Access all values from amenities and images
    const amenities = formData.getAll('amenities');
    const images = formData.getAll('images').filter((image) => image.name !== '')
        .map((image) => image.name);

    // Create the propertyData object with embedded seller_info
    const propertyData = {
        owner: userId,
        type: formData.get('type'),
        name: formData.get('name'),
        description: formData.get('description'),
        location: {
            street: formData.get('location.street'),
            city: formData.get('location.city'),
            state: formData.get('location.state'),
            zipcode: formData.get('location.zipcode'),
        },
        beds: formData.get('beds'),
        baths: formData.get('baths'),
        square_feet: formData.get('square_feet'),
        amenities,
        rates: {
            weekly: formData.get('rates.weekly'),
            monthly: formData.get('rates.monthly'),
            nightly: formData.get('rates.nightly.'),
        },
        seller_info: {
            name: formData.get('seller_info.name'),
            email: formData.get('seller_info.email'),
            phone: formData.get('seller_info.phone'),
        },
        images,
    };

    const newProperty = new Property(propertyData);
    await newProperty.save();

    revalidatePath('/', 'layout');
    redirect(`/properties/${newProperty._id}`);
}

export default addProperty;