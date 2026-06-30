"use server";

export async function submitContactForm(data: {
  name: string;
  email: string;
  topic: string;
  message: string;
  consent: boolean;
}) {
  // Simulate database insert or email sending
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  console.log("Contact form submitted via Server Action:", data);
  
  return { success: true, message: "Message sent successfully" };
}
