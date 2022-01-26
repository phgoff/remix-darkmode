import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon, LightningBoltIcon } from "@heroicons/react/outline";
import { Theme, useTheme } from "~/utils/theme-provider";
import { SunIcon, MoonIcon } from "@heroicons/react/outline";
import { Link } from "remix";

const navigation = [{ name: "Home", to: "/" }];

export default function NavBar(): JSX.Element {
  const [theme, setTheme] = useTheme();

  return (
    <div className="relative z-10 px-4 py-6 md:px-10 lg:w-full">
      <Popover>
        <div className="relative">
          <nav
            className="relative flex items-center justify-between sm:h-10 lg:justify-start"
            aria-label="Global"
          >
            <div className="flex items-center flex-grow flex-shrink-0">
              <div className="flex items-center justify-between w-full md:w-auto">
                <Link to="/">
                  <LightningBoltIcon className="w-auto h-8 sm:h-10 dark:text-white" />
                </Link>
                <div className="flex items-center -mr-2 md:hidden">
                  <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md dark:bg-gray-900 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500">
                    <span className="sr-only">Open main menu</span>
                    <MenuIcon className="w-6 h-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="hidden md:block md:ml-10 md:pr-10 md:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="hidden md:flex">
              {theme === "dark" ? (
                <MoonIcon
                  onClick={() =>
                    setTheme((previousTheme) =>
                      previousTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK
                    )
                  }
                  className="w-6 h-6 text-2xl text-gray-600 cursor-pointer dark:text-gray-200"
                />
              ) : (
                <SunIcon
                  onClick={() =>
                    setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT)
                  }
                  className="w-6 h-6 text-2xl text-gray-600 cursor-pointer dark:text-gray-200"
                />
              )}
            </div>
          </nav>
        </div>

        {/* MOBILE */}
        <Transition
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute inset-x-0 top-0 z-10 p-2 transition origin-top-right transform md:hidden"
          >
            <div className="overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-900 ring-1 ring-black ring-opacity-5">
              <div className="flex items-center justify-between px-5 pt-4">
                <div>
                  <LightningBoltIcon className="w-auto h-8 dark:text-white" />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md dark:bg-gray-900 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500">
                    <span className="sr-only">Close main menu</span>
                    <XIcon className="w-6 h-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className="block px-3 py-2 text-base font-medium text-gray-500 rounded-md hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="flex justify-center w-full px-2 pt-2 pb-5">
                <div className="px-4 py-4 border border-gray-300 rounded-full dark:border-gray-400">
                  {theme === "dark" ? (
                    <div
                      className="flex items-center space-x-3 text-white"
                      onClick={() =>
                        setTheme((previousTheme) =>
                          previousTheme === Theme.DARK
                            ? Theme.LIGHT
                            : Theme.DARK
                        )
                      }
                    >
                      <MoonIcon className="w-6 h-6 text-2xl text-gray-600 cursor-pointer dark:text-gray-200" />
                      <span>switch to light mode</span>
                    </div>
                  ) : (
                    <div
                      className="flex items-center space-x-3 text-gray-600"
                      onClick={() =>
                        setTheme((previousTheme) =>
                          previousTheme === Theme.DARK
                            ? Theme.LIGHT
                            : Theme.DARK
                        )
                      }
                    >
                      <SunIcon className="w-6 h-6 text-2xl text-gray-600 cursor-pointer dark:text-gray-200" />
                      <span>switch to dark mode</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
}
