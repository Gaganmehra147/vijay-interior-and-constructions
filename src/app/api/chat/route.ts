import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

const SYSTEM_INSTRUCTION = `
You are the official AI Architectural & Interior Assistant for "Vijay Interior & Construction" (विजय इंटीरियर एंड कंस्ट्रक्शन), located in Jabalpur, Madhya Pradesh.

=== STUDIO OVERVIEW ===
- Business Name: Vijay Interior & Construction
- Office & Studio Address: Shop No. 10, Sanjeevani Nagar, Garha, Jabalpur, Madhya Pradesh
- Direct Calling / Mobile: +91 97543 95862, +91 62634 34513
- Official WhatsApp: +91 70003 01077
- Operating Hours: Monday to Saturday, 9:30 AM to 7:00 PM (Sunday by special appointment)
- Service Area: Jabalpur, Mandla, Katni, Narsinghpur, Seoni, and surrounding regions in Madhya Pradesh.

=== CORE EXPERTISE & SERVICES ===
1. Luxury Residential Interiors:
   - Bespoke living room design, modular kitchens with tandem drawers, acrylic/laminate/PU finishes.
   - Master bedroom luxury suites, custom wardrobes (sliding/hinged with profile lighting), false ceiling design with ambient warm COB/cove LEDs.
   - Designer bathrooms with Italian marble/granite & premium sanitary fittings.
2. Turnkey Civil Construction:
   - Complete end-to-end building from excavation and foundation to turnkey handover.
   - RCC structural engineering, masonry, plastering, waterproofing, premium elevation (facade design, CNC jali, louvers).
3. Commercial & Corporate Spaces:
   - Modern retail showrooms, corporate offices, executive cabins, reception lounges, restaurants & cafes.
4. Renovation & Remodeling:
   - Transforming old/damaged spaces into modern luxury environments (wall removal, flooring replacement, electrical rewiring, plumbing).
5. 3D Architectural Visualizations:
   - High-definition 3D renders and layout plans provided to clients prior to execution so they can see their future home in photorealistic detail.

=== PRICING GUIDANCE (ESTIMATES ONLY) ===
- Every site has unique requirements, so exact quotes require a site measurement visit.
- General estimates:
  * Full Home Premium Interiors: approx ₹1,200 - ₹2,500 per sq.ft.
  * Modular Kitchens: starting from ₹1.5 Lakh up to ₹6+ Lakh depending on hardware (Hettich/Hafele) and finish (Acrylic/PU).
  * Civil Construction (Turnkey with materials): approx ₹1,600 - ₹2,800 per sq.ft.
- Always offer a FREE site visit or consultation in Jabalpur!

=== TONE, LANGUAGE & BEHAVIOR ===
- Language: Respond in the same language the customer uses (Hindi, Hinglish, or English). Keep tone polite, respectful, knowledgeable, and inviting.
- Core Goal: Answer customer queries clearly, provide expert design advice, and ALWAYS politely ask for their Name, Contact Number, and Location so the studio team can arrange a free consultation or share photos/catalogs on WhatsApp.
- If the customer shares their phone number, acknowledge it warmly and confirm that our senior design team will call or WhatsApp them shortly.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Conversation messages are required." },
        { status: 400 }
      );
    }

    // Prepare contents array for Gemini API format
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" || m.role === "model" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    // Call Gemini 2.5 Flash
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

    const geminiRes = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }],
        },
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
        },
      }),
    });

    if (!geminiRes.ok) {
      const errData = await geminiRes.text();
      console.error("Gemini API error:", geminiRes.status, errData);
      return NextResponse.json(
        { error: "AI service temporarily unavailable. Please try again." },
        { status: 500 }
      );
    }

    const geminiData = await geminiRes.json();
    const replyText =
      geminiData.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Namaste! Thank you for reaching out to Vijay Interior & Construction. How may I assist you with your dream home today?";

    // --- AUTOMATED CRM LEAD DETECTION & CAPTURE ---
    let leadCaptured = false;
    let capturedDetails: { name?: string; phone?: string; id?: string } | null = null;

    try {
      // Analyze last few user messages to detect 10-digit Indian phone numbers
      const userMessagesText = messages
        .filter((m: { role: string }) => m.role === "user")
        .map((m: { content: string }) => m.content)
        .join(" ");

      // Regex for Indian mobile numbers: 10 digits starting with 6-9, optionally with +91 or 0
      const phoneMatch = userMessagesText.match(/(?:\+91[\-\s]?)?[6-9]\d{9}\b/);

      if (phoneMatch) {
        const rawPhone = phoneMatch[0].replace(/\D/g, "");
        const formattedPhone = rawPhone.length === 10 ? `+91 ${rawPhone}` : `+${rawPhone}`;

        // Check if lead with this phone already exists to avoid duplicates
        const existingLead = await prisma.lead.findFirst({
          where: {
            phone: {
              contains: rawPhone.slice(-10),
            },
          },
        });

        // Simple name extractor: check if user said "I am [Name]" or "Mera naam [Name]" or extract from first user message
        let detectedName = "Website Visitor";
        const nameMatch = userMessagesText.match(/(?:my name is|i am|mera naam|naam)\s+([A-Za-z]+(?:\s+[A-Za-z]+)?)/i);
        if (nameMatch && nameMatch[1]) {
          const rawName = nameMatch[1].replace(/\b(hai|aur|and|mobile|phone|number|hu|mera|from)\b.*$/i, "").trim();
          if (rawName.length >= 2) {
            detectedName = rawName;
          }
        }

        // Determine project type based on keywords
        let detectedType = "Interior Design";
        const lowerText = userMessagesText.toLowerCase();
        if (lowerText.includes("construction") || lowerText.includes("makan") || lowerText.includes("building") || lowerText.includes("civil")) {
          detectedType = "Home Construction";
        } else if (lowerText.includes("kitchen") || lowerText.includes("modular")) {
          detectedType = "Modular Kitchen";
        } else if (lowerText.includes("renovat") || lowerText.includes("purana")) {
          detectedType = "Renovation";
        } else if (lowerText.includes("office") || lowerText.includes("shop") || lowerText.includes("commercial")) {
          detectedType = "Commercial Interior";
        }

        const chatSummary = `Lead captured by Gemini AI Chatbot. User asked: "${userMessagesText.slice(-300)}"`;

        if (!existingLead) {
          const newLead = await prisma.lead.create({
            data: {
              name: detectedName,
              phone: formattedPhone,
              email: `${rawPhone.slice(-10)}@lead.vijayinterior.com`,
              city: "Jabalpur",
              projectType: detectedType,
              budgetRange: "Discuss with Client",
              status: "NEW",
              message: chatSummary,
              notes: {
                create: {
                  author: "AI Concierge (Gemini 2.5)",
                  note: `Interactive website chat session. Key discussion points: ${chatSummary}`,
                },
              },
            },
          });
          leadCaptured = true;
          capturedDetails = { name: detectedName, phone: formattedPhone, id: newLead.id };
        } else {
          // Append updated note to existing lead
          await prisma.leadNote.create({
            data: {
              leadId: existingLead.id,
              author: "AI Concierge (Gemini 2.5)",
              note: `Follow-up chat detected. Recent discussion: ${chatSummary}`,
            },
          });
          leadCaptured = true;
          capturedDetails = { name: existingLead.name, phone: existingLead.phone, id: existingLead.id };
        }
      }
    } catch (leadError) {
      console.error("Lead capture parsing error (non-fatal):", leadError);
    }

    return NextResponse.json({
      reply: replyText,
      leadCaptured,
      capturedDetails,
    });
  } catch (error) {
    console.error("Chat API unhandled error:", error);
    return NextResponse.json(
      { error: "Internal server error occurred." },
      { status: 500 }
    );
  }
}
