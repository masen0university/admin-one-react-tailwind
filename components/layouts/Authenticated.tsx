import React, { ReactNode } from 'react'
import { useState } from 'react'
import { mdiForwardburger, mdiBackburger, mdiMenu } from '@mdi/js'
import menuAside from '../../src/menuAside'
import menuNavBar from '../../src/menuNavBar'
import BaseIcon from '../BaseIcon'
import NavBar from '../NavBar'
import NavBarItemPlain from '../NavBarItemPlain'
import AsideMenu from '../AsideMenu'
import FooterBar from '../FooterBar'
import { setUser } from '../../src/stores/mainSlice'
import GlobalStyle from '../globals/Style'
import GlobalDarkMode from '../globals/DarkMode'
import { useAppDispatch, useAppSelector } from '../../src/stores/hooks'

type Props = {
  children: ReactNode
}

export default function LayoutAuthenticated({ children }: Props) {
  const dispatch = useAppDispatch()

  dispatch(
    setUser({
      name: 'John Doe',
      email: 'john@example.com',
      avatar:
        'https://avatars.dicebear.com/api/avataaars/example.svg?options[top][]=shortHair&options[accessoriesChance]=93',
    })
  )

  const darkMode = useAppSelector((state) => state.style.darkMode)

  const [isAsideMobileExpanded, setIsAsideMobileExpanded] = useState(false)
  const [isAsideLgActive, setIsAsideLgActive] = useState(false)

  const layoutAsidePadding = 'xl:pl-60'

  return (
    <>
      <GlobalStyle />
      <GlobalDarkMode />

      <div
        className={`${darkMode ? 'dark' : ''} ${
          isAsideMobileExpanded ? 'overflow-hidden lg:overflow-visible' : ''
        }`}
      >
        <div
          className={`${layoutAsidePadding} ${
            isAsideMobileExpanded ? 'ml-60 lg:ml-0' : ''
          } pt-14 min-h-screen w-screen transition-position lg:w-auto bg-gray-50 dark:bg-slate-800 dark:text-slate-100`}
        >
          <NavBar
            menu={menuNavBar}
            className={`${layoutAsidePadding} ${isAsideMobileExpanded ? 'ml-60 lg:ml-0' : ''}`}
          >
            <NavBarItemPlain display="flex lg:hidden">
              <BaseIcon path={isAsideMobileExpanded ? mdiBackburger : mdiForwardburger} size="24" />
            </NavBarItemPlain>
            <NavBarItemPlain display="hidden lg:flex xl:hidden">
              <BaseIcon path={mdiMenu} size="24" />
            </NavBarItemPlain>
          </NavBar>
          <AsideMenu
            isAsideMobileExpanded={isAsideMobileExpanded}
            isAsideLgActive={isAsideLgActive}
            menu={menuAside}
          />
          {children}
          <FooterBar>
            Get more with{` `}
            <a
              href="https://tailwind-vue.justboil.me/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600"
            >
              Premium version
            </a>
          </FooterBar>
        </div>
      </div>
    </>
  )
}