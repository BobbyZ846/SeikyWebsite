import { Suspense } from "react";
import { Newspaper } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { NewsList } from "@/components/news/NewsList";

export default function NewsPage() {
  return (
    <>
      <PageHero
        icon={Newspaper}
        title="News"
        description="Announcements for the whole network, the store and every server. Click a tag to see only those posts."
      />

      <section className="py-10">
        <Container>
          <Suspense>
            <NewsList />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
