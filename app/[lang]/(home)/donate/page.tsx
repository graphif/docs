import DonatePageClient from "./page.client";

export interface DonationData {
  user: string;
  note?: string;
  amount: number;
  currency?: string;
}

export default async function DonatePage() {
  // 顺序=从早到晚
  const donations: DonationData[] = await (
    await fetch("https://api.graphif.dev/api/donations")
  ).json();

  return <DonatePageClient donations={donations} />;
}
