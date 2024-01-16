import Navbar from '../components/common/Navbar'
import EventPlot from '../assets/EventPlot.png'
import Epoch from '../assets/Epoch.png'
import ICAImage from "./../assets/ICA.png"
import RawData from "./../assets/RawData.png"

function ImageCard(props:{img:string,className?:string,title:string})
{
  return <div className={`${props.className} w-96 card grow bg-white pointer-events-none select-none`}>
    <h1 className='font-bold text-xl'>{props.title}</h1>
    <img className='' src={props.img} alt="" />
  </div>
}

function AnalysisPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className='flex flex-wrap justify-center justify-items-stretch gap-2'>
          <ImageCard title='Event Plot' img={EventPlot}/>
          <ImageCard title='Epoch Plot' img={Epoch}/>
          <ImageCard title='ICA Plot' img={ICAImage}/>
          <ImageCard title='Raw Plot' img={RawData}/>
        </div>
      </div>
    </>
  )
}

export default AnalysisPage