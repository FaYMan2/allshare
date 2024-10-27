import { useState } from 'react';
import { UploadDropzone } from '@/utils/uploadthing';

const MyUploadDropzone = ({ setUploadedLink }: { setUploadedLink: (link: string) => void }) => {
  const [uploadComplete, setUploadComplete] = useState(false);

  return (
    <div
      className={`relative flex items-center justify-center p-1 bg-[#0A0A0A] text-white rounded-md cursor-pointer 
        transition-transform duration-300 transform 
        ${uploadComplete ? 'animate-shake' : 'hover:scale-105'}`}
      onAnimationEnd={() => setUploadComplete(false)}
    >
      <UploadDropzone
        endpoint="ImageUploader"
        onClientUploadComplete={(res) => {
          if (res && res[0]) {
            const fileLink = res[0].url;
            console.log('Files:', res);
            alert('Upload Completed');
            setUploadComplete(true);
            setUploadedLink(fileLink);
          }
        }}
        appearance={{
          container: 'h-30 w-30 bg-[#0A0A0A] rounded-md p-2 border-4 border-solid border-gray-500',
          uploadIcon: 'text-gray-200 h-6 w-6',
          label: 'text-xs text-white',
          allowedContent: 'hidden', 
          button: 'text-white bg-blue-500 hover:bg-blue-600 text-base rounded px-2 w-15 py-1',
        }}
        onUploadError={(error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
      {uploadComplete && (
        <span className="absolute text-white text-sm mt-16 animate-pulse">
          Upload Complete
        </span>
      )}
    </div>
  );
};

export default MyUploadDropzone;
