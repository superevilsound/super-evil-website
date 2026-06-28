import { getEvents } from "@/lib/data";
import { TourFilters } from "@/components/tour/TourFilters";
import { SectionTitle } from "@/components/ui/button";

export const metadata = { title: "Tour" };
export const revalidate = 60;

export default async function TourPage() {
  const events = await getEvents();

  return (
    <section className="py-[var(--section-py)]">
      <div className="container-main">
        <SectionTitle title="Artist Tour" />
        <TourFilters events={events} />
      </div>
    </section>
  );
}
