interface SidebarProps {
  NavLinks: React.FC;
}

const Sidebar: React.FC<SidebarProps> = ({ NavLinks }) => {
  return (
    <>
      {/* Sidebar */}
      <aside className="hidden md:flex md:flex-shrink-0 md:w-64 bg-gray-800 shadow-md">
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-center h-16 bg-gray-900">
            <span className="text-white text-lg font-bold">REMOTE-360</span>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            <NavLinks />
          </nav>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
