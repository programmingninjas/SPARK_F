import Navbar from '../../components/common/Navbar'

function IQTest() {
  return (
    <>
        <main className='h-screen flex flex-col'>
          <Navbar />
          <embed className='w-full grow' src="https://drive.google.com/viewerng/viewer?embedded=true&url=https://niepid.nic.in/man_niti.pdf" width="500" height="375">

          </embed>
        </main>
    </>
  )
}

export default IQTest