import React from "react";
import Link from "next/link";

import SidebarButton from "./sidebar-btn";

import Logo from "@/components/logo";
import { siteConfig } from "@/config/site";

const Sidebar = () => {
  return (
    <nav className="fixed shadow-[0px_5px_5px_6px_rgba(0,0,0,0.1)] left-0 inset-y-0 w-60 xl:w-72 2xl:w-80 z-40 from-cyan-500 to-cyan-800 bg-gradient-to-tr">
      <Link href={"/"}>
        <Logo />
      </Link>
      <div className="flex flex-col mt-5 px-1.5 gap-y-2">
        {siteConfig.navItems.map((el) => {
          return (
            <SidebarButton key={el.label} link={el.href}>
              {el.label}
            </SidebarButton>
          );
        })}
      </div>
      {/* <ButtonGroup className='px-2 absolute bottom-3 w-full'>
				<Button
					color='danger'
					variant='shadow'
					className='w-full'
					endContent={<IoIosLogOut size={20} />}
				>
					Logout
				</Button>
			</ButtonGroup> */}
    </nav>
  );
};

export default Sidebar;
