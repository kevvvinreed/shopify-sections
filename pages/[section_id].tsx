import { useRouter } from "next/router";

const SectionPage = () => {
  const router = useRouter();
  const { section_id } = router.query;

  return (
    <div>
      <h1>Shopify Section: {section_id}</h1>
    </div>
  );
};

export default SectionPage;
