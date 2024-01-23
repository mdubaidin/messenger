import { connectDB } from '@/src/config/database';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/src/models/User';
import { signToken } from '@/src/utils/function';

connectDB();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password } = body;

        const user = await User.findOne({ email, password });

        if (!user)
            return NextResponse.json({
                message: 'The email and password is incorrect',
                status: 400,
            });

        const token = signToken(user);

        console.log({ token, user });

        return NextResponse.json({
            message: 'Loggedin successfull!',
            token,
            status: 201,
            success: true,
        });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ message: error.message, status: 500, success: false });
    }
}
