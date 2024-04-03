import Navbar from "../components/common/Navbar";

interface Video {
  id: number;
  title: string;
  src: string;
  thumbnail: string;
}

const videos: Video[] = [
  { id: 1, title: 'Video 1', src: '../videos/video1.mp4',thumbnail: "../thumbnails/image1.jpg" },
  { id: 2, title: 'Video 2', src: '../videos/video2.mp4',thumbnail: "../thumbnails/image2.jpg" },
  { id: 3, title: 'Video 3', src: '../videos/video3.mp4',thumbnail: "../thumbnails/image3.jpg" },
  { id: 4, title: 'Video 4', src: '../videos/video4.mp4',thumbnail: "../thumbnails/image4.jpg" },
  { id: 5, title: 'Video 5', src: '../videos/video5.mp4',thumbnail: "../thumbnails/image5.jpg" },
  { id: 6, title: 'Video 6', src: '../videos/video6.mp4',thumbnail: "../thumbnails/image6.jpg" },
];

function SocialTraining() {
  return (
    <>
      <Navbar />
      <section className="container mx-auto px-2 md:px-8 pb-24">
        <h1 className="text-2xl sm:text-4xl lg:text-6xl mt-12 font-semibold">
          Social Training <span className="gradient-text">Modules</span>
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {videos.map((video) => (
            <div key={video.id} className="relative">
              <video
                controls
                className="w-full h-auto"
                src={video.src}
                title={video.title}
                poster={video.thumbnail}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default SocialTraining;
