import { LegalPage } from "@/components/legal/LegalPage";

export default function StorePolicyPage() {
  return (
    <LegalPage
      title="Store Policy"
      updated="Sep 15, 2026"
      sections={[
        {
          heading: "1. Virtual Goods",
          body: [
            "Stars and the cosmetics bought with them are virtual goods tied to your Minecraft account. They have no cash value and cannot be exchanged, transferred, or redeemed for real money.",
          ],
        },
        {
          heading: "2. Refunds",
          body: [
            "All purchases are final once a virtual good has been delivered to your account. Refunds may be granted at our discretion for duplicate charges or technical errors.",
          ],
        },
        {
          heading: "3. Chargebacks",
          body: [
            "Filing a chargeback for a completed purchase instead of contacting support will result in the removal of the purchased item(s) and a ban from the store and network.",
          ],
        },
        {
          heading: "4. Delivery Issues",
          body: [
            "If you didn't receive a purchase, contact support with your order details within 30 days and we'll investigate and deliver or refund it.",
          ],
        },
        {
          heading: "5. Pricing",
          body: [
            "Prices, discounts and pack bonuses may change at any time without prior notice. Changes do not affect purchases already completed.",
          ],
        },
      ]}
    />
  );
}
