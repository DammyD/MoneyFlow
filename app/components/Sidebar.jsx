import { NAV_ITEMS, USER } from "../../data";

export default function Sidebar({ activeNav = "Overview" }) {
  return (
    <aside className="w-52 shrink-0 bg-white border-r border-gray-100 flex flex-col py-5 min-h-screen">
      {/* Logo */}
      <div className="flex items-center gap-2 px-5 pb-6 text-base font-medium text-gray-900">
        <div className="w-7 h-7 bg-violet-600 rounded-lg flex items-center justify-center">
          <i className="ti ti-wallet text-white text-sm" aria-hidden="true" />
        </div>
        Money<span className="text-violet-600">Flow</span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col">
        {NAV_ITEMS.map((item) => {
          const isActive = item.label === activeNav;
          return (
            <div
              key={item.label}
              className={`flex items-center gap-2.5 px-5 py-2.5 text-sm cursor-pointer border-l-2 transition-colors
                ${isActive
                  ? "text-violet-600 bg-violet-50 border-violet-600 font-medium"
                  : "text-gray-500 border-transparent hover:bg-gray-50"
                }`}
            >
              <i className={`ti ${item.icon} text-lg`} aria-hidden="true" />
              {item.label}
            </div>
          );
        })}
      </nav>

      {/* User */}
      <div className="flex items-center gap-2 px-5 pt-4 mt-auto border-t border-gray-100">
        <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-xs font-medium text-violet-600 shrink-0">
          {USER.initials}
        </div>
        <div>
          <p className="text-xs font-medium text-gray-900 leading-none">{USER.name}</p>
          <p className="text-xs text-gray-400 mt-0.5">{USER.email}</p>
        </div>
      </div>
    </aside>
  );
}