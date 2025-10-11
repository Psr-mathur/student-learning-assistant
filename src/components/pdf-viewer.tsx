import { useEffect, useState } from 'react';

export const BlobPdfViewer = ({ blob }: { blob: Blob }) => {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const file = new File([blob], 'document.pdf', { type: 'application/pdf' });
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [blob]);

  return (
    <div style={{ height: '80vh', margin: '16px 0', border: '1px solid #ccc' }}>
      {url && (
        <iframe
          src={url}
          title="PDF Viewer"
          width="100%"
          height="100%"
          style={{ border: 'none' }}
        />
      )}
    </div>
  );
};