import { LegalPage } from "@/components/legal/LegalPage";

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="Sep 15, 2026"
      sections={[
        {
          heading: "1. Acceptance of Terms",
          body: [
            "By connecting to the Seiky Minecraft network or using this website, you agree to these Terms of Service. If you do not agree, please do not use our services.",
          ],
        },
        {
          heading: "2. Eligibility",
          body: [
            "You must own a legitimate copy of Minecraft: Java Edition to play on Seiky. Accounts found to be using unauthorized or shared copies may be banned without refund.",
          ],
        },
        {
          heading: "3. Account Responsibility",
          body: [
            "You are responsible for all activity on your account, including anything done by someone you shared login access with. Account sharing is against the server rules.",
          ],
        },
        {
          heading: "4. Purchases",
          body: [
            "Stars and the cosmetics bought with them are virtual goods with no real-world monetary value. All purchases are final except where required by applicable consumer law — see our Store Policy for details.",
          ],
        },
        {
          heading: "5. Termination",
          body: [
            "We may suspend or terminate access to the network or website for any account that violates our rules or these terms, at our discretion.",
          ],
        },
        {
          heading: "6. Changes",
          body: [
            "We may update these terms from time to time. Continued use of Seiky after changes take effect constitutes acceptance of the revised terms.",
          ],
        },
      ]}
    />
  );
}
