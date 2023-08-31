import Button from "./components/common/Button"

function App() {

  return (
    <>
    <div className="md:container md:mx-auto bg-light">
      <nav className="flex justify-between p-8">
        <div className="flex items-center">LOGO HERE</div>
        <div>
          <div className="flex gap-1 md:gap-4">
            <Button type="text">LOGIN</Button>
            <Button type="filled">SIGN UP</Button>
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
      </main>
    </div>
    </>
  )
}

export default App
