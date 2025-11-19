"use client";

import Header from "../components/Header";
import { useState } from "react";

export default function About() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevents the page from refreshing
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Send the form data to our API route
            const response = await fetch("/api/submit-form", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitStatus("Message sent successfully!");
                setFormData({ name: "", email: "", message: "" }); // Clear form
            } else {
                setSubmitStatus("Error sending message. Please try again.");
            }
        } catch (error) {
            setSubmitStatus("Error sending message. Please try again.");
            console.error("Form submission error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            <Header />
            <main className="min-h-screen flex items-center justify-center bg-black pt-16">
                <div className="text-center text-white/90 text-xl tracking-wide max-w-2xl w-full px-4">
                    <h1> conrad bradford</h1>
                    <div className="text-left mt-4 space-y-4">
                        <h2 className="flex items-center">
                            <span className="w-72">hometown:</span>
                            <span className="flex-1 border-b-2 border-dotted border-white/50 mx-2 h-0"></span>
                            <span>portland, oregon</span>
                        </h2>
                        <h2 className="flex items-center">
                            <span className="w-72">living:</span>
                            <span className="flex-1 border-b-2 border-dotted border-white/50 mx-2 h-0"></span>
                            <span>orem, utah</span>
                        </h2>
                        <h2 className="flex items-center">
                            <span className="w-72">working:</span>
                            <span className="flex-1 border-b-2 border-dotted border-white/50 mx-2 h-0"></span>
                            <span>sandbox education</span>
                        </h2>
                        <h2 className="flex items-center">
                            <span className="w-72">email:</span>
                            <span className="flex-1 border-b-2 border-dotted border-white/50 mx-2 h-0"></span>
                            <span>conrad@sandbox.ing</span>
                        </h2>
                    </div>

                    {/* Contact Form Section */}
                    <div className="mt-12 text-left">
                        <h2 className="text-center mb-6 text-white/90 text-xl">send a message</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-white/90 mb-2 text-sm">
                                    name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-white/50 text-base"
                                    placeholder="your name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-white/90 mb-2 text-sm">
                                    email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-white/50 text-base"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-white/90 mb-2 text-sm">
                                    message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-white/50 resize-none text-base"
                                    placeholder="your message here..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded text-white hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base"
                            >
                                {isSubmitting ? "sending..." : "send"}
                            </button>

                            {submitStatus && (
                                <p className={`text-center text-sm mt-2 ${submitStatus.includes("successfully") ? "text-green-400" : "text-red-400"}`}>
                                    {submitStatus}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}