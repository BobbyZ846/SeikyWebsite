import { LegalPage } from "@/components/legal/LegalPage";

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="Sep 15, 2026"
      sections={[
        {
          heading: "1. Information We Collect",
          body: [
            "We collect your Minecraft username and UUID, IP address, in-game statistics, and any information you provide when registering an account or contacting support.",
          ],
        },
        {
          heading: "2. How We Use Your Information",
          body: [
            "We use this information to operate the network (accounts, ranks, leaderboards), enforce the server rules, process store purchases, and improve our services.",
          ],
        },
        {
          heading: "3. Sharing",
          body: [
            "We do not sell your personal information. We may share limited data with payment processors to complete store purchases, or with authorities if legally required.",
          ],
        },
        {
          heading: "4. Data Retention",
          body: [
            "We retain account and punishment data for as long as needed to operate the network fairly, including after a ban, to prevent evasion.",
          ],
        },
        {
          heading: "5. Your Rights",
          body: [
            "You can request a copy of your data or ask us to delete your account by opening a support ticket on Discord.",
          ],
        },
      ]}
    />
  );
}
