// LinkDisplay Component
import { useState } from 'react';
import QRCode from 'react-qr-code';

const LinkDisplay = ({ link }: { link: string }) => {
  const [copySuccess, setCopySuccess] = useState<string>('');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    setCopySuccess('Copied!');
    setTimeout(() => setCopySuccess(''), 2000);
  };

  return (
    <div className="flex flex-col items-center mt-8 space-y-4">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={link}
          readOnly
          className="bg-black text-white border border-gray-500 p-2 rounded-lg"
        />
        <button
          onClick={copyToClipboard}
          className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          Copy Link
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
