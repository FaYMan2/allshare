// Home Component
'use client'
import { useState } from 'react';
import MyUploadDropzone from './components/MyUploadDropzone';
import LinkDisplay from './components/LinkDisplay';

export default function Home() {
  const [isUploaded, setUploaded] = useState<boolean>(false);
  const [shortenedLink, setShortenedLink] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleUploadComplete = async (originalLink: string) => {
    setLoading(true); // Start loading before API call

    try {
      const response = await fetch('/api/linkShortner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: originalLink }),
      });

      const data = await response.json();
      if (response.ok) {
        setShortenedLink(data.shortenedUrl);
        setUploaded(true);
      } else {
        console.error('Failed to shorten URL:', data);
        alert('URL shortening failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while shortening the URL.');
    } finally {
      setLoading(false); // Stop loading after API call completes
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-10 bg-black text-white">
      <h1 className="text-4xl mb-6">File Upload</h1>
      {!isUploaded ? (
        <MyUploadDropzone setUploadedLink={handleUploadComplete} />
      ) : loading ? (
        <div className="flex items-center justify-center mt-8">
          <div className="loader border-t-4 border-white border-solid rounded-full w-12 h-12 animate-spin"></div>
          <p className="ml-4">Shortening link...</p>
        </div>
      ) : (
        shortenedLink && <LinkDisplay link={shortenedLink} />
      )}
    </div>
  );
}
