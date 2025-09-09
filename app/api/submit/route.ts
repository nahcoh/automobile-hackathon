import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Define the expected shape of the request body
interface RequestBody {
  teamName: string;
  teamLeaderName: string;
  participationReason: string;
  howDidYouKnow: string[];
  hackingExperience: string;
  participants: {
    university: string;
    department: string;
    name: string;
    gender: string;
    contact: string;
    email: string;
  }[];
}

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();

    // Basic validation
    if (!body.teamName || !body.teamLeaderName || !body.participants || body.participants.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const formatPhoneNumber = (phone: string): string => {
      const digits = phone.replace(/\D/g, ''); // Remove non-digit characters
      if (digits.startsWith('010')) {
        return `+82${digits.substring(1)}`; // Replace leading 0 with +82
      }
      // If it doesn't start with 010, return the digits as is (or handle other cases)
      return digits;
    };

    const newApplication = await prisma.application.create({
      data: {
        teamName: body.teamName,
        teamLeaderName: body.teamLeaderName,
        participationReason: body.participationReason,
        howDidYouKnow: body.howDidYouKnow.join(', '),
        hackingExperience: body.hackingExperience,
        participants: {
          create: body.participants.map(p => ({
            university: p.university,
            department: p.department,
            name: p.name,
            gender: p.gender,
            contact: formatPhoneNumber(p.contact), // Apply phone number formatting
            email: p.email,
          })),
        },
      },
      include: {
        participants: true, // Include the created participants in the response
      },
    });

    return NextResponse.json(newApplication, { status: 201 });
  } catch (error: any) {
    console.error("API Error:", error);
    // Check for specific Prisma errors, like unique constraint violation
    if (error.code === 'P2002') {
        const target = error.meta?.target?.join(', ');
        return NextResponse.json({ error: `이미 존재하는 ${target}입니다. 다른 값을 사용해주세요.` }, { status: 409 });
    }
    
    return NextResponse.json({ error: '예상치 못한 오류가 발생했습니다.' }, { status: 500 });
  }
}