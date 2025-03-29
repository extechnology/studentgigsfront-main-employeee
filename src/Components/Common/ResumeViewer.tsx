import React, { useState } from 'react';
import { Download, Eye, X } from 'lucide-react';

interface ResumeViewerProps {
    resumeUrl: string | null;
    isOpen: boolean;
    onRequestClose: () => void;
}

const ResumeViewer: React.FC<ResumeViewerProps> = ({ resumeUrl, isOpen, onRequestClose }) => {

    
    const [iframeError, setIframeError] = useState(false);

    if (!isOpen || !resumeUrl) return null;

    const handleIframeError = () => {
        setIframeError(true);
    };

    const handleDownload = () => {
        if (resumeUrl) {
            window.open(resumeUrl, '_blank');
        }
    };

    const getEmbedUrl = (url: string) => {
        if (url.endsWith('.pdf')) {
            return `${url}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0`;
        }
        return url;
    };

    return (


        <div className="fixed inset-0 z-50 flex items-center justify-center h-[100vh]">


            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                onClick={onRequestClose}
            />

            {/* Modal */}
            <div className="relative w-[100%] max-w-4xl animate-in fade-in zoom-in duration-200">


                {/* Controls Bar */}
                <div className="relative z-10 w-full bg-white/10 backdrop-blur-md px-5 py-3 flex justify-between items-center shadow-lg rounded-lg">
                    <h2 className="text-white font-semibold text-lg">Resume Preview</h2>
                    <div className="flex items-center gap-3">
                        <a
                            href={resumeUrl}
                            target='_blank'
                            download // Forces download
                            className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-xl shadow-md 
            hover:bg-gray-800 transition-all duration-200 hover:shadow-lg"
                            aria-label="Download"
                        >
                            <Download className="w-5 h-5" />
                            <span className="font-medium">Download</span>
                        </a>
                        <button
                            onClick={onRequestClose}
                            className="p-2.5 text-white bg-red-500 rounded-xl shadow-md 
            hover:bg-red-600 transition-all duration-200 hover:shadow-lg"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>


                {/* Content Container */}
                <div className="bg-white rounded-xl shadow-2xl h-[88vh] overflow-hidden">
                    {resumeUrl && resumeUrl.endsWith('.pdf') && !iframeError ? (
                        <iframe
                            src={getEmbedUrl(resumeUrl)}
                            title="Resume Preview"
                            className="w-full h-full border-0"
                            onError={handleIframeError}
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col justify-center items-center space-y-6 bg-gray-50">
                            <div className="text-center space-y-4">
                                <Eye className="w-16 h-16 text-gray-300 mx-auto" />
                                <p className="text-gray-600 text-lg">
                                    {iframeError ?
                                        "Preview is not available due to security settings." :
                                        "File format not supported for preview."}
                                </p>
                            </div>
                            <button
                                onClick={handleDownload}
                                className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-700 
                                    transition-all hover:shadow-lg active:scale-95"
                            >
                                <Download className="w-5 h-5" />
                                <span className="font-medium">Download Resume</span>
                            </button>
                        </div>
                    )}
                </div>




            </div>
        </div>
    );
};

export default ResumeViewer;