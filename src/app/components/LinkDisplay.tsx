import { useState } from 'react';
import QRCode from 'react-qr-code';
import { Clipboard } from 'lucide-react';

const LinkDisplay = ({ link }: { link: string }) => {
  const [copySuccess, setCopySuccess] = useState<string>('');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    setCopySuccess('Copied!');
    setTimeout(() => setCopySuccess(''), 2000);
  };

  return (
    <div className="flex flex-col items-center mt-8 space-y-4">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          value={link}
          readOnly
          className="w-full bg-black text-white border border-gray-500 p-3 rounded-lg pr-10"
        />
        <button
          onClick={copyToClipboard}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
          aria-label="Copy to clipboard"
        >
          <Clipboard size={18} />
        </button>
      </div>
      {copySuccess && <p className="text-green-500">{copySuccess}</p>}
      <div className="mt-4 p-4 bg-white rounded-lg">
        <QRCode value={link} size={128} />
      </div>
    </div>
  );
};

export default LinkDisplay;
