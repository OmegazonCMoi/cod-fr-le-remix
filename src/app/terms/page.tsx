'use client';

import Navbar from '@/components/blocks/navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function PolicyAndTerms() {
    return (
        <>
            <Navbar />
            <div className="container mx-auto max-w-4xl p-6">
                <Card className='mt-40'>
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-center">
                            Policy and Terms
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[600px] p-4">
                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                                <p className="text-gray-700">
                                    Welcome to <strong>Hack on COD</strong>. By accessing or using our platform, you agree to comply with and be bound by these Terms and Conditions and our Privacy Policy. Please read these carefully before using our services. If you do not agree with any part of these terms, you must discontinue using our platform.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">2. General Terms</h2>
                                <ul className="list-disc list-inside text-gray-700">
                                    <li>
                                        <strong>Eligibility:</strong> You must be at least <strong>13 years old</strong> to use our services. By using our platform, you confirm that you meet this requirement.
                                    </li>
                                    <li>
                                        <strong>Account Responsibility:</strong> Users are responsible for maintaining the confidentiality of their account information and ensuring its proper use. We are not liable for any unauthorized access resulting from user negligence.
                                    </li>
                                    <li>
                                        <strong>Changes to Terms:</strong> We reserve the right to update or modify these terms at any time without prior notice. Continued use of our platform after changes implies acceptance of the new terms.
                                    </li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">3. Privacy Policy</h2>
                                <p className="text-gray-700">
                                    Your privacy is important to us. That&apos;s why we don&apos;t collect any personal information from our users.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4">4. Limitation of Liability</h2>
                                <p className="text-gray-700">
                                    We are not liable for any damages resulting from the use or inability to use our platform, including but not limited to direct, indirect, incidental, or consequential damages.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
                                <p className="text-gray-700">
                                    If you have any questions or concerns about these terms, please contact us at <a href="https://discord.gg/cod-fr" className="text-blue-600 underline">Hack on COD Discord</a>.
                                </p>
                            </section>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
