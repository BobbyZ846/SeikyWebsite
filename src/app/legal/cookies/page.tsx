import { LegalPage } from "@/components/legal/LegalPage";

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie Notice"
      updated="Sep 15, 2026"
      sections={[
        {
          heading: "1. What Are Cookies",
          body: [
            "Cookies are small pieces of data stored in your browser that help websites remember information about your visit, such as preferences and login state.",
          ],
        },
        {
          heading: "2. How We Use Them",
          body: [
            "We use essential cookies to keep you logged in and remember basic preferences. We do not use cookies for third-party advertising.",
          ],
        },
        {
          heading: "3. Managing Cookies",
          body: [
            "You can clear or block cookies through your browser settings at any time. Doing so may log you out or reset saved preferences on this site.",
          ],
        },
      ]}
    />
  );
}
