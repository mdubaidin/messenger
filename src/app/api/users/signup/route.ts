import { connectDB } from '@/src/config/database';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/src/models/User';
import { signToken } from '@/src/utils/function';

connectDB();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, username, email, password } = body;

        const user = await User.findOne({ email });

        if (user)
            return NextResponse.json({
                message: 'Email address already has been used!',
                status: 400,
            });

        const newUser = new User({
            email,
            username,
            name,
            password,
        });

        await newUser.save();

        const token = signToken(newUser);

        return NextResponse.json({
            message: 'New account created!',
            token,
            status: 201,
            success: true,
        });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ message: error.message, status: 500, success: false });
    }
}
