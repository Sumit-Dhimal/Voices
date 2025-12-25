import Button from "../components/ui/Button";

const Home = () => {
  return (
    <div className="mt-32">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-7xl md:text-8xl font-semibold text-gray-700 tracking-tighter md:tracking-normal">Human <br/> Stories & Ideas</h2>
        </div>

        <p className="text-2xl font-normal mb-12">A place to read, write and deepen your understanding.</p>
        <Button variant="secondary" className="text-2xl px-8 py-2">
          Explore Blogs
        </Button>
      </div>
    </div>
  )
}

export default Home