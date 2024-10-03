import React, { useRef, useState, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEraser, faCircle, faStop } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
import Footer from './Footer';
import Font from 'react-font';

const VidCamCapture = () => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [images, setImages] = useState([]);
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [savedVideos, setSavedVideos] = useState([]);
  const [view, setView] = useState('images'); // State to toggle between images and videos

  // Load images and videos from localStorage on component mount
  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem('capturedImages')) || [];
    setImages(storedImages);

    const storedVideos = JSON.parse(localStorage.getItem('savedVideos')) || [];
    setSavedVideos(storedVideos);
  }, []);

  // Save and delete image functions
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      const updatedImages = [...images, { src: imageSrc, note: '' }];
      setImages(updatedImages);
      localStorage.setItem('capturedImages', JSON.stringify(updatedImages));
    }
  }, [webcamRef, images]);

  const deleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    localStorage.setItem('capturedImages', JSON.stringify(updatedImages));
  };

  const downloadImage = (imageSrc, index) => {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = `captured-image-${index + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Video recording functions
  const startRecording = useCallback(() => {
    setRecording(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: 'video/webm',
    });
    mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
    mediaRecorderRef.current.start();
  }, [webcamRef, setRecording]);

  const stopRecording = useCallback(() => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  }, [mediaRecorderRef, setRecording]);

  const handleDataAvailable = useCallback(({ data }) => {
    if (data.size > 0) {
      setRecordedChunks((prev) => prev.concat(data));
    }
  }, []);

  const saveVideo = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const updatedVideos = [...savedVideos, url];
      setSavedVideos(updatedVideos);
      localStorage.setItem('savedVideos', JSON.stringify(updatedVideos));
      setRecordedChunks([]);
    }
  }, [recordedChunks, savedVideos]);

  const deleteVideo = (index) => {
    const updatedVideos = savedVideos.filter((_, i) => i !== index);
    setSavedVideos(updatedVideos);
    localStorage.setItem('savedVideos', JSON.stringify(updatedVideos));
  };

  const downloadVideo = (videoUrl, index) => {
    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = `video-${index + 1}.webm`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
    <div className=''>

    <Navbar />

    <div className="flex flex-col items-center min-h-screen bg-gray-900  text-white p-4">
      <Font family='Josefin Slab'> <h1 className="text-4xl font-thin mb-8"> Captures</h1></Font>

      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className="rounded-lg shadow-lg mb-4 w-80" />

      <div className="flex space-x-4 mb-4">
       <Font family='Libre Baskerville'> <button onClick={capture} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md transition duration-200">
          Capture Photo
        </button>
        {recording ? (
          <button onClick={stopRecording} className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md transition duration-200">
            <FontAwesomeIcon icon={faStop} className="mr-2" />
            Stop Recording
          </button>
        ) : (
          <button onClick={startRecording} className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md transition duration-200">
            <FontAwesomeIcon icon={faCircle} className="mr-2" />
            Start Recording
          </button>
        )}
        {recordedChunks.length > 0 && (
          <button onClick={saveVideo} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md transition duration-200">
            Save Video
          </button> 
        )}</Font>
      </div>

      {/* Dropdown to toggle between displaying images and videos */}
      <div className="w-full max-w-md mb-4">
        <select
          value={view}
          onChange={(e) => setView(e.target.value)}
          className="w-full bg-gray-800 text-white p-2 rounded-md"
        >
          <option value="images">Captured Images</option>
          <option value="videos">Recorded Videos</option>
        </select>
      </div>

      {/* Conditional rendering for images or videos */}
      {view === 'images' && (
        <div className="mt-8 w-full max-w-4xl h-96">
          <Font family='Josefin Slab'>  <h2 className="text-2xl font-bold mb-4">Saved Images</h2></Font>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.length > 0 && images.map((img, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <img src={img.src} alt={`Captured ${index + 1}`} className="w-full h-40 rounded-md mb-4 object-cover" />
                <div className="flex justify-between">
                  <button onClick={() => downloadImage(img.src, index)} className="px-3 py-2 bg-blue-500 hover:bg-blue-600 rounded-md transition duration-200">
                    <FontAwesomeIcon icon={faDownload} className="mr-2" />
                    Download
                  </button>
                  <button onClick={() => deleteImage(index)} className="px-3 py-2 bg-red-500 hover:bg-red-600 rounded-md transition duration-200">
                    <FontAwesomeIcon icon={faEraser} className="mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'videos' && (
        <div className="mt-8 w-full max-w-4xl h-96 ">
         <Font family='Josefin Slab'> <h2 className="text-2xl font-bold mb-4">Saved Videos</h2></Font>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedVideos.map((videoUrl, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <video controls src={videoUrl} className="w-full h-40 rounded-md mb-4"></video>
                <div className="flex justify-between">
                  <button onClick={() => downloadVideo(videoUrl, index)} className="px-3 py-2 bg-blue-500 hover:bg-blue-600 rounded-md transition duration-200">
                    Download
                  </button>
                  <button onClick={() => deleteVideo(index)} className="px-3 py-2 bg-red-500 hover:bg-red-600 rounded-md transition duration-200">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    </div>
    <Footer />
    </>
  );
};

export default VidCamCapture;
