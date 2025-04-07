'use server';

import connectDB from "@/config/database";
import Message from "@/models/Message";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import mongoose from "mongoose";


async function addMessage(previousState, formData) {

    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        throw new Error('User ID is required');
    }

    const { user } = sessionUser;

    const recipient = formData.get('recipient');


    // Get recipient user
    try {
        const recipientExists = await User.findOne({ _id: recipient })
        if (!recipientExists) {
            return { error: 'Can not find property owner ' }
        }
    } catch (error) {
        return { error: 'Can not find property owner with err ' + error }
    }


    if (user.id === recipient) {
        return { error: 'You can not send a message to yourselft' }
    }

    const newMessage = new Message({
        sender: user.id,
        recipient,
        property: formData.get('property'),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        body: formData.get('message'),
    });

    await newMessage.save();

    return { submitted: true };

}

export default addMessage;