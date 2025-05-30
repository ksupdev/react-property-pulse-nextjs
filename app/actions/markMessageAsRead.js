'use server';

import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function markMessageAsRead(messageId) {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        return { error: 'User ID is required' };
    }

    const { userId } = sessionUser;

    console.log(messageId)

    const message = await Message.findById(messageId)

    if (!message) throw new Error('Message not found');

    // Verify onnwership
    if (message.recipient.toString() !== userId) {
        throw new Error('Unauthrozide');
    }

    message.read = !message.read;

    revalidatePath('/message', 'page');

    await message.save();

    return message.read;

}

export default markMessageAsRead;
