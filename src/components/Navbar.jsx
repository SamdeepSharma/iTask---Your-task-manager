
const Navbar = () => {
  return (
    <div className="bg-purple-700 flex justify-between px-8 py-2">
      <h1 className="font-bold text-xl text-white">iTask</h1>
      <div className=" flex gap-8 font-medium text-slate-200">
      <span className="cursor-pointer hover:font-bold hover:text-white">Home</span>
      <span className="cursor-pointer hover:font-bold hover:text-white">Your Tasks</span>
      </div>
    </div>
  )
}

export default Navbar
