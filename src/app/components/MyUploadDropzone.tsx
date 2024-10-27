// MyUploadDropzone Component
import { useState } from 'react';
import { UploadDropzone } from '@/utils/uploadthing';

const MyUploadDropzone = ({ setUploadedLink }: { setUploadedLink: (link: string) => void }) => {
  const [uploadComplete, setUploadComplete] = useState(false);

  return (
    <div
      className={`relative flex items-center justify-center p-6 border-2 border-dashed border-white bg-black text-white rounded-lg cursor-pointer 
        transition-transform duration-300 transform 
        ${uploadComplete ? 'animate-shake' : 'hover:scale-105 hover:bg-grey-200 hover:border-gray-500'}`}
      onAnimationEnd={() => setUploadComplete(false)}
    >
      <UploadDropzone
        endpoint="ImageUploader"
        onClientUploadComplete={(res) => {
          if (res && res[0]) {
            const fileLink = res[0].url; // Assuming `fileUrl` is the link property
            console.log('Files:', res);
            alert('Upload Completed');
            setUploadComplete(true);
            setUploadedLink(fileLink);
          }
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
