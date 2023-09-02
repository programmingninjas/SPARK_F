import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

function LandingPage()
{
  return (
    <div className="md:container md:mx-auto bg-light">
      <nav className="flex justify-between p-8">
        <div className="flex items-center">LOGO HERE</div>
        <div>
          <div className="flex gap-1 md:gap-4">
            <Link to='/login'><Button type="text">LOGIN</Button></Link>
            <Link to='/signup'><Button type="filled">SIGN UP</Button></Link>
          </div>
        </div>
      </nav>
      <main>
        <section className="flex mt-8 flex-wrap md:flex-nowrap">
          <div className="w-full p-8 lg:p-16">
            <h1 className="text-3xl md:text-5xl font-medium">Lorem Ipsum <span className="gradient-text">Spark</span> <br/> Illum, <span className="gradient-text">assumenda!</span></h1>
            <p className="mt-8 text-md md:text-xl">
              Lorem ipsum dolor sit, amet consectetur adipisicing?
              <br />
              Elit. Nostrum qui nihil inventore atque reprehenderit corrupti.
            </p>
            <div className="mt-8 flex gap-4">
              <Button type="filled">Get Started</Button>
              <Button type="outline">Learn More</Button>
            </div>
          </div>
          <div className="bg-secondary w-full">b</div>
        </section>
        <section className="flex mt-48 flex-wrap flex-row-reverse md:flex-nowrap">
          <div className="w-full p-8 lg:p-16 flex flex-col gap-48">
            <div>
              <h1 className="text-3xl md:text-5xl font-medium">Why <span className="gradient-text">Spark?</span></h1>
              <p className="mt-8 text-md md:text-xl">
                Paragraph explaining the problem statement.
                <br />
                Elit. Nostrum qui nihil inventore atque reprehenderit corrupti.
              </p>
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-medium">Our <span className="gradient-text">Objective.</span></h1>
              <p className="mt-8 text-md md:text-xl">
              Our Approach to solve the problem.
                <br />
                Elit. Nostrum qui nihil inventore atque reprehenderit corrupti.
              </p>
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-medium">Our <span className="gradient-text">Solution.</span></h1>
              <p className="mt-8 text-md md:text-xl">
                Solution to the problem.
                <br />
                Elit. Nostrum qui nihil inventore atque reprehenderit corrupti.
              </p>
            </div>
          </div>
          <div className="w-full">
            <div className="bg-accent h-96 sticky top-1/4">b</div>
          </div>
        </section>
        <section className="py-48">
          <div className="flex flex-wrap gap-4 p-4">
            <div className="bg-accent shadow-accent/30 text-light grow hover:grow-[15] transition-all duration-500 shadow-lg p-16 rounded-lg flex flex-col items-center justify-center">
              <h1 className="text-4xl md:text-7xl font-bold">1 in 1000</h1>
              <h1>Children are diagnosed with down syndrome</h1>
            </div>
            <div className="bg-primary shadow-primary/30 text-light grow hover:grow-[15] transition-all duration-500 shadow-lg p-16 rounded-lg flex flex-col items-center justify-center">
              <h1 className="text-4xl md:text-7xl font-bold">1 in 1000</h1>
              <p>Children are diagnosed with down syndrome</p>
            </div>
            <div className="bg-secondary shadow-secondary/30 grow hover:grow-[15] transition-all duration-500 shadow-lg p-16 rounded-lg flex flex-col items-center justify-cente">
              <h1 className="text-4xl md:text-7xl font-bold">1 in 1000</h1>
              <p>Children are diagnosed with down syndrome</p>
            </div>
            <div className="bg-accent shadow-accent/30 text-light grow-[5] hover:grow-[15] transition-all duration-500 shadow-lg p-16 rounded-lg flex flex-col items-center justify-center">
              <h1 className="text-4xl md:text-7xl font-bold">1 in 1000</h1>
              <p>Children are diagnosed with down syndrome</p>
            </div>
            <div className="bg-primary shadow-primary/30 text-light grow-[10] hover:grow-[15] transition-all duration-500 shadow-lg p-16 rounded-lg flex flex-col items-center justify-center">
              <h1 className="text-4xl md:text-7xl font-bold">1 in 1000</h1>
              <p>Children are diagnosed with down syndrome</p>
            </div>
            <div className="bg-secondary shadow-secondary/30 grow hover:grow-[15] transition-all duration-500 shadow-lg p-16 rounded-lg flex flex-col items-center justify-cente">
              <h1 className="text-4xl md:text-7xl font-bold">1 in 1000</h1>
              <p>Children are diagnosed with down syndrome</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default LandingPage;