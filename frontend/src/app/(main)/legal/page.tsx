export const metadata = {
  title: "Legal Information | SummitQuest",
  description: "Terms of Service and Privacy Policy.",
};

export default function LegalPage() {
  return (
    <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop py-16 space-y-12">
      <div className="text-center mb-16">
        <h1 className="font-display-lg-mobile md:font-display-lg text-primary mb-4">Legal Information</h1>
        <p className="font-body-md text-on-surface-variant">Last updated: June 2026</p>
      </div>

      <section className="space-y-6">
        <h2 className="font-headline-md text-primary border-b border-outline-variant/30 pb-4">Terms of Service</h2>
        <div className="space-y-4 text-on-surface font-body-md leading-relaxed">
          <p>
            Welcome to SummitQuest. By using our platform, you agree to these terms. Please read them carefully.
          </p>
          <h3 className="font-label-md text-primary mt-6">1. Acceptance of Terms</h3>
          <p>
            By accessing and using our website, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
          <h3 className="font-label-md text-primary mt-6">2. Description of Service</h3>
          <p>
            SummitQuest provides an online marketplace connecting users with local adventure operators. We act solely as an intermediary and are not a party to the actual agreement between the user and the operator.
          </p>
          <h3 className="font-label-md text-primary mt-6">3. User Responsibilities</h3>
          <p>
            Users are expected to provide accurate information during booking and must adhere to the safety guidelines set by individual operators during any activity.
          </p>
        </div>
      </section>

      <section className="space-y-6 pt-12">
        <h2 className="font-headline-md text-primary border-b border-outline-variant/30 pb-4">Privacy Policy</h2>
        <div className="space-y-4 text-on-surface font-body-md leading-relaxed">
          <p>
            Your privacy is critically important to us. We have a few fundamental principles:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4 text-on-surface-variant">
            <li>We don't ask you for personal information unless we truly need it.</li>
            <li>We don't share your personal information with anyone except to comply with the law, develop our products, or protect our rights.</li>
            <li>We don't store personal information on our servers unless required for the on-going operation of one of our services.</li>
          </ul>
          <p className="mt-6">
            If you have questions about deleting or correcting your personal data please contact our support team.
          </p>
        </div>
      </section>
    </div>
  );
}
