/** Renders a schema.org JSON-LD @graph. */
export default function JsonLd({ graph }: { graph: object[] }) {
  const data = { '@context': 'https://schema.org', '@graph': graph };
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here; escape "<" so content can never close the script tag
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
