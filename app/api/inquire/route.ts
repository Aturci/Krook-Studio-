import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { customerName, customerEmail, message, subject } =
      await request.json();

    if (!customerName || !customerEmail || !message || !subject) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const contactEmail = process.env.CONTACT_EMAIL!;

    await resend.emails.send({
      from: "Krook Studio <onboarding@resend.dev>",
      to: contactEmail,
      replyTo: customerEmail,
      subject: `New inquiry — ${subject}`,
      text: [
        "New inquiry from Krook Studio website",
        "",
        `From: ${customerName} (${customerEmail})`,
        `Re: ${subject}`,
        "",
        "Message:",
        message,
        "",
        "---",
        "Sent via krook-studio.vercel.app",
      ].join("\n"),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Inquiry email error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
