 import { NextResponse } from "next/server";
 import OpenAI from "openai";
 
 const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
 });
 
 export async function POST(req: Request) {
   const { messages, systemPrompt } = await req.json();
 
   try {
     const response = await client.chat.completions.create({
       model: "gpt-4o",
       messages: [
         { role: "system", content: systemPrompt },
         ...messages,
       ],
     });
 
     return NextResponse.json({
       reply: response.choices[0].message,
     });
   } catch (err) {
     console.error(err);
     return NextResponse.json(
       { error: "Something went wrong." },
       { status: 500 }
     );
   }
 }
 