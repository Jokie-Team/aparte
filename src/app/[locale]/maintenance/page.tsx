import { getTranslations } from "next-intl/server";

export default async function Maintenance({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale,
    namespace: "maintenance",
  });

  return (
    <div className="flex flex-col w-full items-center justify-center px-6">
      <h2>{t("title")}</h2>
      <h3>{t("subtitle")}</h3>
    </div>
  );
}
