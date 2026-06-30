import type { Metadata } from "next";
import { ShieldCheck, Lock, FileText, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | SummitQuest",
  description: "Learn how SummitQuest protects your data and privacy.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "June 30, 2026";

  return (
    <main className="pt-[100px] pb-24 px-margin-mobile md:px-margin-desktop bg-surface-off-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <div className="w-16 h-16 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="font-display-lg text-primary mb-4">Privacy Policy</h1>
          <p className="font-body-lg text-on-surface-variant">
            Last Updated: {lastUpdated}
          </p>
        </header>

        <div className="bg-white rounded-3xl p-8 md:p-12 ambient-shadow border border-outline-variant/20 prose prose-lg prose-headings:font-display prose-headings:text-primary prose-p:font-body-md prose-p:text-on-surface-variant max-w-none">
          
          <section className="mb-12">
            <h2>1. Introduction</h2>
            <p>
              Welcome to SummitQuest ("we", "our", or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at privacy@summitquest.in.
            </p>
            <p>
              This Privacy Policy governs the privacy policies and practices of our Website, located at summitquest.in, and the SummitQuest mobile applications (collectively, the "Platform"). Please read our privacy policy carefully as it will help you make informed decisions about sharing your personal information with us.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-surface-off-white p-6 rounded-2xl border border-outline-variant/30 flex items-start gap-4">
              <Lock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-headline-sm text-primary mb-2">Secure by Design</h4>
                <p className="font-body-md text-on-surface-variant m-0">Your data is encrypted at rest and in transit using industry-standard protocols.</p>
              </div>
            </div>
            <div className="bg-surface-off-white p-6 rounded-2xl border border-outline-variant/30 flex items-start gap-4">
              <FileText className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-headline-sm text-primary mb-2">No Hidden Agendas</h4>
                <p className="font-body-md text-on-surface-variant m-0">We only collect what is strictly necessary to facilitate your adventures safely.</p>
              </div>
            </div>
          </div>

          <section className="mb-12">
            <h2>2. Information We Collect</h2>
            <p>We collect personal information that you voluntarily provide to us when you register on the Platform, express an interest in obtaining information about us or our products and services, when you participate in activities on the Platform, or otherwise when you contact us.</p>
            
            <h3>Personal Information Provided by You</h3>
            <ul>
              <li><strong>Identity Data:</strong> First name, last name, date of birth, and gender (necessary for permit processing and guide safety protocols).</li>
              <li><strong>Contact Data:</strong> Phone numbers, email addresses, and emergency contact information.</li>
              <li><strong>Health & Fitness Data:</strong> Any pre-existing medical conditions, allergies, or fitness levels you choose to share to ensure your safety during physically demanding activities.</li>
              <li><strong>Financial Data:</strong> We do not store full credit card numbers. Payment data is processed securely through Razorpay.</li>
            </ul>

            <h3>Information Collected Automatically</h3>
            <p>
              We automatically collect certain information when you visit, use, or navigate the Platform. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Platform, and other technical information.
            </p>
          </section>

          <section className="mb-12">
            <h2>3. How We Use Your Information</h2>
            <p>We use personal information collected via our Platform for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
            <ul>
              <li><strong>To facilitate bookings:</strong> Sharing relevant information (such as emergency contacts and health advisories) with verified Expert Custodians (guides).</li>
              <li><strong>To send administrative information:</strong> Order confirmations, itinerary updates, and safety alerts.</li>
              <li><strong>To protect our Services:</strong> As part of our efforts to keep our Platform safe and secure (for example, for fraud monitoring and prevention).</li>
              <li><strong>To enforce our terms, conditions, and policies:</strong> For business purposes, to comply with legal and regulatory requirements or in connection with our contract.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2>4. Sharing Your Information</h2>
            <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</p>
            <p>Specifically, we may need to process your data or share your personal information in the following situations:</p>
            <ul>
              <li><strong>Expert Custodians (Operators):</strong> When you book an adventure, we share your name, contact details, and relevant health/fitness information with the verified operator leading your expedition to ensure your safety and coordinate the logistics.</li>
              <li><strong>Vendors and Third-Party Service Providers:</strong> We may share your data with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work (e.g., payment processing, email delivery, hosting services).</li>
              <li><strong>Legal Obligations:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2>5. Data Retention & Security</h2>
            <p>
              We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements).
            </p>
            <p>
              We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
            </p>
          </section>

          <section>
            <h2>6. Your Privacy Rights</h2>
            <p>
              In some regions, you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability.
            </p>
            <p>
              To make such a request, please use the contact details provided below. We will consider and act upon any request in accordance with applicable data protection laws.
            </p>
            <div className="mt-8 p-6 bg-primary text-on-primary rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="font-headline-sm mb-2">Have questions about your privacy?</h4>
                <p className="font-body-md opacity-90 m-0">Our Data Protection Officer is ready to assist you.</p>
              </div>
              <a href="mailto:privacy@summitquest.in" className="bg-white text-primary px-6 py-3 rounded-xl font-label-md whitespace-nowrap hover:bg-surface-off-white transition-colors">
                Contact DPO
              </a>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
