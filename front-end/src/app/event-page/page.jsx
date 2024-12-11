import EventsPage from "@/components/event-page/EventPage";
import Footer from "@/components/Homepage/components/Footer";
import { HeaderPart } from "@/components/Homepage/components/Header";

export default function Home() {
  return (
    <div>
      <HeaderPart />
      <EventsPage />
      <Footer />
    </div>
  );
}
