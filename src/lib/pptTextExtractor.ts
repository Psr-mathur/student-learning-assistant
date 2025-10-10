import JSZip from 'jszip';

export async function extractTextFromPptxBlob(blob: Blob): Promise<string> {
  const arrayBuffer = await blob.arrayBuffer();
  const zip = await JSZip.loadAsync(arrayBuffer);
  let text = "";

  // Loop through all slides
  const slideFiles = Object.keys(zip.files).filter((path) =>
    path.match(/^ppt\/slides\/slide\d+\.xml$/)
  );

  for (const slidePath of slideFiles) {
    const slideXml = await zip.file(slidePath)?.async("string");
    if (!slideXml) continue;

    // Extract text between <a:t> tags (text runs)
    const matches = [...slideXml.matchAll(/<a:t[^>]*>(.*?)<\/a:t>/g)];
    for (const match of matches) {
      text += match[1] + "\n";
    }
  }

  return text.trim();
}

